"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import React, { useState, useEffect } from "react";
import { HttpRequest } from "@/lib/HttpRequest";

export default function DashboardSection() {
  // Dummy data for weekly bookings chart
  const bookingsData = [
    { day: "Mon", bookings: 20 },
    { day: "Tue", bookings: 35 },
    { day: "Wed", bookings: 28 },
    { day: "Thu", bookings: 40 },
    { day: "Fri", bookings: 32 },
    { day: "Sat", bookings: 18 },
    { day: "Sun", bookings: 10 },
  ];

  // Appointments (top 5 upcoming from API)
  const [appointments, setAppointments] = useState<{ id: string; patient: string; doctor: string; time: string; date?: string }[]>([]);

  useEffect(() => {
    let mounted = true;
    const loadAppointments = async () => {
      try {
        const res = await HttpRequest({ url: '/appointments', method: 'GET' });
        const data = res?.data || [];
        const mapped = (data || []).map((a: any) => {
          const dateRaw = a.doa || a.dob || null;
          const date = dateRaw ? new Date(dateRaw).toISOString().split('T')[0] : '';
          return {
            id: a._id,
            patient: `${a.firstName} ${a.lastName}`,
            doctor: a.selectDoctor?.name || '-',
            time: a.selectedTime || '',
            date,
          };
        });

        // sort by date ascending, then take first 5
        mapped.sort((x: any, y: any) => (x.date || '').localeCompare(y.date || ''));
        if (!mounted) return;
        setAppointments(mapped.slice(0, 5));
      } catch (err) {
        console.error('Failed to load appointments', err);
      }
    };
    loadAppointments();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Weekly Bookings Chart */}
      <Card className="shadow-xl rounded-2xl">
        <CardContent className="p-6">
          <h3 className="font-bold text-lg mb-4 text-gray-800">Weekly Bookings</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bookingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="bookings" stroke="#4f46e5" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Appointments Table */}
      <Card className="shadow-xl rounded-2xl">
        <CardContent className="p-6">
          <h3 className="font-bold text-lg mb-4 text-gray-800">Upcoming Appointments</h3>
          <div className="h-52 overflow-y-auto">
            <table className="w-full text-sm text-left border">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-4 py-2">Patient</th>
                  <th className="px-4 py-2">Doctor</th>
                  <th className="px-4 py-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{appt.patient}</td>
                    <td className="px-4 py-2">{appt.doctor}</td>
                    <td className="px-4 py-2">{appt.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
