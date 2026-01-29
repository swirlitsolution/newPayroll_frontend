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

function OdishaFormB(props) {
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
                  {/* Top Table: Rate of Minimum Wages */}
                  <div className='flex justify-center mb-4'>
                    <table className='border-collapse border border-black text-xs'>
                      <thead>
                        <tr>
                          <th colSpan={5} className='border border-black p-1 text-center font-bold'>Rate of Minimum Wages and Since the Date</th>
                        </tr>
                        <tr>
                          <th className='border border-black p-1'></th>
                          <th className='border border-black p-1 font-semibold'>Highly Skilled</th>
                          <th className='border border-black p-1 font-semibold'>Skilled</th>
                          <th className='border border-black p-1 font-semibold'>Semi-Skilled</th>
                          <th className='border border-black p-1 font-semibold'>Un-Skilled</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className='border border-black p-1 font-semibold'>Minimum Basic</td>
                          <td className='border border-black p-1 text-center'>981.00</td>
                          <td className='border border-black p-1 text-center'>893.00</td>
                          <td className='border border-black p-1 text-center'>760.00</td>
                          <td className='border border-black p-1 text-center'>674.00</td>
                        </tr>
                        <tr>
                          <td className='border border-black p-1 font-semibold'>DA</td>
                          <td className='border border-black p-1 text-center'></td>
                          <td className='border border-black p-1 text-center'></td>
                          <td className='border border-black p-1 text-center'></td>
                          <td className='border border-black p-1 text-center'></td>
                        </tr>
                        <tr>
                          <td className='border border-black p-1 font-semibold'>Over Time</td>
                          <td className='border border-black p-1 text-center'>0.00</td>
                          <td className='border border-black p-1 text-center'>0.00</td>
                          <td className='border border-black p-1 text-center'>0.00</td>
                          <td className='border border-black p-1 text-center'>0.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Establishment Details */}
                  <div className='flex flex-wrap gap-x-8 gap-y-2 text-xs font-semibold mb-2 items-center'>
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
                    <div className='flex gap-2 ml-auto'>
                      <span>Wages From</span>
                      <span>01-{props.month?.split("-")[1]}-{props.month?.split("-")[0]}</span>
                      <span>To Date</span>
                      <span>31-{props.month?.split("-")[1]}-{props.month?.split("-")[0]}</span>
                    </div>
                    <div className='w-full text-center'>
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
                              {emp.Name} <br />
                              <span className='font-normal text-[8px]'>{emp.DesignationDetails?.name || ''}</span>
                            </td>
                            <td className='border border-black p-1 text-right'>{emp.rateOfWages || '0.00'}</td>
                            <td className='border border-black p-1 text-center'>{emp.daysWorked || '0.00'}</td>
                            <td className='border border-black p-1 text-center'>{emp.otHours || ''}</td>

                            <td className='border border-black p-1 text-right'>{emp.basic || '0.00'}</td>
                            <td className='border border-black p-1 text-right'>0.00</td>
                            <td className='border border-black p-1 text-right'>0.00</td>
                            <td className='border border-black p-1 text-right'></td>
                            <td className='border border-black p-1 text-right'></td>
                            <td className='border border-black p-1 text-right'></td>
                            <td className='border border-black p-1 text-right font-bold'>{emp.totalEarnings || '0.00'}</td>

                            <td className='border border-black p-1 text-right'>{emp.pf || '0.00'}</td>
                            <td className='border border-black p-1 text-right'>{emp.esic || '0.00'}</td>
                            <td className='border border-black p-1 text-right'></td>
                            <td className='border border-black p-1 text-right'></td>
                            <td className='border border-black p-1 text-right'></td>
                            <td className='border border-black p-1 text-right'></td>
                            <td className='border border-black p-1 text-right'></td>
                            <td className='border border-black p-1 text-right font-bold'>{emp.totalDeductions || '0.00'}</td>

                            <td className='border border-black p-1 text-right font-bold'>{emp.netPayment || '0.00'}</td>
                            <td className='border border-black p-1 text-right'>{emp.employerShare || '0.00'}</td>
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
        className='w-full bg-gray-200 outline-4 text-black hover:bg-black hover:text-white'
        disabled={props?.wait}
      >
        {props?.wait ? "wait ..." : "Odisha Form B"}
      </Button>
    </div>
  )
}

export default OdishaFormB