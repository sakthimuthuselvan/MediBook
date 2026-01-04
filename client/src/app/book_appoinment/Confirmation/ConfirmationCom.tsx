
import { RootState } from '@/store/store';
import React, { Suspense } from 'react'
import { FaCalendarCheck, FaUser } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { IoCheckmarkOutline, IoCheckmarkSharp } from 'react-icons/io5'
import { TiDocumentText } from 'react-icons/ti';
import { useSelector } from 'react-redux';
import moment from  "moment"
const ContactSectionCom = React.lazy(() => import("./ContactSection"))
const ConfirmationCom = () => {
    const formData = useSelector((state: RootState) => state.form)    
    const appointmentData = {
        patient: {
            name: `${formData?.firstName || ""} ${formData?.lastName || ""}`,
            email: formData?.email|| "",
            phone: formData?.phone || "",
            reason: formData?.reason || ""
        },
        appointment: {
            doctor: {
                name: formData?.selectDoctor?.name || "",
                specialty: formData?.selectDoctor?.specialty || "",
                photo: formData?.selectDoctor?.image || "",
            },
            date: formData?.doa ? moment(formData?.doa).format("ll") : "-",
            time: formData?.selectedTime || "-",
            duration: "20 min",
            location: {
                clinic: "MediBook Clinic",
                address: "123 Health Street, Medical District"
            }
        }
    };


    const summaryCardHtmlBuild = (): React.ReactNode => {
        const data = appointmentData;

        return (
            <div className='shadow-md rounded-b-xl'>
                <div className='flex shadow-md justify-between bg-blue-600 text-white p-5 rounded-t-xl mt-5'>
                    <div className='text-start '>
                        <div className='text-xl font-bold'>Appointment Summary</div>
                        <div>Reference Number: {formData?.bookedData?.appointmentId || "-"}</div>
                    </div>
                    <div>
                        <div>Scheduled on</div>
                        <div>{formData?.bookedData?.doa ? moment(formData?.bookedData?.doa).format("ll") : "-"}</div>
                    </div>
                </div>

                <div className=" mx-auto bg-white rounded-2xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Patient Information */}
                        <div className='text-start'>
                            <h2 className="text-lg font-semibold mb-4">Patient Information</h2>

                            <div className="flex items-start gap-3 mb-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                    <FaUser className='text-blue-600' />
                                </div>
                                <div>
                                    <p className="font-semibold">{data.patient.name}</p>
                                    <p className="text-gray-600 text-sm">{data.patient.email}</p>
                                    <p className="text-gray-600 text-sm">{data.patient.phone}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                    <TiDocumentText className='text-blue-600' />
                                </div>
                                <div>
                                    <p className="font-semibold">Visit Reason</p>
                                    <p className="text-gray-600 text-sm">{data.patient.reason}</p>
                                </div>
                            </div>
                        </div>

                        {/* Appointment Details */}
                        <div className='text-start'>
                            <h2 className="text-lg font-semibold mb-4">Appointment Details</h2>

                            <div className="flex items-start gap-3 mb-4">
                                <img
                                    src={data.appointment.doctor.photo}
                                    alt="Doctor"
                                    className="h-10 w-10 rounded-full"
                                />
                                <div>
                                    <p className="font-semibold">{data.appointment.doctor.name}</p>
                                    <p className="text-blue-600 text-sm">{data.appointment.doctor.specialty}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 mb-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                    <FaCalendarCheck className='text-blue-600' />
                                </div>
                                <div>
                                    <p className="font-semibold">{data.appointment.date}</p>
                                    <p className="text-gray-600 text-sm">
                                        {data.appointment.time} • {data.appointment.duration}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                    <FaLocationDot className='text-blue-600' />
                                </div>
                                <div>
                                    <p className="font-semibold">{data.appointment.location.clinic}</p>
                                    <p className="text-gray-600 text-sm">
                                        {data.appointment.location.address}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='text-center md:w-[75%] md:mx-auto tracking-wide px-3'>
            <div className='text-slate-500 text-sm'>Booking Complete - Your appointment has been successfully scheduled</div>
            <div className='flex justify-center mt-5'>
                <div className='inline-block p-7 rounded-full bg-green-200'>
                    <IoCheckmarkSharp className='text-4xl text-green-700' />
                </div>
            </div>
            <h1 className='text-slate-800 font-bold text-3xl md:text-4xl tracking-wide mt-4'>Appointment Confirmed!</h1>

            <div className='mt-5 text-sm md:text-md text-slate-500'>
                Thank you for booking with MediBook Clinic. Your appointment has been successfully scheduled and a confirmation email has been sent to your email address.
            </div>

            <div>{summaryCardHtmlBuild()}</div>

            <div className='mt-5'>
                <Suspense fallback={<h1> </h1>}>
                <ContactSectionCom />
                </Suspense>
            </div>
        </div>
    )
}

export default ConfirmationCom