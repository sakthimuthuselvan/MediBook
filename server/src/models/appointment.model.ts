import mongoose, { Schema, Document } from "mongoose";
import { IAppointment } from "../interfaces/clinicinfo.model.js";

const AppointmentSchema: Schema = new Schema<IAppointment>(
  {
    // Human readable unique appointment id, e.g. "MB-2025-911815"
    appointmentId: { type: String, required: true, unique: true, index: true, trim: true },

    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    doa: { type: Date, required: true },
    reason: { type: String, required: true, trim: true },
    selectedTime: { type: String, required: true },

    // Reference to doctor
    selectDoctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true, collection: "appointments" }
);

export default mongoose.model<IAppointment>("Appointment", AppointmentSchema);
