import { Request, Response } from "express";
import Appointment  from "../models/appointment.model.js";
// import { IAppointment } from "../interfaces/clinicinfo.model.js";

// helper: generate a readable id and ensure uniqueness
const generateUniqueAppointmentId = async (prefix = "MB", maxAttempts = 8) => {
  let attempts = 0;
  while (attempts < maxAttempts) {
    const year = new Date().getFullYear();
    const randomSix = Math.floor(100000 + Math.random() * 900000); // 6 digits
    const candidate = `${prefix}-${year}-${randomSix}`;
    const exists = await Appointment.findOne({ appointmentId: candidate }).lean();
    if (!exists) return candidate;
    attempts++;
  }
  throw new Error("Unable to generate unique appointmentId");
};

// Create appointment
export const createAppointment = async (req: Request, res: Response) => {
  try {
    const payload = { ...req.body };
    payload.appointmentId = await generateUniqueAppointmentId();
    const appointment: any = new Appointment(payload);
    const savedAppointment = await appointment.save();

    res.status(201).json({ response: "success", data: savedAppointment });
  } catch (error: any) {
    // handle duplicate key for appointmentId (race condition)
    if (error?.code === 11000 && error?.keyValue?.appointmentId) {
      return res.status(409).json({ response: "failure", message: "Duplicate appointmentId, try again" });
    }
    res.status(500).json({ response: "failure", message: error.message });
  }
};

// Get all appointments
export const getAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find().populate("selectDoctor", "name specialization");
    res.status(200).json({ response: "success", data: appointments });
  } catch (error: any) {
    res.status(500).json({ response: "failure", message: error.message });
  }
};

// Get appointment by ID
export const getAppointmentById = async (req: Request, res: Response) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate("selectDoctor", "name specialization");
    if (!appointment) {
      return res.status(404).json({ response: "failure", message: "Appointment not found" });
    }
    res.status(200).json({ response: "success", data: appointment });
  } catch (error: any) {
    res.status(500).json({ response: "failure", message: error.message });
  }
};

// Update appointment (e.g., status or details)
export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    const appointment_res = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ response: "failure", message: "Appointment not found" });
    }
    res.status(200).json({ response: "success", data: appointment_res });
  } catch (error: any) {
    res.status(500).json({ response: "failure", message: error.message });
  }
};

// Delete appointment
export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ response: "failure", message: "Appointment not found" });
    }
    res.status(200).json({ response: "success", message: "Appointment deleted" });
  } catch (error: any) {
    res.status(500).json({ response: "failure", message: error.message });
  }
};

// Change appointment status
export const changeAppointmentStatus = async (req: Request, res: Response) => {
  try {
    // return res.status(501).json({ response: "failure", message: "Not implemented" });
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ response: "failure", message: "Status is required" });
    }
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ response: "failure", message: "Appointment not found" });
    }
    res.status(200).json({ response: "success", data: appointment });
  } catch (error: any) {
    res.status(500).json({ response: "failure", message: error.message });
  }
};
