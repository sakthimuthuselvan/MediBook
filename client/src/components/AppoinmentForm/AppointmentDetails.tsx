"use client"
import Image from 'next/image';
import React, { Suspense, useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaUser } from "react-icons/fa";
import { IoMdStar } from 'react-icons/io';
import { bookedData, nextStepChange, previousStepChange, selectDoctor } from '@/store/FormSlice';
import CustomAlert from '@/components/ui/CustomAlert';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { HttpRequest } from '@/lib/HttpRequest';

const TimeSlotCom = React.lazy(() => import("@/components/AppoinmentForm/TImeSlotCom"))

const AppointmentDetails = () => {
	const [overall, setOverall] = useState([])
	const [loading, setLoading] = useState(false)
	const [alert, setAlert] = useState({ open: false, status: 'failure' as 'failure' | 'success', message: '' })
	const dispatch = useDispatch();
	const formData = useSelector((state: RootState) => state.form)
	const selectedDoctor = formData?.selectDoctor || {}

	const doctorSelectBtnClick = (item: any): void => {
		dispatch(selectDoctor(item))
	}

	useEffect(() => {
		doctorsListApiCall()
	}, [])

	const doctorsListApiCall = async () => {
		try {
			const response = await HttpRequest({
				url: "/doctors",
				method: "GET"
			})
			setOverall(response?.data || [])
		} catch (error) {
			setAlert({ open: true, status: 'failure', message: 'Failed to load doctors. Please try again.' })
		}
	}

	const continueConfirmBtnClick = async () => {
		// Client-side validation
		if (!formData?.selectDoctor?._id) {
			setAlert({ open: true, status: 'failure', message: 'Please select a doctor before confirming.' })
			return
		}
		if (!formData?.selectedTime) {
			setAlert({ open: true, status: 'failure', message: 'Please select a time slot.' })
			return
		}

		setLoading(true)
		try {
			const response = await HttpRequest({
				url: "/appointments/create", method: "POST",
				data: {
					"firstName": formData?.firstName || "",
					"lastName": formData?.lastName || "",
					"email": formData?.email || "",
					"phone": formData?.phone || "",
					"doa": formData?.doa || "",
					"reason": formData?.reason || "",
					"selectedTime": formData?.selectedTime || "",
					"selectDoctor": formData?.selectDoctor?._id || "",
				}
			})

			// Expecting response.data to contain booking info
			if (response?.data) {
				dispatch(bookedData(response?.data))
				setAlert({ open: true, status: 'success', message: 'Appointment booked successfully!' })
				dispatch(nextStepChange())
			} else {
				setAlert({ open: true, status: 'failure', message: 'Booking failed. Please try again.' })
			}

		} catch (error) {
			setAlert({ open: true, status: 'failure', message: 'Booking failed. Please try again.' })
		} finally {
			setLoading(false)
		}

	}

	return (
		<div>
			<CustomAlert open={alert.open} status={alert.status} message={alert.message} onClose={() => setAlert(prev => ({ ...prev, open: false }))} />
			<div className='p-5 shadow rounded-md mt-5'>
				<div className='flex items-center'>
					<div className='mr-3 inline-block bg-blue-100 text-blue-600 p-2 rounded-sm '>
						<FaUser />
					</div>
					<h1 className='text-slate-700 font-bold text-lg'>Choose Your Healthcare Provider</h1>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
					{overall.map((item: any, index: number) => {
						const check = selectedDoctor._id === item._id ? true : false
						return (
							<div onClick={() => doctorSelectBtnClick(item)}
								key={index}
								className={`border-2 p-3 rounded-sm mt-3 transform transition-transform hover:scale-101 hover:border-blue-400 flex items-center ${check ? "bg-blue-100 transition-colors duration-300 border-blue-400" : ""}`}>
								<div className="rounded-full p-3 mr-2">
									<Image
										src={item.image}
										alt="My photo"
										width={60}
										height={60}
										className="rounded-full"
									/>
								</div>
								<div>
									<h2 className='font-bold'>{item?.name || "-"}</h2>
									<h4 className='font-bold text-blue-700'>{item?.specialty || "-"}</h4>
									<div className='text-slate-600 text-sm'>{item?.experience_years || "-"} year Experience</div>
									<div className='text-slate-600 text-sm'>
										<IoMdStar className='text-yellow-500 inline-block' />
										<span className='ml-1'>{item.rating}</span>
										<span className=''>{" | "} {item.patients_served}+ patients</span>
									</div>
								</div>
							</div>
						)
					})}
				</div>

				<div>
					<Suspense fallback={<h1> </h1>}>
						<TimeSlotCom />
					</Suspense>
				</div>

				<div className='flex justify-between my-10'>
					<div onClick={() => dispatch(previousStepChange())} className='hidden text-md font-medium text-blue-700 md:flex items-center cursor-pointer'><FaChevronLeft className='mr-2' /> Back to Patient Info</div>
					<div className='md:hidden inline-block rounded-xl bg-blue-200 px-4 py-4 text-blue-700'>
						<FaChevronLeft className='' />
					</div>
					<button onClick={() => continueConfirmBtnClick()} disabled={loading} className='p-3 text-white bg-blue-600 rounded-md font-semibold tracking-wide flex items-center cursor-pointer hover:bg-blue-700 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed'>{loading ? 'Booking...' : 'Confirm Book'} <FaChevronRight className='ml-2' /> </button>
				</div>
			</div>
		</div>
	)
}

export default AppointmentDetails