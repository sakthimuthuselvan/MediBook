"use client"

import React, { useState } from 'react'

interface scheduleProps {
    scheduleData: {
        day: string;
        generalPractice: string;
        specialistConsultations: string;
        emergency: string;
    }[]
}
const ScheduleCom: React.FC<scheduleProps> = ({scheduleData}) => {
    return (
        <div className='bg-slate-50'>
            <div className='mt-5 pt-10 mx-3'>
                <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-800 mb-4 text-center">
                    Clinic Schedule
                </h2>

                <div className='text-slate-500 text-lg text-center mt-3'>Plan your visit with our comprehensive schedule</div>

                <div className='mt-3 flex justify-center'>
                    <div className="overflow-x-auto w-full lg:w-1/2 rounded-lg shadow">
                        <table className="min-w-full border border-gray-200 text-sm text-left text-slate-700 rounded-lg overflow-hidden">
                            <thead className="bg-blue-50 text-slate-800">
                                <tr>
                                    <th className="px-4 py-4 border-b">Day</th>
                                    <th className="px-4 py-4 border-b">General Practice</th>
                                    <th className="px-4 py-4 border-b">Specialist Consultations</th>
                                    <th className="px-4 py-4 border-b">Emergency</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scheduleData.map((row: any, index: any) => {
                                    let check1 = row.specialistConsultations === "Closed" ? true : false
                                    let check2 = row.generalPractice === "Closed" ? true : false
                                    return (
                                        <tr key={index} className="text-md">
                                            <td className="px-4 py-4 border-b font-bold text-slate-700">{row.day}</td>
                                            <td className={`px-4 py-4 border-b ${check1 ? "text-red-600 font-semibold" : ""}`}>{row.generalPractice}</td>
                                            <td className={`px-4 py-4 border-b ${check2 ? "text-red-600 font-semibold" : ""}`}>{row.specialistConsultations}</td>
                                            <td className="px-4 py-4 border-b text-green-600 font-bold">{row.emergency}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ScheduleCom