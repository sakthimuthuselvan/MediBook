'use client';

import StepperCom from '@/components/AppoinmentForm/StepperCom'
import { RootState } from '@/store/store';
import React, { Suspense } from 'react'
import { LuNotebookText } from 'react-icons/lu'
import { useSelector } from 'react-redux';

const PatientDetails = React.lazy(() => import("@/components/FormDetails/PatientDetails"))
const AppointmentDetails = React.lazy(() => import("@/components/AppoinmentForm/AppointmentDetails"))
const ConfirmationCom = React.lazy(() => import("@/app/book_appoinment/Confirmation/ConfirmationCom"))

const bookAppoinment = () => {
    const formData = useSelector((state: RootState) => state.form)
    const current_step = formData?.currentStep || ""    
    return (
        <div className='w-full lg:w-[90%] mx-auto text-slate-800'>
            <StepperCom />
            <div className='grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4"'>

                <div className='px-4 mt-3'>
                    <h1 className='font-extrabold text-4xl text-slate-800'>
                       {current_step === 1 && "Complete Your Booking"}
                       {current_step === 2 && "Schedule Your Appointment"}
                       {/* {current_step === 3 && "Complete Your Booking"} */}
                        </h1>
                    <div className='mt-3 text-slate-500 text-md'>
                        {current_step === 1 && "Please provide your information to schedule your appointment with our healthcare professionals."}
                        {/* {current_step === 2 && "Select your preferred date, time, and healthcare provider for your appointment."} */}
                    </div>
                </div>

                {current_step !== 3 && <div className='px-4 sm:px-0'>
                    <div className='border shadow-sm p-3 rounded-md mt-5 sm:mt-0'>
                        <div className='flex align-center font-bold'><LuNotebookText className='text-blue-700 text-lg mr-2' /> Booking Summary</div>
                        <div className='mt-3 text-slate-500 text-md '>
                            Complete the form to see your appointment summary here.
                        </div>
                    </div>
                </div>}

            </div>

            {current_step === 1 && <Suspense fallback={<h1> </h1>}>
                <PatientDetails />
            </Suspense>}

            {current_step === 2 && <Suspense fallback={<h1> </h1>}>
                <AppointmentDetails />
            </Suspense>}

               {current_step === 3 && <Suspense fallback={<h1> </h1>}>
                <ConfirmationCom />
            </Suspense>}

        </div>
    )
}

export default bookAppoinment