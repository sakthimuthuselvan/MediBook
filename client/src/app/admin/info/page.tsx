"use client";

import React, { useEffect, useState } from "react";
import { HttpRequest } from "@/lib/HttpRequest";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CustomAlert from "@/components/ui/CustomAlert";

type Consultation = {
  _id?: string;
  day: string;
  generalPractice: string;
  specialistConsultations: string;
  emergency: string;
};

type Clinic = {
  _id?: string;
  clinicName: string;
  email: string;
  phone: string;
  workingHours: Record<string, string>;
  consultations: Consultation[];
};

interface alertForm {
  openAlert: boolean,
  alertStatus: 'success' | 'failure',
  openAlertMessage: string
}


const AdminClinicPage = () => {
  const [clinicData, setClinicData] = useState<Clinic | null>(null);
  const [alertForm, setAlertForm] = useState<alertForm>({
    openAlert: false,
    alertStatus: "failure",
    openAlertMessage: "",
  });
  const [loading, setLoading] = useState(false);


  // Update consultation field
  const updateConsultation = (index: number, field: keyof Consultation, value: string) => {
    if (!clinicData || !clinicData.consultations) return;
    const updated = clinicData.consultations.map((c, i) =>
      i === index ? { ...c, [field]: value } : c
    );
    setClinicData({ ...clinicData, consultations: updated });
  };

  // Update clinic info (name, email, phone, working hours)
  const updateClinicInfo = (field: string, value: string) => {
    // Ensure clinicData exists
    if (!clinicData) {
      // initialize minimal structure if missing
      const base: Clinic = {
        clinicName: "",
        email: "",
        phone: "",
        workingHours: { [field]: value },
        consultations: [],
      };
      if (field === "clinicName" || field === "email" || field === "phone") {
        // @ts-ignore assign
        base[field] = value;
      }
      setClinicData(base);
      return;
    }

    if (field === "clinicName" || field === "email" || field === "phone") {
      setClinicData({ ...clinicData, [field]: value } as Clinic);
    } else {
      setClinicData({
        ...clinicData,
        workingHours: { ...(clinicData.workingHours || {}), [field]: value },
      });
    }
  };

  // Save clinic info (uses update endpoint when _id is present)
  const saveClinicData = async (data: Clinic): Promise<any> => {
    const url = data._id ? `/clinic-info/${data._id}` : `/clinic-info`;
    return HttpRequest({ url, method: "POST", data });
  };


  const saveData = async () => {
    if (!clinicData) {
      setAlertForm({ openAlert: true, alertStatus: "failure", openAlertMessage: "No clinic data to save" });
      return;
    }
    setLoading(true);
    try {
      const res = await saveClinicData(clinicData);
      // server returns { response: 'success', response_data: <doc> }
      const payload = res?.response_data || res;
      const source = Array.isArray(payload) ? payload[0] : payload;
      if (source) {
        const mapped: Clinic = {
          _id: source._id,
          clinicName: source.clinicName ?? clinicData.clinicName ?? "",
          email: source.email ?? clinicData.email ?? "",
          phone: source.phone ?? clinicData.phone ?? "",
          workingHours: source.workingHours ?? clinicData.workingHours ?? { "Monday-Friday": "" },
          consultations: (source.consultations ?? clinicData.consultations ?? []).map((c: any) => ({
            _id: c._id,
            day: c.day ?? "",
            generalPractice: c.generalPractice ?? "",
            specialistConsultations: c.specialistConsultations ?? "",
            emergency: c.emergency ?? "",
          })),
        };
        setClinicData(mapped);
      }

      setAlertForm({ openAlert: true, alertStatus: "success", openAlertMessage: "Clinic data saved successfully!" });
    } catch (error) {
      setAlertForm({ openAlert: true, alertStatus: "failure", openAlertMessage: "Failed to save clinic data" });
    } finally {
      setLoading(false);
    }
  };

  // Load initial data (try fetch, otherwise use sensible defaults)
  useEffect(() => {
    // let mounted = true;
    const load = async () => {
      try {
        const json = await HttpRequest({ url: "/clinic-info", method: "GET" });
        if (json?.response_data?.[0]) {
          const remote = json.response_data[0];
          const mapped: Clinic = {
            _id: remote._id,
            clinicName: remote.clinicName ?? "",
            email: remote.email ?? "",
            phone: remote.phone ?? "",
            workingHours: remote.workingHours ?? { "Monday-Friday": "" },
            consultations: (remote.consultations ?? []).map((c: any) => ({
              _id: c._id,
              day: c.day ?? "",
              generalPractice: c.generalPractice ?? "",
              specialistConsultations: c.specialistConsultations ?? "",
              emergency: c.emergency ?? "",
            })),
          };
          setClinicData(mapped);
          return;
        }
      } catch (e: any) {
        throw new Error(e?.message || "Somthing went wrong")
        // ignore and fallback
      }

      // Fallback default data if API not available
      // if (!mounted) return;
      const fallback: Clinic = {
        clinicName: "",
        email: "",
        phone: "",
        workingHours: {
          "Monday-Friday": "",
        },
        consultations: [],
      };
      setClinicData(fallback);
    };
    load();
    // return () => {
    //   mounted = false;
    // };
  }, []);

  return (
    <div className="p-6 space-y-6">
      <CustomAlert
      open={alertForm.openAlert}
      status={alertForm.alertStatus}
      message={alertForm.openAlertMessage}
      onClose={() => setAlertForm((pre) => ({ ...pre, openAlert: false }))}
      />
      {/* Clinic Info */}
      <Card>
      <CardHeader>
      <CardTitle>Clinic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
  <Input
  value={clinicData?.clinicName ?? ""}
  onChange={(e) => updateClinicInfo("clinicName", e.target.value)}
  placeholder="Clinic Name"
  />
  <Input
  value={clinicData?.email ?? ""}
  type="email"
  onChange={(e) => updateClinicInfo("email", e.target.value)}
  placeholder="Clinic Email"
  />
  <Input
  value={clinicData?.phone ?? ""}
  onChange={(e) => updateClinicInfo("phone", e.target.value)}
  placeholder="Clinic Phone"
  />
      {clinicData?.workingHours && Object.keys(clinicData?.workingHours)?.map((day) => (
      <div key={day} className="flex items-center gap-4">
        <span className="w-40 font-semibold">{day}</span>
        <Input
        value={clinicData.workingHours[day]}
        onChange={(e) => updateClinicInfo(day, e.target.value)}
        placeholder="Working Hours"
        />
      </div>
      ))}
      </CardContent>
      </Card>

      {/* Consultation Schedule */}
      <Card>
      <CardHeader>
      <CardTitle>Consultation Schedule</CardTitle>
      </CardHeader>
      <CardContent>
      <Table className="min-w-full border">
      <TableHeader>
        <TableRow>
        <TableHead>Day</TableHead>
        <TableHead>General Practice</TableHead>
        <TableHead>Specialist Consultations</TableHead>
        <TableHead>Emergency</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clinicData?.consultations?.map((c, idx) => (
        <TableRow key={c.day || idx} className="hover:bg-gray-50">
        <TableCell>{c.day ?? `Day ${idx+1}`}</TableCell>
        <TableCell>
        <Input
          value={c.generalPractice ?? ""}
          onChange={(e) => updateConsultation(idx, "generalPractice", e.target.value)}
        />
        </TableCell>
        <TableCell>
        <Input
          value={c.specialistConsultations ?? ""}
          onChange={(e) => updateConsultation(idx, "specialistConsultations", e.target.value)}
        />
        </TableCell>
        <TableCell>
        <Input
          value={c.emergency ?? ""}
          onChange={(e) => updateConsultation(idx, "emergency", e.target.value)}
        />
        </TableCell>
        </TableRow>
        ))}
      </TableBody>
      </Table>
      </CardContent>
      </Card>

      <Button
      className="bg-blue-600 text-white hover:bg-blue-700"
      onClick={saveData}
      disabled={loading}
      >
      {loading ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
};

export default AdminClinicPage;
