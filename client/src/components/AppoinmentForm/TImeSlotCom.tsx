"use client"
import React from 'react'
import { FaUser } from "react-icons/fa";
import { selectTimeSlot } from '@/store/FormSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const TimeSlotCom = () => {
    const dispatch = useDispatch();
    const formData = useSelector((state: RootState) => state.form)
    
    const OVERALL = {
        "date": "2025-08-28",
        "is_day_closed": false,
        "time_slots": [
            { "time": "09:00 AM", "is_booked": true, "is_closed_by_admin": false },
            { "time": "09:30 AM", "is_booked": false, "is_closed_by_admin": false },
            { "time": "10:00 AM", "is_booked": true, "is_closed_by_admin": false },
            { "time": "10:30 AM", "is_booked": false, "is_closed_by_admin": false },
            { "time": "11:00 AM", "is_booked": false, "is_closed_by_admin": false }
        ]
    }

    const timeBtnClick = (item: any) => {
        dispatch(selectTimeSlot(item.time))
    }

    return (
        <div>
            <div className='p-5 shadow rounded-md mt-5'>
                <div className='flex items-center'>
                    <div className='mr-3 inline-block bg-blue-100 text-blue-600 p-2 rounded-sm '>
                        <FaUser />
                    </div>
                    <h1 className='text-slate-700 font-bold text-lg'>Available Time Slots</h1>
                </div>


                <div className='grid grid-cols-2 md:grid-cols-5 gap-2 mt-4'>
                    {OVERALL?.time_slots.map((item: any, i: number) => {
                        const hide_slot = item.is_booked || item.is_closed_by_admin ? true : false;
                        const selected = formData.selectedTime === item.time
                        return (
                            <div key={i}
                                onClick={() => !hide_slot ? timeBtnClick(item) : null}
                                className={`border-2 rounded-sm px-5 py-3 text-center  font-semibold
                                    ${selected ? "text-white bg-blue-700 hover:bg-blue-700" : ""}
                            ${hide_slot ? "text-gray-400 cursor-not-allowed" : "hover:border-blue-500 hover:bg-blue-50 cursor-pointer"}  `}>
                                {item.time}
                            </div>
                        )
                    })}
                </div>

            </div>
        </div >
    )
}

export default TimeSlotCom