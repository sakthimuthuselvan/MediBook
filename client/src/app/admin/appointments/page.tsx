"use client";

import React, { useState, useMemo, useEffect } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Button, TextField, Box, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from "@mui/material";
import { HttpRequest } from "@/lib/HttpRequest";

type Appointment = {
  id: string | number;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  status: "Pending" | "Confirmed" | "Cancelled";
  email?: string;
  phone?: string;
  reason?: string;
  raw?: any;
};

const AppointmentTable = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await HttpRequest({ url: "/appointments", method: "GET" });
        const data = res?.data || [];
        if (!mounted) return;
        const mapped = data.map((a: any) => {
          const dateRaw = a.doa || a.dob || null;
          const date = dateRaw ? new Date(dateRaw).toISOString().split("T")[0] : "";
          return ({
            id: a._id,
            patientName: `${a.firstName} ${a.lastName}`,
            doctorName: a.selectDoctor?.name || "-",
            date,
            time: a.selectedTime || "",
            status: a.status ? String(a.status).charAt(0).toUpperCase() + String(a.status).slice(1) : "Pending",
            email: a.email || "",
            phone: a.phone || "",
            reason: a.reason || "",
            raw: a,
          });
        });
        setAppointments(mapped);
      } catch (err) {
        console.error("Failed to load appointments", err);
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  // Update status (Confirm/Cancel) via API
  const updateStatus = async (id: string | number, newStatus: "Confirmed" | "Cancelled") => {
    try {
      const statusPayload = { status: newStatus.toLowerCase() };
      const res = await HttpRequest({ url: `/api/appointments/status/${id}`, method: "PUT", data: statusPayload });
      const updated = res?.data;
      if (updated) {
        setAppointments((prev) => prev.map((app) => {
          if (app.id !== id) return app;
          const computed: Appointment['status'] = updated.status
            ? (String(updated.status).charAt(0).toUpperCase() + String(updated.status).slice(1)) as Appointment['status']
            : app.status;
          return { ...app, status: computed };
        }));
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  // Filter rows based on search input
  const filteredData = useMemo(() => {
    if (!searchText) return appointments;
    return appointments.filter(
      (app) =>
        app.patientName.toLowerCase().includes(searchText.toLowerCase()) ||
        app.doctorName.toLowerCase().includes(searchText.toLowerCase()) ||
        app.status.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, appointments]);

  // Table columns
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "patientName", headerName: "Patient Name", width: 180 },
    { field: "doctorName", headerName: "Doctor", width: 180 },
    { field: "date", headerName: "Date", width: 120 },
    { field: "time", headerName: "Time", width: 120 },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => {
        let color: "default" | "success" | "error" | "warning" = "warning";
        if (params.value === "Confirmed") color = "success";
        else if (params.value === "Cancelled") color = "error";
        return <Chip label={params.value} color={color} size="small" />;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="outlined" size="small" onClick={() => { setSelectedAppointment(params.row); setIsDialogOpen(true); }}>
            View
          </Button>
          <Button
            variant="contained"
            color="success"
            size="small"
            disabled={params.row.status === "Confirmed"}
            onClick={() => updateStatus(params.row.id, "Confirmed")}
          >
            Confirm
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            disabled={params.row.status === "Cancelled"}
            onClick={() => updateStatus(params.row.id, "Cancelled")}
          >
            Cancel
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <h2 style={{ marginBottom: 16, fontSize: 24, fontWeight: 600 }}>Clinic Appointments</h2>

      {/* Search */}
      <TextField
        placeholder="Search by patient, doctor, or status"
        variant="outlined"
        size="small"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        sx={{ mb: 2, width: "100%", maxWidth: 400 }}
      />

      {/* Details dialog */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Appointment Details</DialogTitle>
        <DialogContent dividers>
          {selectedAppointment ? (
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Typography variant="body2"><strong>Patient</strong></Typography>
              <Typography variant="body2">{selectedAppointment.patientName}</Typography>

              <Typography variant="body2"><strong>Email</strong></Typography>
              <Typography variant="body2">{selectedAppointment.email}</Typography>

              <Typography variant="body2"><strong>Phone</strong></Typography>
              <Typography variant="body2">{selectedAppointment.phone}</Typography>

              <Typography variant="body2"><strong>Doctor</strong></Typography>
              <Typography variant="body2">{selectedAppointment.doctorName}</Typography>

              <Typography variant="body2"><strong>Date</strong></Typography>
              <Typography variant="body2">{selectedAppointment.date}</Typography>

              <Typography variant="body2"><strong>Time</strong></Typography>
              <Typography variant="body2">{selectedAppointment.time}</Typography>

              <Typography variant="body2"><strong>Reason</strong></Typography>
              <Typography variant="body2" sx={{ gridColumn: '1 / -1' }}>{selectedAppointment.reason}</Typography>
            </Box>
          ) : (
            <div>No details</div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }} // includes search, export, columns toggle
          autoHeight
          loading={loading}
        />
      </div>
    </Box>
  );
};

export default AppointmentTable;
