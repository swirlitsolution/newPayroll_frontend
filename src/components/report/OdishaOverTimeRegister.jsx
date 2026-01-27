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
    const contentRef = useRef();
    const reactToPrintFn = useReactToPrint({ contentRef });
console.log(props)
  return (
    <div>
        {
      props.company && (
        <div className='w-full flex flex-col'>
            <div ref={contentRef}>
                <p className='text-center font-bold text-sm'>Form-XIX</p>
                <p className='text-center font-bold text-sm'>COMBINED REGISTER OF OVERTIME WORKING AND</p>
                <p className='text-center font-bold text-sm'>PAYMENT [See rule - 77 (2) (c)]</p>
                <p className='text-center font-bold text-sm'>Appendix-2 (c)</p>
                
                <p className='text-left text-xs mt-3'>Rule 79 of Orissa Factories Rules, 1960</p>
                <p className='text-left text-xs'>(N.B.: Rule 80 & Form 11 may be supplied)</p>
                <p className='text-left text-xs'>Rule 162(j) of Orissa Minimum Wage Rules, 1954</p>
                <p className='text-left text-xs'>)(c) of Orissa Contract Labour (R&A) Rules, 1975</p>
                <p className='text-left text-xs'>Rule 124(j) & Rule 183(j) of Orissa Shops & Commercial Establishment Rules, 1956</p>
                <p className='text-left text-xs'>Rule 234(j) of Orissa B.C.W (COE) Rules, 1989</p>
                <p className='text-left text-xs'>Rule 57 of Orissa M.I.T. Workers Rules, 1956</p>
                <p className='text-left text-xs'>Rule 52(j)(a) of Orissa ISMW (RE & CS) Rules, 1980</p>
                <p className='text-left text-xs'>Rule 130(1)(c) of Orissa Building and other Construction Workers</p>
                <p className='text-left text-xs'>(Regulation of Employment & Condition of Service) Rules, 2002 <span className='float-right text-xs'>Month & Year      {monthdata[props.month?.split("-")[1]]}     {props.month?.split("-")[0]}</span></p>

                <div className='grid grid-cols-2 gap-4 mt-4'>
                    <div>
                        <p className='text-left text-sm font-semibold'>Name of Workman / Father / Husband's Name</p>
                        <p className='text-left text-sm'>Sex</p>
                        <p className='text-left text-sm font-semibold'>Desi-gnation</p>
                    </div>
                    <div className='text-right'>
                        <p className='text-right text-xs'>Name & Address of the Establishment in / under which</p>
                        <p className='text-right text-xs'>contract is carried on: {props.company?.contractEstablishment || 'N/A'}</p>
                        <p className='text-right text-xs'>Name & Address of Principal Employer: {props.company?.principleEmployer || 'N/A'}</p>
                    </div>
                </div>

                <table className='w-full border-collapse border border-black text-xs mt-6'>
                  <thead>
                    <tr className='bg-gray-100'>
                      <th className='border border-black p-2 text-left font-semibold'>Sl.No.</th>
                      <th className='border border-black p-2 text-left font-semibold'>Name of<br/>Workman / Father /<br/>Husband's Name</th>
                      <th className='border border-black p-2 text-left font-semibold'>Sex</th>
                      <th className='border border-black p-2 text-left font-semibold'>Desig-<br/>nation</th>
                      <th className='border border-black p-2 text-left font-semibold'>Emp No. / Sl.No.<br/>in Register of<br/>Employee</th>
                      <th className='border border-black p-2 text-left font-semibold'>Particulars of O.T.<br/>Worked<br/>Date      Hours</th>
                      <th className='border border-black p-2 text-left font-semibold'>Normal Rate<br/>of Wages per<br/>Day / Hours</th>
                      <th className='border border-black p-2 text-left font-semibold'>Over time<br/>Rate of Wages<br/>per Day / Hours</th>
                      <th className='border border-black p-2 text-left font-semibold'>Total Over<br/>Time Wages</th>
                      <th className='border border-black p-2 text-left font-semibold'>Signature<br/>of the<br/>Employees</th>
                      <th className='border border-black p-2 text-left font-semibold'>Signature<br/>of the<br/>Period Authority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.employee && props.employee.length > 0 ? (
                      props.employee.map((emp, index) => (
                        <tr key={index}>
                          <td className='border border-black p-2 text-center'>{index + 1}</td>
                          <td className='border border-black p-2'>{emp.Name}</td>
                          <td className='border border-black p-2 text-center'>{emp.Gender || 'NIL'}</td>
                          <td className='border border-black p-2'>{emp.DesignationDetails?.name || 'NIL'}</td>
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
                        <p className='text-xs text-center font-semibold'>Stamp & Seal of the Contractor</p>
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