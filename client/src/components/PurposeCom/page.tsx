import React from 'react'
import { AiOutlineSafetyCertificate } from 'react-icons/ai'
import { FaRegBuilding } from 'react-icons/fa'
import { IoMdCard, IoMdTime } from 'react-icons/io'

const PurposeCom = () => {
    return (
        <div className='mt-5 pt-10 mx-3'>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-800 mb-4 text-center">
                Why Choose MediBook Clinic?
            </h2>

            <div className='text-slate-500 text-lg text-center mt-3'>We're committed to providing exceptional healthcare with a personal touch.</div>

            <div className="w-full flex flex-wrap justify-center mt-5 px-2">
                {/* Feature 1 */}
                <div className="w-full sm:w-1/2 lg:w-1/4 px-3 mb-6 text-center">
                    <div className="flex justify-center">
                        <div className="bg-blue-200 p-4 rounded-2xl">
                            <AiOutlineSafetyCertificate className="text-blue-700 text-3xl" />
                        </div>
                    </div>
                    <div className="text-slate-800 font-semibold mt-2 text-lg">Certified Doctors</div>
                    <div className="text-slate-500 text-sm mt-2">
                        Board-certified physicians with years of experience
                    </div>
                </div>

                {/* Feature 2 */}
                <div className="w-full sm:w-1/2 lg:w-1/4 px-3 mb-6 text-center">
                    <div className="flex justify-center">
                        <div className="bg-green-200 p-4 rounded-2xl">
                            <IoMdTime className="text-green-700 text-3xl" />
                        </div>
                    </div>
                    <div className="text-slate-800 font-semibold mt-2 text-lg">24/7 Support</div>
                    <div className="text-slate-500 text-sm mt-2">
                        Round-the-clock emergency care and consultation
                    </div>
                </div>

                {/* Feature 3 */}
                <div className="w-full sm:w-1/2 lg:w-1/4 px-3 mb-6 text-center">
                    <div className="flex justify-center">
                        <div className="bg-blue-200 p-4 rounded-2xl">
                            <FaRegBuilding className="text-blue-700 text-3xl" />
                        </div>
                    </div>
                    <div className="text-slate-800 font-semibold mt-2 text-lg">Modern Facilities</div>
                    <div className="text-slate-500 text-sm mt-2">
                        State-of-the-art equipment and comfortable environment
                    </div>
                </div>

                {/* Feature 4 */}
                <div className="w-full sm:w-1/2 lg:w-1/4 px-3 mb-6 text-center">
                    <div className="flex justify-center">
                        <div className="bg-gray-200 p-4 rounded-2xl">
                            <IoMdCard className="text-gray-700 text-3xl" />
                        </div>
                    </div>
                    <div className="text-slate-800 font-semibold mt-2 text-lg">Insurance Accepted</div>
                    <div className="text-slate-500 text-sm mt-2">
                        Most major insurance plans accepted
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PurposeCom