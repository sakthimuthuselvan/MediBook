'use client';
import { RootState } from '@/store/store';
import React from 'react';
import { useSelector } from 'react-redux';

const StepperCom = ({ currentStep = 1 }: { currentStep?: number }) => {
    const formdata = useSelector((state: RootState) => state.form);
    return (
        <div className="p-4 mt-3 w-full">
            <div className='w-full flex justify-center'>
                <ol className="w-full lg:w-1/2 flex  items-center justify-around  font-medium text-gray-500 bg-white rounded-lg text-xs md:text-sm overflow-x-auto">
                    {formdata?.pageSteps.map((label, index) => {
                        const stepNumber = index + 1;
                        const isActive = stepNumber === formdata?.currentStep;
                        const isCompleted = formdata?.currentStep === 3;
                        return (
                            <li key={label} className="flex justify-around items-center whitespace-nowrap">
                                <div
                                    className={`flex items-center justify-center w-8 h-8 mr-2 text-xs border rounded-full font-bold ${isActive && !isCompleted
                                        ? 'bg-blue-600 text-white'
                                        : isCompleted
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 text-gray-600 '
                                        }`}
                                >
                                    {stepNumber}
                                </div>
                                <span
                                    className={`${isActive && !isCompleted ? 'text-blue-600' : isCompleted ? 'text-blue-500' : 'text-gray-500'
                                        }`}
                                >
                                    {label}
                                </span>

                                {index < formdata?.pageSteps.length - 1 && (
                                    <svg
                                        className="w-4 h-4 mx-3 text-gray-300"
                                        fill="none"
                                        viewBox="0 0 12 10"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m7 9 4-4-4-4M1 9l4-4-4-4"
                                        />
                                    </svg>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </div>
        </div>
    );
};

export default StepperCom;
