import { Request, Response } from "express";
import mongoose from "mongoose";
import { ClinicInfoModel } from "../interfaces/clinicinfo.model.js";
import infoModel from "../models/info_model.js";


export const clinicInfoFun = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const response: ClinicInfoModel[] = await infoModel.find({})
        return res.status(200).json({ response: "success", response_data: response })
    } catch (error: any) {
        return res.status(500).json({
            response: "failure", response_message: error.message || "Internal Server Error",
        });
    }
}

export const updateClinicInfo = async (req: Request, res: Response) => {
    const request: ClinicInfoModel = req.body;
    const { id } = req.params;

    // Validate id
    if (!id || !mongoose.isValidObjectId(id)) {
        return res.status(400).json({ response: "failure", response_message: "Invalid or missing id parameter" });
    }

    try {
        // Remove any _id from the payload to avoid accidental _id overwrite
        const payload: any = { ...request };
        delete payload._id;

        // Check if the document exists before attempting update
        const existing = await infoModel.findById(id);
        if (!existing) {
            return res.status(404).json({ response: "failure", response_data: `Clinic info not found for id ${id}` });
        }

        // Apply the update and return the new document (ensure validators run)
        const updated: ClinicInfoModel | null = await infoModel.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
        if (!updated) {
            // This is rare because we checked existence above; log for investigation
            return res.status(500).json({ response: "failure", response_message: "Update failed unexpectedly" });
        }

        return res.status(200).json({
            response: "success",
            response_data: updated,
        });
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ response: "failure", response_message: error.message });
        }
        return res.status(500).json({ response: "failure", response_message: error.message || "Internal Server Error" });
    }
}

export const deleteClinicInfo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const response: ClinicInfoModel[] | null = await infoModel.findByIdAndDelete(id)
        if (!response) {
            return res.status(404).json({ response: "failure", response_data: "Clinic info not found" })
        }
        return res.status(200).json({
            response: "success",
            response_message: "Deleted successfully",
        });
    } catch (error: any) {
        return res.status(500).json({
            response: "failure", response_message: error.message || "Internal Server Error",
        });
    }
}