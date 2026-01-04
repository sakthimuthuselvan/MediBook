export interface ClinicInfoModel {
    _id?: string;
    clinicName: string;
    email?: string;
    phone?: string;
    workingHours: {
        "Monday-Friday": string,
        "Saturday": string,
        "Sunday": string,
    },
    consultations: {
        _id?: string;
        day: string
        generalPractice: string,
        specialistConsultations: string,
        emergency: string
    }[]
}

// interfaces/doctor.model.ts
export interface DoctorModel {
  name: string;
  profileImage: string;
  specialization: string;
  bio: string;
  certification: string;
  experienceYears: number;
}

export interface IAppointment {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  doa: Date;
  reason: string;
  selectedTime: string;
  selectDoctor: DoctorModel;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}