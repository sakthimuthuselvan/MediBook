"use client";

import React, { useState, useMemo } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const patientsData = [
  {
    id: 1,
    name: "John Doe",
    age: 32,
    gender: "Male",
    contact: "9876543210",
    email: "john@example.com",
    address: "123 Main Street, City",
    medicalHistory: "Diabetes, Hypertension",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 28,
    gender: "Female",
    contact: "9123456780",
    email: "jane@example.com",
    address: "456 Elm Street, City",
    medicalHistory: "Asthma",
  },
];

type Patient = typeof patientsData[0];

const PatientsPage = () => {
  const [patients, setPatients] = useState<Patient[]>(patientsData);
  const [searchText, setSearchText] = useState("");

  // Filter patients based on search
  const filteredPatients = useMemo(() => {
    if (!searchText) return patients;
    return patients.filter(
      (p) =>
        p.name.toLowerCase().includes(searchText.toLowerCase()) ||
        p.contact.includes(searchText) ||
        p.email.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, patients]);

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 180 },
    { field: "age", headerName: "Age", width: 100 },
    { field: "gender", headerName: "Gender", width: 120 },
    { field: "contact", headerName: "Contact", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "address", headerName: "Address", width: 250 },
    { field: "medicalHistory", headerName: "Medical History", width: 250 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setPatients(patients.filter((p) => p.id !== params.row.id))}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box className="p-6">
      <h2 className="text-2xl font-bold mb-4">Patients Management</h2>

      {/* Search Input */}
      <Input
        placeholder="Search by name, contact, or email"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="mb-4 w-full max-w-md"
      />

      {/* DataGrid */}
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={filteredPatients}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          autoHeight
        />
      </div>
    </Box>
  );
};

export default PatientsPage;
