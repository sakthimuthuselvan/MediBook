import React from 'react'
import { FaHeart } from 'react-icons/fa';

interface navProps {
    clinic_name: string;
    phone_number: string;
    email: string;
}

const NavBarCom: React.FC<navProps> = ({ clinic_name, phone_number }) => {
    return (
        <div className='container mx-auto p-4 border-b-2'>
            <div className='flex justify-between'>
                <div className='flex py-2 '>
                    <div className='flex justify-center items-center w-10 h-10 bg-blue-600 text-white text-center font-bold text-2xl rounded mr-2'><FaHeart /></div>
                    <div>
                        <h2 className='font-bold text-slate-800 text-xl'>{clinic_name}</h2>
                        <div className='text-gray-500 text-sm'>Clinic</div>
                    </div>
                </div>
                <div className='hidden lg:block'>
                    <div className='flex'>
                        <div>
                            <div className='text-black font-bold'>{phone_number}</div>
                            <div className='text-gray-500 text-sm'>24/7 Support Available</div>
                        </div>

                        <div className='pl-2'>
                            <a href={`tel:${phone_number}`}>
                                <button className='bg-blue-600 py-3 px-5 text-white rounded font-bold'>Call Now</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBarCom