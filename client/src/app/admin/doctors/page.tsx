"use client";

import React, { useState, useMemo, ChangeEvent, useEffect } from "react";
import { HttpRequest } from "@/lib/HttpRequest";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Image from "next/image";

type Doctor = {
  id: string | number;
  name: string;
  profile_img: string;
  specialization: string;
  experience: string;
  description: string;
  certifications: string[];
  // tags: string[];
};

const initialDoctors: Doctor[] = [];

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [searchText, setSearchText] = useState("");
  const [newDoctor, setNewDoctor] = useState<Omit<Doctor, "id">>({
    name: "",
    profile_img: "",
    specialization: "",
    experience: "",
    description: "",
    certifications: [],
    // tags: [],
  });

  // Load doctors from API
  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const json = await HttpRequest({ url: "/doctors", method: "GET" });
        const docs = json?.data || [];
        // Map server doctor shape to client Doctor shape
        const mapped = docs.map((d: any) => ({
          id: d._id,
          name: d.name,
          profile_img: d.profileImage || d.image || "",
          specialization: d.specialization || d.specialty || "",
          experience: d.experience_years ? String(d.experience_years) : "",
          description: d.bio || "",
          certifications: d.certification ? String(d.certification).split(",") : [],
          // tags: [],
        }));
        setDoctors(mapped);
      } catch (err: any) {
        throw new Error(err?.message || "Somthing went wrong")
      }
    };
    loadDoctors();
  }, []);

  // Edit Modal State
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editDoctor, setEditDoctor] = useState<Doctor | null>(null);

  // File Upload
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>, forEdit = false) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (forEdit && editDoctor) {
          setEditDoctor({ ...editDoctor, profile_img: reader.result as string });
        } else {
          setNewDoctor((prev) => ({ ...prev, profile_img: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Add Doctor
  const addDoctor = async () => {
    if (!newDoctor.name || !newDoctor.specialization) return;
    try {
      const payload = {
        name: newDoctor.name,
        profileImage: newDoctor.profile_img,
        specialization: newDoctor.specialization,
        bio: newDoctor.description,
        certification: newDoctor.certifications.join(","),
        experience_years: newDoctor.experience ? Number(newDoctor.experience) : undefined,
        image: newDoctor.profile_img,
      };
      const json = await HttpRequest({ url: "/doctors", method: "POST", data: payload });
      const d = json?.data;
      const mapped = {
        id: d._id,
        name: d.name,
        profile_img: d.profileImage || d.image || "",
        specialization: d.specialization || "",
        experience: d.experience_years ? String(d.experience_years) : "",
        description: d.bio || "",
        certifications: d.certification ? String(d.certification).split(",") : [],
        // tags: [],
      } as Doctor;
      setDoctors((prev) => [mapped, ...prev]);
      setNewDoctor({
        name: "",
        profile_img: "",
        specialization: "",
        experience: "",
        description: "",
        certifications: [],
        // tags: [],
      });
    } catch (err: any) {
      throw new Error(err?.message || "Something went wrong")
    }
  };

  // Delete Doctor
  const deleteDoctor = async (id: string | number) => {
    try {
      const _id = String(id);
      await HttpRequest({ url: `/doctors/${_id}`, method: "DELETE" });
      setDoctors((prev) => prev.filter((d) => d.id !== id));
    } catch (err: any) {
      throw new Error(err?.message || "Something went wrong")

    }
  };

  // Open Edit Modal
  const openEditModal = (doctor: Doctor) => {
    setEditDoctor(doctor);
    setIsEditOpen(true);
  };

  // Save Edit
  const saveEdit = async () => {
    if (!editDoctor) return;
    try {
      const payload = {
        name: editDoctor.name,
        profileImage: editDoctor.profile_img,
        specialization: editDoctor.specialization,
        bio: editDoctor.description,
        certification: editDoctor.certifications.join(","),
        experience_years: editDoctor.experience ? Number(editDoctor.experience) : undefined,
        image: editDoctor.profile_img,
      };

      const json = await HttpRequest({ url: `/doctors/${editDoctor.id}`, method: "PUT", data: payload });
      const d = json?.data;
      const mapped = {
        id: d._id,
        name: d.name,
        profile_img: d.profileImage || d.image || "",
        specialization: d.specialization || "",
        experience: d.experience_years ? String(d.experience_years) : "",
        description: d.bio || "",
        certifications: d.certification ? String(d.certification).split(",") : [],
        tags: [],
      } as Doctor;

      setDoctors((prev) => prev.map((dd) => (dd.id === mapped.id ? mapped : dd)));
      setIsEditOpen(false);
      setEditDoctor(null);
    } catch (err: any) {
      throw new Error(err?.message || "Something went wrong")
    }
  };

  // Filter Doctors
  const filteredDoctors = useMemo(() => {
    if (!searchText) return doctors;
    return doctors.filter(
      (d) =>
        d.name.toLowerCase().includes(searchText.toLowerCase()) ||
        d.specialization.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, doctors]);

  const columns: GridColDef[] = [
    {
      field: "profile_img",
      headerName: "Profile",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Image
          src={params?.value || ""}
          alt={params?.row?.name || ""}
          fill
          className="w-12 h-12 rounded-full object-cover"
          loading="lazy"
          priority={false}
        />
      ),
    },
    { field: "name", headerName: "Name", width: 180 },
    { field: "specialization", headerName: "Specialization", width: 200 },
    { field: "experience", headerName: "Experience", width: 120 },
    // {
    //   field: "tags",
    //   headerName: "Tags",
    //   width: 150,
    //   renderCell: (params) => (
    //     <div className="flex flex-wrap gap-1">
    //       {params.value.map((tag: string, idx: number) => (
    //         <span
    //           key={idx}
    //           className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
    //         >
    //           {tag}
    //         </span>
    //       ))}
    //     </div>
    //   ),
    // },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <div className="flex gap-2">
          <Button size="sm" onClick={() => openEditModal(params.row)}>
            Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={() => deleteDoctor(params.row.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Box className="p-6">
      <h2 className="text-2xl font-bold mb-4">Doctors Management</h2>

      {/* Add Doctor Form */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Input
          placeholder="Name"
          value={newDoctor.name}
          onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileUpload(e)}
          className="border rounded p-2"
        />
        {newDoctor.profile_img && (
          <Image
            src={newDoctor?.profile_img || ""}
            alt={"Preview"}
            fill
            className="w-24 h-24 rounded-full object-cover"
            loading="lazy"
            priority={false}
          />
        )}
        <Input
          placeholder="Specialization"
          value={newDoctor.specialization}
          onChange={(e) => setNewDoctor({ ...newDoctor, specialization: e.target.value })}
        />
        <Input
          placeholder="Experience"
          value={newDoctor.experience}
          onChange={(e) => setNewDoctor({ ...newDoctor, experience: e.target.value })}
        />
        <Input
          placeholder="Description"
          value={newDoctor.description}
          onChange={(e) => setNewDoctor({ ...newDoctor, description: e.target.value })}
        />
        {/* <Input
          placeholder="Tags (comma separated)"
          value={newDoctor.tags.join(",")}
          onChange={(e) => setNewDoctor({ ...newDoctor, tags: e.target.value.split(",") })}
        /> */}
        <Input
          placeholder="Certifications (comma separated)"
          value={newDoctor.certifications.join(",")}
          onChange={(e) => setNewDoctor({ ...newDoctor, certifications: e.target.value.split(",") })}
        />
        <Button className="col-span-full" onClick={addDoctor}>
          Add Doctor
        </Button>
      </div>

      {/* Search */}
      <Input
        placeholder="Search by name, specialization, or tags"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="mb-4 w-full max-w-md"
      />

      {/* DataGrid */}
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={filteredDoctors}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          autoHeight
        />
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Edit Doctor</DialogTitle>
          </DialogHeader>
          {editDoctor && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <Input
                placeholder="Name"
                value={editDoctor.name}
                onChange={(e) => setEditDoctor({ ...editDoctor, name: e.target.value })}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, true)}
                className="border rounded p-2"
              />
              {editDoctor.profile_img && (
                <Image
                  src={editDoctor?.profile_img || ""}
                  alt={"Preview"}
                  fill
                  className="w-24 h-24 rounded-full object-cover"
                  loading="lazy"
                  priority={false}
                />
              )}
              <Input
                placeholder="Specialization"
                value={editDoctor.specialization}
                onChange={(e) => setEditDoctor({ ...editDoctor, specialization: e.target.value })}
              />
              <Input
                placeholder="Experience"
                value={editDoctor.experience}
                onChange={(e) => setEditDoctor({ ...editDoctor, experience: e.target.value })}
              />
              <Input
                placeholder="Description"
                value={editDoctor.description}
                onChange={(e) => setEditDoctor({ ...editDoctor, description: e.target.value })}
              />
              {/* <Input
                placeholder="Tags (comma separated)"
                value={editDoctor.tags.join(",")}
                onChange={(e) => setEditDoctor({ ...editDoctor, tags: e.target.value.split(",") })}
              /> */}
              <Input
                placeholder="Certifications (comma separated)"
                value={editDoctor.certifications.join(",")}
                onChange={(e) => setEditDoctor({ ...editDoctor, certifications: e.target.value.split(",") })}
              />
            </div>
          )}
          <DialogFooter>
            <Button onClick={saveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default DoctorsPage;
