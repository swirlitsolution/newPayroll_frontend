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
                            <span>{company.contractdata?.name || ''}<br></br>{company.contractdata?.address || ''}</span>
                            <span className=' text-center font-bold'>FORM XVII <br></br>[See Rule 78(2)(B)]<br></br> MASTER ROLL</span>
                            <span className="font-bold">Name and Address of Establishment<br></br> In/Under which contract is carried on</span>
                            <span>{company.contractdata?.contractestablishment?.name || company.contractdata?.name || ''}</span>
                            <span className="font-bold">Nature of Work / Work Order No</span>
                            <span>{company?.worknaturedata?.name || ''}</span>
                            <span className=' text-center font-bold'>Month: <span className='uppercase'>{month || ''}</span> Year: <span>{year || ''}</span></span>
                            <span className="font-bold">Name and address of Principle Employer</span>
                            <span>{company?.principleEmployer?.name || company?.principledata?.name || ''}</span>
                        </div>
                        <div className='mb-4'>
                         

                            {/* Table Header */}
                            <table className="w-full border-collapse border border-gray-400 text-[10px]">
                                <thead>
                                    <tr style={{whiteSpace: 'nowrap'}}>
                                        <th className="border border-gray-400 p-1 text-wrap w-10">Sl</th>
                                        <th className="border border-gray-400 p-1 text-wrap w-10">EmpId</th>
                                        <th className="border border-gray-400 p-1 text-wrap w-10">Employee</th>
                                        <th className="border border-gray-400 p-1  w-10">Father Name</th>
                                        {[...Array(31)].map((_, i) => (
                                            <th key={i} className="border border-gray-400 p-1 text-wrap w-10">{i + 1}</th>
                                        ))}
                                        <th className="border border-gray-400 p-1 text-wrap w-10">Total Attend</th>
                                        <th className="border border-gray-400 p-1 text-wrap w-10">Remarks</th>
                                    </tr>
                                </thead>
                         
                    

                                {/* Body Content */}
                 
                                <tbody>
                                    {attendance && attendance.length > 0 ? (
                                        attendance.map((emp, index) => (
                                            <tr key={index}>
                                                <td className="border border-gray-400 p-1 text-wrap w-10">{index + 1}</td>
                                                <td className="border border-gray-400 p-1 text-wrap w-10">{emp?.employeeData?.EmpId || ''}</td>
                                                <td className="border border-gray-400 p-1 text-nowrap w-10">{emp?.employeeData?.Name || ''}</td>
                                                <td className="border border-gray-400 p-1 text-nowrap w-10">{emp?.employeeData?.Father || ''}</td>

                                                {/* Days 1-31 */}
                                                {[...Array(31)].map((_, dayIndex) => (
                                                    <td key={dayIndex} className="border border-gray-400 p-1 text-wrap w-10">
                                                        {emp[`day${dayIndex + 1}`] || emp[`tday${dayIndex + 1}`] || ''}
                                                    </td>
                                                ))}
                                                
                                                {/* Total Attendance */}
                                                <td className="border border-gray-400 p-1 text-nowrap w-10">
                                                    {emp?.tpresent? `P: ${emp?.tpresent || '0'} ,` : ''}{emp?.tel? `EL: ${emp?.tel || '0'} , ` : ''} {emp?.tcl? `CL: ${emp?.tcl || '0'} , ` : ''} {emp?.tfl? `FL: ${emp?.tfl || '0'} , ` : ''} Total: {emp?.tpayable || '0'}
                                                </td>
                                                
                                                {/* Remarks */}
                                                <td className="border border-gray-400 p-1 text-wrap w-10"></td>
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