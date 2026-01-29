import React, { useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print';
import { Button } from '../ui/button';
import NewWindowPortal from './NewWindowPortal';

const monthdata = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sept",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec",
}

function OdishaFormD(props) {
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

                                    <div className='flex flex-col items-center mb-4'>
                                        <h1 className='font-bold text-sm'>FORM D</h1>
                                        <h2 className='font-bold text-xs'>Format of Attendance Register</h2>
                                    </div>

                                    {/* Establishment Details */}
                                    <div className='flex flex-wrap gap-x-8 gap-y-2 text-xs font-semibold mb-2 items-center'>
                                        <div className='flex gap-2'>
                                            <span>Name of Establishment</span>
                                            <span className='uppercase'>{props.company?.name || 'GLOBAL AC SYSTEM JSR PVT LT'}</span>
                                        </div>
                                        <div className='flex gap-2 ml-auto'>
                                            <span>Wages From</span>
                                            <span>01-{props.month?.split("-")[1]}-{props.month?.split("-")[0]}</span>
                                            <span>To Date</span>
                                            <span>31-{props.month?.split("-")[1]}-{props.month?.split("-")[0]}</span>
                                        </div>
                                        <div className='flex gap-2'>
                                            <span>Name of Owner</span>
                                            <span className='uppercase'>{props.company?.principleEmployer || 'VOLTAS LIMITED'}</span>
                                        </div>
                                        <div className='flex gap-2 ml-auto'>
                                            <span>LIN</span>
                                            <span>1-9143-2709-7</span>
                                        </div>
                                    </div>

                                    {/* Main Data Table */}
                                    <table className='w-full border-collapse border border-black text-[9px]'>
                                        <thead>
                                            <tr className='bg-gray-100'>
                                                <th rowSpan={2} className='border border-black p-1'>Serial No.<br />in Emp<br />Register</th>
                                                <th rowSpan={2} className='border border-black p-1 min-w-[150px]'>Name</th>
                                                <th rowSpan={2} className='border border-black p-1'>Relay #<br />Or Set<br />Work</th>
                                                <th rowSpan={2} className='border border-black p-1'>Place<br />Of<br />Work</th>

                                                {/* Days 1-31 */}
                                                {[...Array(31)].map((_, i) => (
                                                    <th key={i} className='border border-black p-0 w-4 font-normal'>{i + 1}</th>
                                                ))}

                                                <th rowSpan={2} className='border border-black p-1'>Summary<br />No of<br />Days</th>
                                                <th rowSpan={2} className='border border-black p-1'>Remarks<br />No of<br />Hours</th>
                                                <th rowSpan={2} className='border border-black p-1'>Sign.<br />Reg<br />Keeper</th>
                                            </tr>
                                            <tr className='bg-gray-100'>
                                                {/* Sub-headers for status/in-out if needed, otherwise empty row or merged */}
                                                {[...Array(31)].map((_, i) => (
                                                    <th key={i} className='border border-black p-0 w-4 h-4'></th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {props.employee && props.employee.length > 0 ? (
                                                props.employee.map((emp, index) => (
                                                    <tr key={index}>
                                                        <td className='border border-black p-1 text-center'>{index + 1}</td>
                                                        <td className='border border-black p-1 font-semibold'>
                                                            {emp.Name}
                                                        </td>
                                                        <td className='border border-black p-1 text-center'></td>
                                                        <td className='border border-black p-1 text-center'></td>

                                                        {/* Daily Cells */}
                                                        {[...Array(31)].map((_, i) => (
                                                            <td key={i} className='border border-black p-0 text-center text-[8px]'>
                                                                {/* Logic to place 'P' could go here if daily data existed */}
                                                            </td>
                                                        ))}

                                                        <td className='border border-black p-1 text-center font-bold'>{emp.daysWorked || ''}</td>
                                                        <td className='border border-black p-1 text-center'></td>
                                                        <td className='border border-black p-1 text-center'></td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={38} className='border border-black p-2 text-center'>No employees selected</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
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
                {props?.wait ? "wait ..." : "Odisha Form D"}
            </Button>
        </div>
    )
}

export default OdishaFormD
