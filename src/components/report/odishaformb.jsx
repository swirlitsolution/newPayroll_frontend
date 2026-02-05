import React, { useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print';
import { Button } from '../ui/button';
import NewWindowPortal from './NewWindowPortal';
import MinimumRate from './MinimumRate';

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


function OdishaFormB(props) {
  const [showPreview, setShowPreview] = useState(false);
  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({ contentRef });

  const calculatePPF = (emp) => {
    const value = Math.round(Number(emp.pf)) - Math.round(Number(emp.epfaplamt) * 0.0833);
    return isNaN(value) ? '0.00' : Math.round(value);
  }


  return (
    <div>
      {showPreview && (
        <NewWindowPortal closeWindowPortal={() => setShowPreview(false)}>
          <div className="p-5 w-full h-full overflow-auto bg-white">
            {props.company && (
              <div className='w-full flex flex-col'>
                <div ref={contentRef} className='p-2'>
                
                 <MinimumRate site={props?.site} />
                  {/* Establishment Details */}
                  <div className='flex flex-col gap-y-1 text-xs font-semibold mb-2'>
                    <div className='flex justify-between items-center'>
                        <div className='flex gap-2'>
                          <span>Name of Establishment</span>
                          <span className='uppercase'>{props.company?.name || 'GLOBAL AC SYSTEM JSR PVT LT'}</span>
                        </div>
                        <div className='flex gap-2'>
                          <span>Name of Owner</span>
                          <span className='uppercase'>{props.company?.principleEmployer || 'VOLTAS LIMITED'}</span>
                        </div>
                        <div className='flex gap-2'>
                          <span>LIN</span>
                          <span>1-9143-2709-7</span>
                        </div>
                    </div>
                    <div className='relative flex items-center justify-center w-full'>
                        <div className='absolute left-0 flex gap-4'>
                            <div className='flex gap-2'>
                              <span>Wages From</span>
                              <span>01-{props.month?.split("-")[1]}-{props.month?.split("-")[0]}</span>
                            </div>
                            <div className='flex gap-2'>
                              <span>To Date</span>
                              <span>31-{props.month?.split("-")[1]}-{props.month?.split("-")[0]}</span>
                            </div>
                        </div>
                        <span>Monthly</span>
                    </div>
                  </div>
                 
                  {/* Main Data Table */}
                  <table className='w-full border-collapse border border-black text-[10px]'>
                    <thead>
                      <tr className='bg-gray-100'>
                        <th rowSpan={2} className='border border-black p-1'>SL.No.In<br />Employee<br />Reg</th>
                        <th rowSpan={2} className='border border-black p-1 min-w-[150px]'>Name</th>
                        <th rowSpan={2} className='border border-black p-1'>Rate Of<br />Wages</th>
                        <th rowSpan={2} className='border border-black p-1'>No. of<br />Days<br />Worked</th>
                        <th rowSpan={2} className='border border-black p-1'>Over Time<br />Hours<br />Worked</th>

                        <th rowSpan={2} className='border border-black p-1'>Basic</th>
                        <th rowSpan={2} className='border border-black p-1'>Spl<br />Basic</th>
                        <th rowSpan={2} className='border border-black p-1'>DA</th>
                        <th rowSpan={2} className='border border-black p-1'>Payment<br />Over<br />Time</th>
                        <th rowSpan={2} className='border border-black p-1'>HRA</th>
                        <th rowSpan={2} className='border border-black p-1'>Others</th>
                        <th rowSpan={2} className='border border-black p-1'>Total</th>

                        <th colSpan={7} className='border border-black p-1'>DEDUCTION</th>

                        <th rowSpan={2} className='border border-black p-1'>Total</th>
                        <th rowSpan={2} className='border border-black p-1'>Net<br />Payment</th>
                        <th rowSpan={2} className='border border-black p-1'>Employers<br />Share</th>
                        <th rowSpan={2} className='border border-black p-1'>Receipt by<br />Employee bank<br />Transaction ID</th>
                        <th rowSpan={2} className='border border-black p-1'>Date<br />Of<br />Payment</th>
                        <th rowSpan={2} className='border border-black p-1'>Remarks</th>
                      </tr>
                      <tr className='bg-gray-100'>
                        <th className='border border-black p-1'>PF</th>
                        <th className='border border-black p-1'>ESIC</th>
                        <th className='border border-black p-1'>Society</th>
                        <th className='border border-black p-1'>Inco. Tax</th>
                        <th className='border border-black p-1'>Insurance</th>
                        <th className='border border-black p-1'>Others</th>
                        <th className='border border-black p-1'>Recoveries</th>
                      </tr>
                      {/* Column Numbering Row */}
                      <tr>
                        {[...Array(25)].map((_, i) => (
                          <th key={i} className='border border-black p-1'>{i + 1}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {props.employee && props.employee.length > 0 ? (
                        props.employee.map((emp, index) => (
                          <tr key={index}>
                            <td className='border border-black p-1 text-center'>{index + 1}</td>
                            <td className='border border-black p-1 font-semibold'>
                              {emp.employeeData_Name} <br />
                              {/* <span className='font-normal text-[8px]'>{emp.employeeData_DesignationDetails_name || ''}</span> */}
                            </td>
                            <td className='border border-black p-1 text-right'>{emp.employeeData_rate_basic || '0.00'}</td>
                            <td className='border border-black p-1 text-center'>{emp.tpayable || '0.00'}</td>
                            <td className='border border-black p-1 text-center'>{emp.tiscoothr || ''}</td>

                            <td className='border border-black p-1 text-right'>{emp.basic || '0.00'}</td>
                            <td className='border border-black p-1 text-right'>0.00</td>
                            <td className='border border-black p-1 text-right'>{emp.da || '0.00'}</td>
                            <td className='border border-black p-1 text-right'>{emp.mrpotamt || '0.00'}</td>
                            <td className='border border-black p-1 text-right'></td>
                            <td className='border border-black p-1 text-right'></td>
                            <td className='border border-black p-1 text-right font-bold'>{emp.mrpgross || '0.00'}</td>

                            <td className='border border-black p-1 text-right'>{emp.pf || '0.00'}</td>
                            <td className='border border-black p-1 text-right'>{emp.esic || '0.00'}</td>
                            <td className='border border-black p-1 text-right'></td>
                            <td className='border border-black p-1 text-right'></td>
                            <td className='border border-black p-1 text-right'></td>
                            <td className='border border-black p-1 text-right'></td>
                            <td className='border border-black p-1 text-right'></td>
                            <td className='border border-black p-1 text-right font-bold'>{emp.deduction || '0.00'}</td>

                            <td className='border border-black p-1 text-right font-bold'>{emp.mrpnetamt || '0.00'}</td>
                            <td className='border border-black p-1 text-right'>{calculatePPF(emp)}</td>
                            <td className='border border-black p-1 text-center'></td>
                            <td className='border border-black p-1 text-center'></td>
                            <td className='border border-black p-1 text-center'></td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan='25' className='border border-black p-2 text-center'>No employees selected</td>
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
        className='bg-black text-white hover:bg-gray-800'
        disabled={props?.wait}
      >
        {props?.wait ? "wait ..." : "Odisha Form B"}
      </Button>
    </div>
  )
}

export default OdishaFormB