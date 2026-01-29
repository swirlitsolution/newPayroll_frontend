import React, { useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print';
import { Button } from '../ui/button';
import NewWindowPortal from './NewWindowPortal';

function OdishaWorkmanRegister(props) {
    const [showPreview, setShowPreview] = useState(false);
    const contentRef = useRef();
    const reactToPrintFn = useReactToPrint({ contentRef });
    console.log(props)
    return (
        <div>
            {showPreview && (
                <NewWindowPortal closeWindowPortal={() => setShowPreview(false)}>
                    <div className="p-5 w-full h-full overflow-auto bg-white">
                        {props.company && (
                            <div className='w-full flex flex-col'>
                                <div ref={contentRef} className='p-2'>

                                    {/* Header Section */}
                                    <div className='flex flex-col items-center mb-4'>
                                        <h1 className='font-bold text-sm'>FORM IX</h1>
                                        <h2 className='font-bold text-xs'>(See rule 74)</h2>
                                        <h2 className='font-bold text-sm mt-1'>Register of workmen employed by Contractor</h2>
                                    </div>

                                    {/* Establishment Details */}
                                    <div className='grid grid-cols-2 gap-x-8 gap-y-2 text-[10px] font-bold mb-4'>
                                        <div className='flex gap-2'>
                                            <span className='min-w-[150px]'>Name and address of contractor :</span>
                                            <span className='uppercase'>{props.company?.name || 'GLOBAL AC SYSTEM JSR PVT LTD'}</span>
                                        </div>
                                        <div className='flex gap-2'>
                                            {/* Empty or Right side content if needed, layout seems two columns or just listed */}
                                        </div>

                                        <div className='flex gap-2'>
                                            <span className='min-w-[150px]'>Nature and location of work :</span>
                                            <span className='uppercase'>HVAC PROJECT</span>
                                        </div>
                                        <div className='flex gap-2'>
                                        </div>

                                        <div className='flex gap-2'>
                                            <span className='min-w-[150px]'>Name and address of establishment in/ under which contract is carried on :</span>
                                            <span className='uppercase'>{props.company?.name || 'GLOBAL AC SYSTEM JSR PVT LTD'}</span>
                                        </div>
                                        <div className='flex gap-2'>
                                        </div>

                                        <div className='flex gap-2'>
                                            <span className='min-w-[150px]'>Name and address of principal employer :</span>
                                            <span className='uppercase'>{props.company?.principleEmployer || 'NEELACHAL ISPAT'}</span>
                                        </div>
                                        <div className='flex gap-2'>
                                        </div>
                                    </div>

                                    {/* Main Data Table */}
                                    <table className='w-full border-collapse border border-black text-[9px]'>
                                        <thead>
                                            <tr className='bg-gray-100'>
                                                <th className='border border-black p-1'>SL. No.</th>
                                                <th className='border border-black p-1'>Name & Surname of Workman</th>
                                                <th className='border border-black p-1'>Age and sex</th>
                                                <th className='border border-black p-1'>Father's/Husband's name</th>
                                                <th className='border border-black p-1'>Nature of Employment Designation</th>
                                                <th className='border border-black p-1'>Permanent Home Address of Workman (village and Tehsil/Taluka and District)</th>
                                                <th className='border border-black p-1'>Local Address</th>
                                                <th className='border border-black p-1'>Date of commencement of</th>
                                                <th className='border border-black p-1'>Signature Or thumb Impression of</th>
                                                <th className='border border-black p-1'>Date of termination of</th>
                                                <th className='border border-black p-1'>Reasons for termination</th>
                                                <th className='border border-black p-1'>Remarks</th>
                                            </tr>

                                            {/* Column Numbering Row */}
                                            <tr>
                                                <th className='border border-black p-1'>01</th>
                                                <th className='border border-black p-1'>02</th>
                                                <th className='border border-black p-1'>03</th>
                                                <th className='border border-black p-1'>04</th>
                                                <th className='border border-black p-1'>05</th>
                                                <th className='border border-black p-1'>06</th>
                                                <th className='border border-black p-1'>07</th>
                                                <th className='border border-black p-1'>08</th>
                                                <th className='border border-black p-1'>09</th>
                                                <th className='border border-black p-1'>10</th>
                                                <th className='border border-black p-1'>11</th>
                                                <th className='border border-black p-1'>12</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {props.employee && props.employee.length > 0 ? (
                                                props.employee.map((emp, index) => (
                                                    <tr key={index}>
                                                        <td className='border border-black p-1 text-center'>{index + 1}</td>
                                                        <td className='border border-black p-1 uppercase'>{emp.Name}</td>
                                                        <td className='border border-black p-1 text-center uppercase'>{emp.Age || ''} / {emp.Gender || 'Male'}</td>
                                                        <td className='border border-black p-1 uppercase'>{emp.FatherName || ''}</td>
                                                        <td className='border border-black p-1 text-center uppercase'>{emp.DesignationDetails?.name || emp.Designation || ''}</td>
                                                        <td className='border border-black p-1 uppercase'>{emp.PermanentAddress || ''}</td>
                                                        <td className='border border-black p-1 uppercase'>{emp.LocalAddress || emp.PresentAddress || ''}</td>
                                                        <td className='border border-black p-1 text-center'>{emp.Doj || ''}</td>
                                                        <td className='border border-black p-1'></td>
                                                        <td className='border border-black p-1 text-center'>{emp.Dol || ''}</td>
                                                        <td className='border border-black p-1 text-center'>{emp.ReasonOfLeaving || ''}</td>
                                                        <td className='border border-black p-1'></td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan='12' className='border border-black p-2 text-center'>No employees selected</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div className='flex justify-between items-end mt-12'>
                                    <div></div>
                                    <div className='flex flex-col items-center gap-2'>
                                        <div className='w-32 h-24 flex items-center justify-center'>
                                            <img
                                                src="https://backend.stcassociates.co.in/static/img/stamp.png"
                                                alt="Stamp"
                                                className='w-28 h-20 object-contain'
                                            />
                                        </div>
                                        <p className='text-xs text-center font-semibold'>Stamp & Signature of the Contractor</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </NewWindowPortal>
            )}
            <Button
                onClick={() => setShowPreview(true)}
                className='w-full bg-gray-200 outline-4 text-black hover:bg-black hover:text-white'
                disabled={props?.wait}
            >
                {props?.wait ? "wait ..." : "Odisha Workman Register"}
            </Button>
        </div>
    )
}

export default OdishaWorkmanRegister
