import Image from 'next/image'
import Link from 'next/link'
import { FaRegCalendarMinus, FaRegClock } from 'react-icons/fa'
import { IoMdStar } from 'react-icons/io'
import { SiTicktick } from 'react-icons/si'
import React from 'react'

interface aboutProps {
    phone_number: string;
    workingHours: { [key: string]: string };
}

const AboutCom = ({ phone_number, workingHours }: aboutProps) => {
    const imgSrc = 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    return (
        <div className="flex flex-col lg:flex-row  w-full">
            {/* Left - Image */}
            <div className="relative w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-auto">
                <Image
                    src={imgSrc}
                    alt="Professional doctor in white coat with stethoscope"
                    fill
                    className="object-cover rounded-md"
                    loading="lazy"
                    priority={false}
                />

                {/* Badge */}
                <div className="absolute top-4 left-4">
                    <div className="rounded bg-white/90 backdrop-blur-sm px-3 py-1 shadow-sm inline-block">
                        <div className="flex items-center text-sm font-medium text-slate-800">
                            <SiTicktick className="text-green-500 mr-2" />
                            <span>Board Certified</span>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-4 right-4">
                    <div className="rounded bg-white/90 backdrop-blur-sm px-3 py-1 shadow-sm inline-block">
                        <div className="flex items-center text-sm font-medium text-slate-800">
                            <IoMdStar className="text-yellow-500 mr-2" />
                            <span>5-Star Care</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right - Content */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 bg-slate-50">
                <div className="max-w-xl text-center lg:text-left">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 mb-4 text-center">
                        Welcome to MediBook Clinic
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-slate-500 leading-relaxed text-center">
                        Your trusted partner in health and wellness. Experience compassionate care with our board-certified physicians.
                    </p>

                    <div className="mt-6 flex justify-center">
                        <Link href={"/book_appoinment"}>
                            <button className="rounded cursor-pointer bg-blue-600 px-8 sm:px-12 py-3 sm:py-4 text-white font-bold hover:bg-blue-700 transition">
                                <div className="flex items-center justify-center">
                                    <FaRegCalendarMinus className="text-xl mr-2" />
                                    <span>Book Appointment</span>
                                </div>
                            </button>
                        </Link>
                    </div>

                    <div className="text-slate-500 mt-4 text-sm text-center">
                        Online booking available 24/7
                    </div>

                    <div className='mx-3 lg:mx-8 mt-4'>
                        <div className='bg-blue-50 p-5 rounded-2xl '>
                            <div className='flex'>
                                <FaRegClock className='text-blue-600 mr-2 text-xl' />
                                <h2 className='text-slate-800 font-bold'>Working Hours</h2>
                            </div>
                            <table className="text-md w-full text-left mt-3">
                                <tbody>
                                    {Object.entries(workingHours).map(([day, hours]) => (
                                        <tr key={day}>
                                            <td className="text-slate-500 pr-4 py-1">{day}</td>
                                            <td className={hours === "Closed" ? "text-red-700 font-semibold" : "text-slate-800 font-semibold"}>
                                                {hours}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className='mt-4 text-center'>
                        <div className='text-slate-500 text-sm'>Need immediate assistance?</div>
                        <h2 className='text-blue-700 font-bold mt-2'>Call {phone_number}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutCom