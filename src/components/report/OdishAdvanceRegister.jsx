import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
  const monthdata = {
    "01":"Jan",
    "02":"Feb",
    "03":"Mar",
    "04":"Apr",
    "05":"May",
    "06":"Jun",
    "07":"Jul",
    "08":"Aug",
    "09":"Sept",
    "10":"Oct",
    "11":"Nov",
    "12":"Dec",
  }
function OdishAdvanceRegister(props) {
    console.log("Odisha Format Selected")
    const contentRef = useRef();
    const reactToPrintFn = useReactToPrint({ contentRef });
  return (
    <div>
        {
      props.company && (
        <div className='w-full flex flex-col'>
            
            <button className=' mr-5 bg-black p-2 self-end w-24 text-white' onClick={reactToPrintFn}>Print</button>
            <div ref={contentRef}>
                <p className='text-center font-bold text-sm'>Annexure-B</p>
                <p className='text-center font-bold text-sm'>Form-XVI,XVII,XVIII & I</p>
                <p className='text-center font-bold text-sm'>Appendix-2 (b)</p>
                <p className='text-center font-bold text-sm'>COMBINED REGISTER OF FINES, DEDUCTIONS FOR DAMAGE OR LOSS AND ADVANCES</p>
                <p className='text-center font-bold text-sm'>[See rule 77 (2) (d),78(d)]</p>
                <p className='text-left text-sm mt-4'>Under Rule 21 (4) of Orissa Minimum Wages Rules, 1954</p>
                <p className='text-left text-sm'>Under Rule, 78 (d) (fine), 77 (22) (d) (dedu.), 77 (2) (d) (adv.) of Orissa Contract Labour (R & A) Rules, 1975</p>
                <p className='text-left text-sm'>Under Rule 3 (1) (fine), 4 (deductions) and 17 (3) (advances) of Orissa Payment of Wages Rules, 1936</p>
                <p className='text-left text-sm'>Under Rule 52 (2) C of Orissa I.S.M.W (RE & CS) Rules, 1980 <span className='float-right text-sm'>Month     Year</span></p>
                <p className='text-left text-sm'>Under Rule-239 (1) (b) of Orissa Building other Construction Workers (RE & CS) Rules, 2002<span className='float-right text-sm'>{monthdata[props.month?.split("-")[1]]}     {props.month?.split("-")[0]}</span></p>
                <p className='text-left text-sm'>Under Sec-18 Minimum Wages Act-1948</p>
                <div className='grid grid-cols-2 gap-4 mt-4'>
                    <div>
                        <p className='text-left text-sm'>Name & Address of Contractor</p>
                        <p className='text-left text-sm font-semibold'>{props.company?.name}</p>
                        <p className='text-left text-sm'>{props.company?.address}</p>
                        <p className='text-left text-sm mt-2'>Nature & Location of Work</p>
                        <p className='text-left text-sm font-semibold'>{props.company?.workNature || 'N/A'}</p>
                    </div>
                    <div>
                        <p className='text-left text-sm'>Name & Address of the Establishment in / under which contract is carried on</p>
                        <p className='text-left text-sm font-semibold'>{props.company?.contractEstablishment || 'N/A'}</p>
                        <p className='text-left text-sm mt-2'>Name & Address of Principal Employer</p>
                        <p className='text-left text-sm font-semibold'>{props.company?.principleEmployer || 'N/A'}</p>
                    </div>
                </div>
                <table className='w-full border-collapse border border-black text-xs mt-6'>
                  <thead>
                    <tr className='bg-gray-100'>
                      <th className='border border-black p-2 text-left font-semibold'>Sl.No</th>
                      <th className='border border-black p-2 text-left font-semibold'>Name of the Employee<br/>Father / Husband's Name</th>
                      <th className='border border-black p-2 text-left font-semibold'>Designation<br/>Emp No., Sl.No. in<br/>Register of Employee</th>
                      <th className='border border-black p-2 text-left font-semibold'>Name & Date of<br/>Office for which<br/>Fine imposed</th>
                      <th className='border border-black p-2 text-left font-semibold'>Date of Partic-<br/>ulars of Damage<br/>Fine Load</th>
                      <th className='border border-black p-2 text-left font-semibold'>Amount of Fine<br/>imposed /Dedu-<br/>ction made</th>
                      <th className='border border-black p-2 text-left font-semibold'>Amount of Adv-<br/>ance made &<br/>Purpose thereof</th>
                      <th className='border border-black p-2 text-left font-semibold'>No. of Installmem<br/>Granted for repayment<br/>of Fine/Ded. Advances</th>
                      <th className='border border-black p-2 text-left font-semibold'>Wages Period<br/>and rate of<br/>Wages payable</th>
                      <th className='border border-black p-2 text-left font-semibold'>Date of Recovery of<br/>Fine/Deduction/Adv.<br/>First last</th>
                      <th className='border border-black p-2 text-left font-semibold'>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.employee && props.employee.length > 0 ? (
                      props.employee.map((emp, index) => (
                        <tr key={index}>
                          <td className='border border-black p-2 text-center'>{index + 1}</td>
                          <td className='border border-black p-2'>{emp.Name}<br/>{emp.Father || ''}</td>
                          <td className='border border-black p-2'>{emp.DesignationDetails?.name || ''}<br/>{emp.workman || ""}</td>
                          <td className='border border-black p-2'>NIL</td>
                          <td className='border border-black p-2'>NIL</td>
                          <td className='border border-black p-2'>NIL</td>
                          <td className='border border-black p-2'>NIL</td>
                          <td className='border border-black p-2'>NIL</td>
                          <td className='border border-black p-2'>NIL</td>
                          <td className='border border-black p-2'>NIL</td>
                          <td className='border border-black p-2'>NIL</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan='11' className='border border-black p-2 text-center'>No employees selected</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div className='flex justify-between items-end mt-8'>
                    <div></div>
                    <div className='flex flex-col items-center gap-2'>
                        <div className='w-32 h-24 border border-gray-300 rounded-md flex items-center justify-center'>
                            <img 
                                src="https://backend.stcassociates.co.in/static/img/stamp.png" 
                                alt="Stamp"
                                className='w-28 h-20 object-contain'
                            />
                        </div>
                        <p className='text-xs text-center font-semibold w-40'>Signature of the Employer/Principal Employer</p>
                        <p className='text-xs text-center'>Authorized signatory</p>
                    </div>
                </div>
            </div>
        </div>
      )
    }
    </div>
  )
}

export default OdishAdvanceRegister