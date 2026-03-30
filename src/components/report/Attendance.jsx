import React, { useEffect, useState, useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import NewWindowPortal from './NewWindowPortal';
import { setCompany } from '../../Redux/Slices/CompanySlice';
import { useCompanyQuery } from '../../hooks/useCompanyQuery';
import { useDispatch, useSelector } from 'react-redux';
function Attendance({ attendanceData, month, year }) {
    const [showPreview, setShowPreview] = useState(false);
    const contentRef = useRef();
    const reactToPrintFn = useReactToPrint({ contentRef });
    const attendance = attendanceData || [];
    const dispatch = useDispatch();
    const { company } = useSelector(state => state.Company);
    const { companyData, isLoading } = useCompanyQuery(); // get current selected company data
       const [payroll, setPayroll] = useState({
         basic: 0,
         da: 0,
         mrpgross: 0,
         esic: 0,
         pf: 0,
         mrpnetamt: 0,
       })
    const calPayroll = () => {
        const tpayable = attendance.reduce((sum, emp) => sum + parseFloat(emp.tpayable || 0), 0);
      
        
        const totalBasic = attendance.reduce((sum, emp) => sum + parseFloat(emp.basic || 0), 0);
        const totalDa = attendance.reduce((sum, emp) => sum + parseFloat(emp.da || 0), 0);
       
        const mrpgross = attendance.reduce((sum, emp) => sum + parseFloat(emp.mrpgross || 0), 0);
        const totalEsicAmt = attendance.reduce((sum, emp) => sum + parseFloat(emp.esic || 0), 0);
        const totalPfAmt = attendance.reduce((sum, emp) => sum + parseFloat(emp.pf || 0), 0);
       
        const netPayment = attendance.reduce((sum, emp) => sum + parseFloat(emp.mrpnetamt || 0), 0);
        
    setPayroll({
      basic: totalBasic,
      da: totalDa,
      
      tpayable: tpayable,
      mrpgross: mrpgross,
      esic: totalEsicAmt,
      pf: totalPfAmt,
      mrpnetamt: netPayment,
    })

  }
    useEffect(() => {
    calPayroll();
    dispatch(setCompany(companyData));

    }, [companyData])
    // check if attendance data is not available than return No data available else render the table
    if (attendance.length === 0) {
    return <div>No data available</div>;
    }
    if (isLoading) return <p>Loading ....</p>
  return(
    <div className='w-full'>
        <button 
            onClick={() => setShowPreview(true)}
            className="bg-black hover:bg-slate-300 hover:text-black text-white p-3 rounded"
        >
            Attendance
        </button>
        {showPreview && (
            <NewWindowPortal closeWindowPortal={() => setShowPreview(false)}>
                
        {
            company && (
                <div className='w-full flex flex-col'>
                    <button className=' mr-5 bg-black p-2 self-end w-24 text-white' onClick={() => reactToPrintFn()}>Print</button>
                    <div ref={contentRef} className='bg-white p-2'>
                        {/* Header Section */}
                        <div className="w-full grid grid-cols-5 gap-2 text-sm border border-black p-2">
                            <span className="font-bold">Name and address of Contractor</span>
                            <span>{company.companydata.name || ''}<br></br>{company.companydata.address || ''}</span>
                            <span className=' text-center font-bold'>FORM XVII <br></br>[See Rule 78(2)(B)]<br></br> Register For Wages</span>
                            <span className="font-bold">Name and Address of Establishment<br></br> In/Under which contract is carried on</span>
                            <span>{company.companydata.contractestablishment?.name || company.companydata.name || ''}</span>
                            <span className="font-bold">Nature of Work / Work Order No</span>
                            <span>{company?.worknature?.name || ''}</span>
                            <span className=' text-center font-bold'>Month: <span className='uppercase'>{month || ''}</span> Year: <span>{year || ''}</span></span>
                            <span className="font-bold">Name and address of Principle Employer</span>
                            <span>{company?.principleEmployer?.name || company?.principledata?.name || ''}</span>
                        </div>
                        <div className='mb-4'>
                         

                            {/* Table Header */}
                            <table style={{width: '100%', marginTop: '10px'}} className='border-collapse'>
                                <thead>
                                    <tr style={{whiteSpace: 'nowrap'}}>
                                        <th style={{border: '2px solid gray', padding: '2px'}}>Sl</th>
                                        <th style={{border: '2px solid gray', padding: '2px', width: '40px'}}>EmpId</th>
                                        <th style={{border: '2px solid gray', padding: '2px', width: '100px'}}>Employee</th>
                                        <th style={{border: '2px solid gray', padding: '2px', width: '100px'}}>Father</th>
                                        {[...Array(31)].map((_, i) => (
                                            <th key={i} style={{border: '2px solid gray', padding: '2px'}}>{i + 1}</th>
                                        ))}
                                        <th style={{border: '2px solid gray', padding: '2px', width: '80px'}}>Total Attend</th>
                                        <th style={{border: '2px solid gray', padding: '2px', width: '80px'}}>Remarks</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>

                        {/* Body Content */}
                        <div className='employee'>
                            <table style={{width: '100%'}} className='border-collapse'>
                                <tbody>
                                    {attendance && attendance.length > 0 ? (
                                        attendance.map((emp, index) => (
                                            <tr key={index}>
                                                <td style={{overflow: 'hidden', fontSize: '10px', border: '2px solid gray', padding: '2px'}}>{index + 1}</td>
                                                <td style={{overflow: 'hidden', fontSize: '10px', border: '2px solid gray', padding: '2px', width: '40px'}}>{emp?.employeeData?.EmpId || ''}</td>
                                                <td style={{overflow: 'hidden', fontSize: '10px', border: '2px solid gray', padding: '2px', width: '100px'}}>{emp?.employeeData?.Name || ''}</td>
                                                <td style={{overflow: 'hidden', fontSize: '10px', border: '2px solid gray', padding: '2px', width: '100px'}}>{emp?.employeeData?.Father || ''}</td>
                                                
                                                {/* Days 1-31 */}
                                                {[...Array(31)].map((_, dayIndex) => (
                                                    <td key={dayIndex} style={{overflow: 'hidden', fontSize: '10px', border: '2px solid gray', padding: '2px'}}>
                                                        {emp[`day${dayIndex + 1}`] || emp[`tday${dayIndex + 1}`] || ''}
                                                    </td>
                                                ))}
                                                
                                                {/* Total Attendance */}
                                                <td style={{overflow: 'hidden', fontSize: '10px', border: '2px solid gray', padding: '2px', width: '80px'}}>
                                                    P: {emp?.tpresent || '0'}, EL: {emp?.tel || '0'}, CL: {emp?.tcl || '0'}, FL: {emp?.tfl || '0'} Total: {emp?.tpayable || '0'}
                                                </td>
                                                
                                                {/* Remarks */}
                                                <td style={{overflow: 'hidden', fontSize: '10px', border: '2px solid gray', padding: '2px', width: '80px'}}></td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan='37' style={{padding: '10px', textAlign: 'center'}}>No employees data available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            {/* Summary Section */}
                            <div style={{marginTop: '15px'}}>
                                <hr />
                                <table style={{width: '100%', marginTop: '10px'}} className='border-collapse'>
                                    <tbody>
                                        <tr style={{fontSize: '12px', fontWeight: 'bold'}}>
                                            <td style={{padding: '5px'}}>Basic: {payroll.basic?.toFixed(2)}</td>
                                            <td style={{padding: '5px'}}>DA: {payroll.da?.toFixed(2)}</td>
                                            <td style={{padding: '5px'}}>Total Attn: {payroll.tpayable?.toFixed(2)}</td>
                                            <td style={{padding: '5px'}}>Gross: {payroll.mrpgross?.toFixed(2)}</td>
                                            <td style={{padding: '5px'}}>PF: {payroll.pf?.toFixed(2)}</td>
                                            <td style={{padding: '5px'}}>ESIC: {payroll.esic?.toFixed(2)}</td>
                                            <td style={{padding: '5px'}}>Net Payment: {payroll.mrpnetamt?.toFixed(2)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Footer Section */}
                        <div style={{marginTop: '20px', minHeight: '80px'}}></div>
                    </div>
                </div>
            )
        }
        </NewWindowPortal>
        )}
    </div>
  )
}

export default Attendance