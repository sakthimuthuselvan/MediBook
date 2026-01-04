import { Request, Response } from "express";
import Doctor from "../models/doctor_model.js";
import { DoctorModel } from "../interfaces/clinicinfo.model.js";

// Get all doctors
export const getAllDoctors = async (req: Request, res: Response): Promise<Response> => {
  try {
    const doctors: DoctorModel[] = await Doctor.find({});
    return res.status(200).json({ response: "success", data: doctors });
  } catch (error: any) {
    return res.status(500).json({ response: "failure", message: error.message || "Internal Server Error" });
  }
};

// Get doctor by ID
export const getDoctorById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const doctor: DoctorModel | null = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({ response: "failure", message: "Doctor not found" });
    }

    return res.status(200).json({ response: "success", data: doctor });
  } catch (error: any) {
    return res.status(500).json({ response: "failure", message: error.message || "Internal Server Error" });
  }
};

// Create new doctor
export const createDoctor = async (req: Request, res: Response): Promise<Response> => {
  try {
    const doctorData: DoctorModel = req.body;
    const newDoctor = await Doctor.create(doctorData);
    return res.status(201).json({ response: "success", data: newDoctor });
  } catch (error: any) {
    return res.status(500).json({ response: "failure", message: error.message || "Internal Server Error" });
  }
};

// Update doctor by ID
export const updateDoctor = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const doctorData: Partial<DoctorModel> = req.body;

    // Prevent _id overwrite
    delete (doctorData as any)._id;

    const updatedDoctor = await Doctor.findByIdAndUpdate(id, doctorData, { new: true, runValidators: true });

    if (!updatedDoctor) {
      return res.status(404).json({ response: "failure", message: "Doctor not found" });
    }

    return res.status(200).json({ response: "success", data: updatedDoctor });
  } catch (error: any) {
    return res.status(500).json({ response: "failure", message: error.message || "Internal Server Error" });
  }
};

// Delete doctor by ID
export const deleteDoctor = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const deleted = await Doctor.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ response: "failure", message: "Doctor not found" });
    }
    return res.status(200).json({ response: "success", message: "Deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ response: "failure", message: error.message || "Internal Server Error" });
  }
};
