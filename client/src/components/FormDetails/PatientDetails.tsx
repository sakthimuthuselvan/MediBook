'use client';
import React, { useState } from 'react';
import { RootState } from '@/store/store';
import CustomAlert from '@/components/ui/CustomAlert';
import { CgNotes } from 'react-icons/cg';
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineDateRange, MdOutlineLocalPhone, MdOutlineMailOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { updateForm, nextStepChange } from "@/store/FormSlice"

const REASON_LIST = [
    { value: "", label: "Select a reason" },
    { value: "consultation", label: "Consultation" },
    { value: "follow-up", label: "Follow-up" },
    { value: "routine-check", label: "Routine Check" },
    { value: "emergency", label: "Emergency" },
];

const PatientDetails = () => {
    const formData = useSelector((state: RootState) => state.form);
    const dispatch = useDispatch()

    const [alert, setAlert] = useState({ open: false, status: 'failure' as 'failure' | 'success', message: '' });

    const getMinDate = () => {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };
    const minDateStr = getMinDate();


    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        // setFormData(prev => ({ ...prev, [name]: value }));
        dispatch(updateForm({ [name]: value }));

    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // validate date exists and not before tomorrow
        if (!formData.doa) {
            setAlert({ open: true, status: 'failure', message: 'Please select an appointment date.' });
            return;
        }
        if (formData.doa < minDateStr) {
            setAlert({ open: true, status: 'failure', message: `Please select a date from ${minDateStr} or later.` });
            return;
        }
        dispatch(nextStepChange())
    }; 

    return (
        <div className="my-10 p-5 shadow-xl border rounded-md bg-white">
            <CustomAlert open={alert.open} status={alert.status} message={alert.message} onClose={() => setAlert((pre) => ({ ...pre, open: false }))} />
            {/* Header */}
            <h2 className="text-slate-800 text-2xl font-bold flex items-center gap-2 mb-1">
                <FaRegUser className="text-blue-600 text-[18px]" />
                Patient Information
            </h2>
            <p className="text-slate-500 text-md mb-4 mt-3">
                Your personal details for the appointment.
            </p>

            {/* Form Grid */}
            <form onSubmit={handleSubmit}>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className="block mb-1 font-medium text-md text-slate-800"><FaRegUser className='text-blue-600 mr-2 mb-1.5 align-center inline-block' />
                            First Name *</label>
                        <input
                            type="text"
                            name="firstName"
                            placeholder='Enter your first name'
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-3 text-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-md text-slate-800"><FaRegUser className='text-blue-600 mr-2 mb-1.5 align-center inline-block' />
                            Last Name *</label>
                        <input
                            type="text"
                            name="lastName"
                            placeholder='Enter your last name'
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-3 text-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-md text-slate-800"><MdOutlineMailOutline className='text-blue-600 mr-2 mb-1.5 align-center inline-block' />
                            Email Address *</label>
                        <input
                            type="email"
                            name="email"
                            placeholder='Enter your email address'
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-3 text-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-md text-slate-800"><MdOutlineLocalPhone className='text-blue-600 mr-2 mb-1.5 align-center inline-block' />
                            Phone *</label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder='Enter your phone number'
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-3 text-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block mb-1 font-medium text-md text-slate-800"><MdOutlineDateRange className='text-blue-600 mr-2 mb-1.5 align-center inline-block' />
                            Appointment Date *</label>
                        <input
                            type="date"
                            name="doa"
                            placeholder='Enter your Date of Appoinment'
                            value={formData.doa}
                            min={minDateStr}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-3 text-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>


                    <div className="sm:col-span-2">
                        <label className="block mb-1 font-medium text-md text-slate-800">
                            <CgNotes className='text-blue-600 mr-2 mb-1.5 align-center inline-block' />
                            Reason for Visit *
                        </label>
                        <select
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-3 text-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            {REASON_LIST.map((item) => (
                                <option key={item.value} value={item.value}>
                                    {item.label}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>
                <div className='flex justify-end mt-10'>
                    <button type='submit' className='bg-blue-600  p-3 px-4 text-white rounded-md cursor-pointer'>Next: Appoinment Details</button>
                </div>
            </form>

        </div>
    );
};

export default PatientDetails;
