"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { CalendarCheck2, Stethoscope, Users, IndianRupee, CalendarClock } from "lucide-react";

import DashboardSection from "./DashboardSection";
const iconMap: Record<string, React.ElementType> = {
  CalendarCheck2,
  Stethoscope,
  Users,
  IndianRupee,
  CalendarClock
};

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // useEffect(() => {
  //   const token = localStorage.getItem("authToken");
  //   if (!token) {
  //     redirect("/login");
  //   } else {
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  // if (!isLoggedIn) return null;

  const kpis = [
    {
      title: "Bookings Today",
      value: "48",
      icon: "CalendarCheck2",
      gradient: "from-indigo-500 to-indigo-600",
    },
    {
      title: "Doctors On Duty",
      value: "12",
      icon: "Stethoscope",
      gradient: "from-pink-500 to-rose-600",
    },
    {
      title: "Patients Checked",
      value: "89",
      icon: "Users",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      title: "Upcoming Appointments",
      value: "24",
      icon: "CalendarClock",
      gradient: "from-yellow-500 to-amber-600",
    }


  ];


  return (
    <div className="space-y-8">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        Welcome, Admin 👋
      </h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => {
          const Icon = iconMap[kpi.icon];
          return (
            <Card
              key={i}
              className={`shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-r ${kpi.gradient} text-white rounded-2xl`}
            >
              <CardContent className="p-6 py-2 flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-80">{kpi.title}</p>
                  <h2 className="text-3xl font-bold mt-2">{kpi.value}</h2>
                </div>
                <Icon className="w-10 h-10 opacity-90" />
              </CardContent>
            </Card>
          );
        })}
      </div>

      <DashboardSection />
    </div>
  );
}
