import React, { useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print';
import { Button } from '../ui/button';
import NewWindowPortal from './NewWindowPortal';

function TataCummins(props) {
  const [showPreview, setShowPreview] = useState(false);
  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({ contentRef });

  const getMonthYear = () => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    if (props.month) {
      const [year, month] = props.month.split('-');
      return { month: monthNames[parseInt(month) - 1], year };
    }
    return { month: '', year: '' };
  };

  const { month, year } = getMonthYear();

  // Calculate totals
  const calculateTotals = () => {
    if (!props.employee || props.employee.length === 0) {
      return {
        tbasic: '0.00',
        tda: '0.00',
        topayable: '0.00',
        tmrpot: '0.00',
        tgross: '0.00',
        tpf: '0.00',
        tesic: '0.00',
        tnetamt: '0.00'
      };
    }

    const totals = {
      tbasic: 0,
      tda: 0,
      topayable: 0,
      tmrpot : 0,
      tgross: 0,
      tpf: 0,
      tesic: 0,
      tnetamt: 0
    };

    props.employee.forEach(emp => {
      totals.tbasic += Number(emp.basic) || 0;
      totals.tda += Number(emp.da) || 0;
      totals.topayable += Number(emp.tpayable) || 0;
      totals.tmrpot += Number(emp.mrpotamt) || 0;
      totals.tgross += Number(emp.mrpgross) || 0;
      totals.tpf += Number(emp.pf) || 0;
      totals.tesic += Number(emp.esic) || 0;
      totals.tnetamt += Number(emp.mrpnetamt) || 0;
    });

    return {
      tbasic: totals.tbasic.toFixed(2),
      tda: totals.tda.toFixed(2),
      topayable: totals.topayable.toFixed(2),
      tmrpot: totals.tmrpot.toFixed(2),
      tgross: totals.tgross.toFixed(2),
      tpf: totals.tpf.toFixed(2),
      tesic: totals.tesic.toFixed(2),
      tnetamt: totals.tnetamt.toFixed(2)
    };
  };

  const totals = calculateTotals();

  return (
    <div>
      {showPreview && (
        <NewWindowPortal closeWindowPortal={() => setShowPreview(false)}>
          <div className="p-5 w-full h-full overflow-auto bg-white">
            {props.company && (
              <div className='w-full flex flex-col'>
              <Button onClick={reactToPrintFn} className=' w-10 mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'>
                Print
              </Button>
                <div ref={contentRef} className='p-2'>
                  {/* Header Section */}
                  <div className='mb-4'>
                    <table className='w-full text-xs font-semibold'>
                      <tbody className="border border-black">
                        <tr>
                          <td className='p-2 align-top'>
                            <div className='font-bold'>Name and address of Contractor</div>
                           
                          </td>
                          <td className='p-2 align-top'>
                             <div className='text-sm'>{props.company?.companydata?.name || ''}</div>
                            <div className='text-xs'>{props.company?.companydata?.address || ''}</div>
                          </td>
                          <td className='p-2 text-center align-top'>
                            <div className='text-lg font-bold'>FORM XVII</div>
                            <div className='text-xs'>[See Rule 78(2)(B)]</div>
                            <div className='text-xs font-bold'>Register For Wages</div>
                          </td>
                          <td className='p-2 align-top'>
                            <div className='font-bold'>Name and Address of Establishment</div>
                            
                          </td>
                          <td className='p-2 align-top'>
                            <div className='text-sm'>{props.company?.contractdata?.name ||  ''}</div>
                            <div className='text-xs'>{props.company?.contractdata?.address || ''}</div>
                          </td>
                        </tr>
                        <tr>
                          <td className='p-2 align-top'>
                            <div className='font-bold'>Nature of Work / Work Order No</div>
                            
                          </td>
                          <td className='p-2 align-top'>
                            <div className='text-sm'>{props.company?.worknaturedata?.name || ''}</div>
                           
                          </td>
                          <td className='p-2 text-center align-top'>
                            <div className='font-semibold'>
                              Month: <span className='uppercase'>{month || ''} </span> &emsp; &emsp; &emsp; Year: <span>{year || ''}</span>
                            </div>
                          </td>
                          <td className='p-2 align-top'>
                            <div className='font-bold'>Name and address of Principle Employer</div>
                           
                          </td>
                          <td className='p-2 align-top'>
                            <div className='text-sm'>{props.company?.principledata?.name || ''}</div>
                            <div className='text-xs'>{props.company?.principledata?.address || ''}</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Main Data Table */}
                  <table className='w-full border-collapse border border-gray-400 text-[10px]'>
                    <thead>
                      <tr className='bg-gray-200 text-center'>
                        <th rowSpan={2} className='border border-gray-400 p-1 text-wrap w-10'>Sl. No.</th>
                        <th rowSpan={2} className='border border-gray-400 p-1 w-40'>Name of Workman</th>
                        <th rowSpan={2} className='border border-gray-400 p-1 text-wrap w-10'>Serial No. of Reg. of Workman</th>
                        <th rowSpan={2} className='border border-gray-400 p-1 text-wrap w-10'>Designation / Nature of Work Done</th>
                        <th rowSpan={2} className='border border-gray-400 p-1  text-wrap w-10'>No. of Days Worked</th>
                        <th rowSpan={2} className='border border-gray-400 p-1 text-wrap w-10'>Daily Rate / Piece Rate</th>
                        <th colSpan={4} className='border border-gray-400 p-1'>AMOUNT OF WAGES</th>
                        <th rowSpan={2} className='border border-gray-400 p-1 text-wrap w-10'>Total</th>
                        <th colSpan={3} className='border border-gray-400 p-1'>Deduction if any (indicate nature)</th>
                        <th rowSpan={2} className='border border-gray-400 p-1 text-wrap w-10'>Net Amount Paid</th>
                        <th rowSpan={2} className='border border-gray-400 p-1  text-wrap w-10'>Sig/Thumb Impression Work Man</th>
                        <th rowSpan={2} className='border border-gray-400 p-1 text-wrap w-10'>Initial Of Cont. or his Repres</th>
                        <th rowSpan={2} className='border border-gray-400 p-1 text-wrap w-10'>Signature Of Cont. or his Repres</th>
                      </tr>
                      <tr className='bg-gray-200 text-center'>
                        <th className='border border-gray-400 p-1  text-wrap w-10'>Basic Wages</th>
                        <th className='border border-gray-400 p-1 text-wrap w-10'>DA</th>
                        <th className='border border-gray-400 p-1 text-wrap w-10'>Other Pay</th>
                        <th className='border border-gray-400 p-1  text-wrap w-10'>EAR Other Cash Pay</th>
                        <th className='border border-gray-400 p-1 text-wrap w-10'>PF</th>
                        <th className='border border-gray-400 p-1 text-wrap w-10'>ESI</th>
                        <th className='border border-gray-400 p-1 text-wrap w-10'>Other</th>
                      </tr>
                      <tr className='bg-gray-100 text-xs text-center'>
                        {[...Array(18)].map((_, i) => (
                          <th key={i} className='border border-gray-400 p-1'>{i + 1}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {props.employee && props.employee.length > 0 ? (
                        props.employee.map((emp, index) => (
                          <tr key={index} className='hover:bg-gray-50'>
                            <td className='border border-gray-400 p-1 text-center'>{index + 1}</td>
                            <td className='border border-gray-400 p-1 text-center'>{emp.employeeData_Name || emp.Name || ''}</td>
                            <td className='border border-gray-400 p-1 font-semibold '>{emp.employeeData_id || emp.EmpId || ''}</td>
                            <td className='border border-gray-400 p-1 text-center'>{emp.employeeData_DesignationDetails_name || emp.Designation || ''}</td>
                            <td className='border border-gray-400 p-1 text-center'>
                              <div className='text-[9px]'>P: {emp.tpresent || '0'}</div>
                              <div className='text-[9px]'>{emp.tnhday? `NH : ${emp.tnhday}`: ''}</div>
                              <div className='text-[9px]'>{ emp.tel? `EL: ${emp.tel }`: ''}</div>
                              <div className='text-[9px]'>{ emp.tcl? `CL: ${emp.tcl || '0'}`: ''}</div>
                              <div className='text-[9px]'>{ emp.tfl? `FL: ${emp.tfl || '0'}`: ''}</div>
                              <div className='border-t border-gray-400 text-[9px] font-bold'>{emp.tpayable || '0.00'}</div>
                            </td>
                            <td className='border border-gray-400 p-1'>
                              <div className='text-right'>{emp.basicrate || '0.00'}</div>
                              <div className='text-right'>{emp.darate || '0.00'}</div>
                              <div className='border-t border-gray-400 text-right font-bold'>{emp.bdarate || '0.00'}</div>
                            </td>
                            <td className='border border-gray-400 p-1 text-right'>{emp.basic || '0.00'}</td>
                            <td className='border border-gray-400 p-1 text-right'>{emp.da || '0.00'}</td>
                            <td className='border border-gray-400 p-1 text-right'>{emp.mrpotamt ||'0.00'}</td>
                            <td className='border border-gray-400 p-1 text-right'>{emp.nhamount ||  '0.00'}</td>
   
                            <td className='border border-gray-400 p-1 text-right font-bold'>{emp.mrpgross || '0.00'}</td>

                            <td className='border border-gray-400 p-1 text-right'>{emp.pf || '0.00'}</td>
                            <td className='border border-gray-400 p-1 text-right'>{emp.esic || '0.00'}</td>
                            <td className='border border-gray-400 p-1 text-right'>{emp.prftax || '0.00'}</td>
                            <td className='border border-gray-400 p-1 text-right font-bold'>{emp.mrpnetamt || '0.00'}</td>
                            <td className='border border-gray-400 p-1 text-center'></td>
                            <td className='border border-gray-400 p-1 text-center'></td>
                            <td className='border border-gray-400 p-1 text-center'></td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan='19' className='border border-gray-400 p-2 text-center'>No employees selected</td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  {/* Totals Section */}
                  <div className='my-3'>
                    <table className='w-full text-xs font-semibold'>
                      <tbody className='border border-gray-300'>
                        <tr >
                          <td className='p-2'>Basic: <span className='font-bold'>{totals.tbasic}</span></td>
                          <td className='p-2'>DA: <span className='font-bold'>{totals.tda}</span></td>
                          <td className='p-2'>Total Attn: <span className='font-bold'>{totals.topayable}</span></td>
                          <td className='p-2'>Gross Payment: <span className='font-bold'>{totals.tgross}</span></td>
                          <td className='p-2'>PF Amt: <span className='font-bold'>{totals.tpf}</span></td>
                          <td className='p-2'>ESIC Amt: <span className='font-bold'>{totals.tesic}</span></td>
                          <td className='p-2'>Net Payment: <span className='font-bold'>{totals.tnetamt}</span></td>
                        </tr>
                          <tr>
                          <td className='p-2'></td>
                          <td className='p-2'></td>
                          <td className='p-2'></td>
                          <td className='p-2'>Total Other Payment: <span className='font-bold'>{totals.tmrpot}</span></td>
                          <td className='p-2'></td>
                          <td className='p-2'></td>
                          <td className='p-2'></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Footer Section */}
                  {/* <div className='mt-6 text-xs'>
                    <div className='flex justify-between'>
                      <div className='text-center'>
                        <div className='mb-8'>___________________</div>
                        <div>Signature of Contractor</div>
                      </div>
                      <div className='text-center'>
                        <div className='mb-8'>___________________</div>
                        <div>Signature of Employer</div>
                      </div>
                      <div className='text-center'>
                        <div className='mb-8'>___________________</div>
                        <div>Date</div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            )}
          </div>
        </NewWindowPortal>
      )}
      <Button
        onClick={() => {
          setShowPreview(true);
         
        }}
        className="bg-black text-white hover:bg-slate-200 hover:text-black"
        disabled={props?.wait}
      >
        {props?.wait ? "wait ..." : "TATA CUMMINS"}
      </Button>
    </div>
  )
}

export default TataCummins
