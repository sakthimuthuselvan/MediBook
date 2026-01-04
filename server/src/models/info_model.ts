import mongoose, { Collection, Schema } from "mongoose";
import { ClinicInfoModel } from "../interfaces/clinicinfo.model.js"

export const infoSchema: Schema = new Schema<ClinicInfoModel>({
    clinicName: { type: String, required: true, trim: true },
    email: { type: String, required: false, trim: true },
    phone: { type: String, required: false, trim: true },
    workingHours: {
        "Monday-Friday": { type: String, required: true, trim: true },
        "Saturday": { type: String, required: true, trim: true },
        "Sunday": { type: String, required: true, trim: true },
    },
    consultations: [
        {
            // _id is added automatically for subdocuments by Mongoose
            day: { type: String, required: true, trim: true },
            generalPractice: { type: String, required: true, trim: true },
            specialistConsultations: { type: String, required: true, trim: true },
            emergency: { type: String, required: true, trim: true },
        }
    ],
},
    { timestamps: true, collection: "info" }
)

const infoModel = mongoose.model("infoSchema", infoSchema)

export default infoModel