import React from 'react'
import { FaHeart } from 'react-icons/fa'

const FooterCom = () => {
    return (
        <div className=' mt-5 bg-slate-800'>
            <div className='py-5 px-auto  text-white w-3/4 mx-auto'>
         <div className='flex items-center'>
               <div className='flex justify-center items-center w-10 h-10 bg-blue-600 text-white text-center font-bold text-2xl rounded mr-2'><FaHeart /></div>
            <div className='pl-2'>
                <h2 className='font-bold text-xl'>MediBook Clinic</h2>
                <div className='text-md text-slate-300'>Professional Healthcare</div>
            </div>
         </div>
        </div>
        </div>
    )
}

export default FooterCom