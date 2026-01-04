// models/doctor_model.ts
import mongoose, { Schema, Model, model } from "mongoose";
import { DoctorModel } from "../interfaces/clinicinfo.model.js";

const doctorSchema: Schema<DoctorModel> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    profileImage: { type: String, required: true, trim: true },
    specialization: { type: String, required: true, trim: true },
    bio: { type: String, required: true, trim: true },
    certification: { type: String, required: true, trim: true },
    experienceYears: { type: Number, required: true },
  },
  {
    timestamps: true,
    collection: "doctors", // MongoDB collection name
  }
);

const Doctor: Model<DoctorModel> = model<DoctorModel>("Doctor", doctorSchema);

export default Doctor;
