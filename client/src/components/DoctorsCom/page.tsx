import Image from 'next/image'
import React from 'react'

interface doctorProps {
    name: string;
    profileImage: string;
    specialization: string;
    experience: string;
    description: string;
    certifications: string;
    tags: string[];
}
type DoctorsComProps = {
    overallDoctorList: doctorProps[];
};
const DoctorsCom = ({ overallDoctorList }: DoctorsComProps) => {
    return (
        <div className='mx-auto w-3/4'>
            <div className='mt-5 pt-10 mx-3'>
                <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-800 mb-4 text-center">
                    Meet Our Doctors
                </h2>

                <div className='text-slate-500 text-lg text-center mt-3'>Our experienced team of healthcare professionals is dedicated to your wellbeing</div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-5'>
                {overallDoctorList.map((item: any, i: any) => {
                    return (
                        <div key={i} className='shadow-slate-200 border rounded-xl p-3  lg:flex justify-between'>
                            <div className='flex justify-center lg:items-center'>
                                <div className="relative w-40 h-40 flex-shrink-0 ">
                                    <Image
                                        className="object-cover rounded-full"
                                        fill
                                        src={item?.image || ""}
                                        alt="Profile Image"
                                        loading="lazy"
                                    />
                                </div>
                            </div>

                            <div className='text-center mt-3 lg:mt-0 lg:text-start lg:ml-3'>
                                <h2 className='font-semibold'>{item?.name || "-"}</h2>
                                <h2 className='font-semibold mt-2 text-blue-700'>{item?.specialty || "-"}</h2>
                                <div className='mt-3 text-md'>{item?.bio || "-"}</div>

                                <div className='text-blue-700 text-sm bg-blue-50 inline-block rounded-2xl px-3 py-1 mt-3'>{"Served: " + item.patients_served || "-"}</div>

                                <div className='text-green-700 text-sm bg-green-50 inline-block rounded-2xl px-3 py-1 mt-3'>{item?.experience_years || "-"} + Years</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default DoctorsCom