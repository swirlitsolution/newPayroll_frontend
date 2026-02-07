import React, { useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print';
import { Button } from '../ui/button';
import NewWindowPortal from './NewWindowPortal';

function EmployeeCardJoda(props) {
   
    const contentRef = useRef();
    const reactToPrintFn = useReactToPrint({ contentRef });

    return (
        <div>
            <button onClick={reactToPrintFn} className='mb-4 float-end px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'>
                Print
            </button>
            <div className="p-5 w-full h-full overflow-auto bg-white">

                <div className='w-full flex flex-col'>
                    <div ref={contentRef} className='p-4'>
                        {props.employee?.length > 0 ? (
                            props.employee.map((emp, index) => (
                                <div key={index} className='mb-8 border-2 border-black break-inside-avoid page-break-after-always'>

                                    {/* Header */}
                                    <div className='text-center border-b-2 border-black p-1'>
                                        <h1 className='font-bold text-sm uppercase'>FOR XIV</h1>
                                        <h2 className='font-bold text-xs'>[ See Rule 75 ]</h2>
                                        <h2 className='font-bold text-sm'>Employment Card</h2>
                                    </div>

                                    {/* Content Table */}
                                    <div className='w-full text-xs font-semibold'>

                                        {/* Contractor Name */}
                                        <div className='flex border-b border-black'>
                                            <div className='w-1/2 p-2 border-r border-black'>
                                                Name & Address of Contractor :
                                            </div>
                                            <div className='w-1/2 p-2 uppercase'>
                                                {props.company?.name}<br />
                                                {props.company?.address}
                                            </div>
                                        </div>

                                        {/* Establishment Name */}
                                        <div className='flex border-b border-black'>
                                            <div className='w-1/2 p-2 border-r border-black'>
                                                Name & Address of the Establishment in under which contract is carried on
                                            </div>
                                            <div className='w-1/2 p-2 uppercase'>
                                                {props.company?.principleEmployer || 'TSL-Hospital & Township RMP-Joda'}
                                            </div>
                                        </div>

                                        {/* Nature of Work */}
                                        <div className='flex border-b border-black'>
                                            <div className='w-1/2 p-2 border-r border-black'>
                                                Nature of Work & Location of Work
                                            </div>
                                            <div className='w-1/2 p-2 uppercase'>
                                                HVAC PROJECT
                                            </div>
                                        </div>

                                        {/* 1. Name */}
                                        <div className='flex border-b border-black'>
                                            <div className='w-1/2 p-2 border-r border-black'>
                                                1. Name of the Work Man
                                            </div>
                                            <div className='w-1/2 p-2 uppercase'>
                                                {emp.Name}
                                            </div>
                                        </div>

                                        {/* 2. Sl No */}
                                        <div className='flex border-b border-black'>
                                            <div className='w-1/2 p-2 border-r border-black'>
                                                2. Sl. No. of Register of Work Man Employed
                                            </div>
                                            <div className='w-1/2 p-2 uppercase'>
                                                {index + 1}
                                            </div>
                                        </div>

                                        {/* 3. Designation */}
                                        <div className='flex border-b border-black'>
                                            <div className='w-1/2 p-2 border-r border-black'>
                                                3. Nature of Employment / Designation
                                            </div>
                                            <div className='w-1/2 p-2 uppercase'>
                                                {emp.DesignationDetails?.name || emp.Designation}
                                            </div>
                                        </div>

                                        {/* 4. Wages */}
                                        <div className='flex border-b border-black'>
                                            <div className='w-1/2 p-2 border-r border-black'>
                                                4. Wages Rate (With Particular of Unit in case of Piece Work)
                                            </div>
                                            <div className='w-1/2 p-2 uppercase'>
                                                {(
                                                    parseFloat(emp?.rate_basic ?? emp?.rate?.basic ?? emp?.basicrate ?? 0) +
                                                    parseFloat(emp?.rate_da ?? emp?.rate?.da ?? emp?.darate ?? 0)
                                                ).toFixed(2)}
                                            </div>
                                        </div>

                                        {/* 5. Wages Period */}
                                        <div className='flex border-b border-black'>
                                            <div className='w-1/2 p-2 border-r border-black'>
                                                5. Wages Period
                                            </div>
                                            <div className='w-1/2 p-2 uppercase'>
                                                Monthly
                                            </div>
                                        </div>

                                        {/* 6. Tenure */}
                                        <div className='flex border-b border-black'>
                                            <div className='w-1/2 p-2 border-r border-black'>
                                                6. Tanure Employment
                                            </div>
                                            <div className='w-1/2 p-2 uppercase'>
                                                {emp.Doj || ''}
                                            </div>
                                        </div>

                                        {/* 7. Remarks */}
                                        <div className='flex border-black border-b'>
                                            <div className='w-1/2 p-2 border-r border-black'>
                                                7. Remarks
                                            </div>
                                            <div className='w-1/2 p-2 uppercase'>
                                                {emp.Remarks || ''}
                                            </div>
                                        </div>

                                    </div>

                                    {/* Footer Signature */}
                                    <div className='flex justify-end p-4 mt-8'>
                                        <div className='flex flex-col items-center gap-2'>
                                            {/* Stamp Image */}
                                            <div className='w-32 h-24 flex items-center justify-center'>
                                                <img
                                                    src="https://backend.stcassociates.co.in/static/img/stamp.png"
                                                    alt="Stamp"
                                                    className='w-28 h-20 object-contain'
                                                />
                                            </div>
                                            <span className='font-bold text-xs'>Signature of the Employer/Principal Employer

Authorized signatory</span>
                                        </div>
                                    </div>

                                </div>
                            ))
                        ) : (
                            <div className="text-center font-bold text-xl mt-10">No Employees Selected</div>
                        )}
                    </div>
                </div>
            </div>
          
        </div>
    )
}

export default EmployeeCardJoda
