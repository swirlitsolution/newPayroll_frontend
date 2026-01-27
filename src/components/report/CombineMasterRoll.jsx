import React, { useEffect, useState } from 'react'
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {  setCompany } from '../../Redux/Slices/CompanySlice';
import { useCompanyQuery } from '../../hooks/useCompanyQuery';
function CombineMasterRoll({attendanceData,month,year}) {
  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [payroll,setPayroll] = useState({
    basic:0,
    da:0,
    attAllowance:0,
    specialallowance:0,
    mrpgross:0,
    esic:0,
    pf:0,
    deduction:0,
    mrpnetamt:0,
  })
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
  const attendance = attendanceData || [];
  const dispatch = useDispatch();
  const {company} = useSelector(state => state.Company);
  const { companyData, isLoading } = useCompanyQuery(); // get current selected company data
  const calPayroll = ()=>{
    const tpayable = attendance.reduce((sum, emp) => sum + parseFloat(emp.tpayable || 0), 0);
    const tcl = attendance.reduce((sum, emp) => sum + parseFloat(emp.tcl || 0), 0);
    const tel = attendance.reduce((sum, emp) => sum + parseFloat(emp.tel || 0), 0);
    const tfl = attendance.reduce((sum, emp) => sum + parseFloat(emp.tfl || 0), 0);
    const tnh = attendance.reduce((sum, emp) => sum + parseFloat(emp.tnh || 0), 0);
    const tpresent = attendance.reduce((sum, emp) => sum + parseFloat(emp.tpresent || 0), 0);
    const totalBasic = attendance.reduce((sum, emp) => sum + parseFloat(emp.basic || 0), 0);
    const totalDa = attendance.reduce((sum, emp) => sum + parseFloat(emp.da || 0), 0);
    const totalAttnAllow = attendance.reduce((sum, emp) => sum + parseFloat(emp.attAllowance || 0), 0);
    const totalSplAllow = attendance.reduce((sum, emp) => sum + parseFloat(emp.specialallowance || 0), 0);
    const mrpgross = attendance.reduce((sum, emp) => sum + parseFloat(emp.mrpgross || 0), 0);
    const totalEsicAmt = attendance.reduce((sum, emp) => sum + parseFloat(emp.esic || 0), 0);
    const totalPfAmt = attendance.reduce((sum, emp) => sum + parseFloat(emp.pf || 0), 0);
    const totalDeduction = attendance.reduce((sum, emp) => sum + parseFloat(emp.deduction || 0), 0);
    const netPayment = attendance.reduce((sum, emp) => sum + parseFloat(emp.mrpnetamt || 0), 0);
    const prftax = attendance.reduce((sum, emp) => sum + parseFloat(emp.prftax || 0), 0);
      setPayroll({
      basic:totalBasic,
      da:totalDa,
      tcl:tcl,
      tel:tel,
      tfl:tfl,
      tpresent:tpresent,
      tpayable:tpayable,
      attAllowance:totalAttnAllow.toFixed(2),
      specialallowance:totalSplAllow.toFixed(2),
      mrpgross:mrpgross,
      esic:totalEsicAmt,
      pf:totalPfAmt,
      prftax:prftax,
      deduction:totalDeduction,
      mrpnetamt:netPayment,
    })
  
  }

  useEffect(()=>{
      calPayroll()
      dispatch(setCompany(companyData));
  
  },[companyData])
  // check if attendance data is not available than return No data available else render the table
  if (attendance.length === 0) {
    return <div>No data available</div>;
  }
  if(isLoading) return <p>Loading ....</p>
  return (
    <div className='w-full'>
    {
      company && (
        <div className='w-full flex flex-col'>
       <button className=' mr-5 bg-black p-2 self-end w-24 text-white' onClick={reactToPrintFn}>Print</button>
      <div ref={contentRef}>
        <div className='w-full grid grid-cols-5 text-sm'>
          <span>FORM 29</span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span className='col-span-2'>COMBINED MASTER ROLL - CUM-REGISTER OF WAGES</span>
          
          <span></span>
          <span></span>
          <span></span>
          <span>Name & Address of Factory Establishment</span>
          <span>{company.name}</span>
          <span></span>
          <span>Name & Address of Contractor  </span>
          <span>Name & Address of Principle Employer</span>
          <span></span>
          <span>{company.address}</span>
          <span>{company.address}</span>
          <span>{company.contractEstablishment}</span>
          <span>{company?.principleEmployer}</span>
          <span>Nature & Location of Work</span>
          <span>HVAC PROJECT</span>
          <span></span>
          <span></span>
          <span></span>
          
          <span className=' col-span-2'><pre>Wages Period - Monthly   {monthdata[month]} {year}</pre></span>
          <span></span>
          <span></span>
        </div>
        <table className="w-full border-collapse border border-black text-[10px]">
          <thead className="bg-gray-100">
            {/* --- FIRST ROW OF HEADER --- */}
            <tr>
              <th rowSpan="2" className="border border-black px-1 text-left align-bottom"><div className='vertical-text'>Sl.No.</div></th>
              <th rowSpan="2" className="border border-black px-2 py-2 align-bottom">Name of Workman </th>
              <th rowSpan="2" className="border border-black px-1 py-2 align-bottom"><div className="vertical-text">Sex (M/F)</div></th>
              <th rowSpan="2" className="border border-black px-1 py-2 align-bottom"><div className="vertical-text">Date of Birth</div></th>
              <th rowSpan="2" className="border border-black px-1 py-2 align-bottom"><div className="vertical-text">Employee Sl.No. in
Register of Employees</div></th>
              <th rowSpan="2" className="border border-black px-1 py-2 align-bottom"><div className="vertical-text">Designation / Department</div></th>
              <th rowSpan="2" className="border border-black px-1 py-2 align-bottom"><div className="vertical-text">Date of Joining</div></th>
              <th rowSpan="2" className="border border-black px-1 py-2 align-bottom"><div className="vertical-text">ESIC IP No</div></th>
              <th rowSpan="2" className="border border-black px-1 py-2 align-bottom "><div className="vertical-text">PF NO.</div></th>
              <th rowSpan="2" className="border border-black px-1 py-2 align-bottom w-10"><div className="vertical-text">UAN No.</div></th>
              
              {/* Attendance Spanning 31 Days */}
              <th colSpan="31" className="border border-black py-1 text-center bg-white">
                Attendance Sheet (Unit of Work Done )
              </th>
              
              <th rowSpan="2" className="border border-black px-1 py-2 align-bottom"><div className="vertical-text">No. of Payable Days Total Work Name of H & FH for which</div> </th>
              <th rowSpan="2" className="border border-black py-1 text-center align-bottom"><div className="vertical-text">Wages Rate</div> </th>
                
              {/* Earnings Sub-headers */}
              <th rowSpan="2" className="border border-black text-[8px] px-1 align-bottom"><div className="vertical-text">Basic</div> </th>
              <th rowSpan="2" className="border border-black text-[8px] px-1 align-bottom"><div className="vertical-text">DA</div> </th>
              <th rowSpan="2" className="border border-black text-[8px] px-1 align-bottom"><div className="vertical-text">HRA</div> </th>
              <th rowSpan="2" className="border border-black text-[8px] px-1 align-bottom"><div className="vertical-text">Conveyence Allowance</div> </th>
              <th rowSpan="2" className="border border-black text-[8px] px-1 align-bottom"><div className="vertical-text">Medical Allowance</div> </th>
              <th rowSpan="2" className="border border-black text-[8px] px-1 align-bottom"><div className="vertical-text">Washing Allowance</div> </th>
              <th rowSpan="2" className="border border-black text-[8px] px-1 align-bottom"><div className="vertical-text">Attn. Allowance/Bonus</div> </th>
              <th rowSpan="2" className="border border-black text-[8px] px-1 align-bottom"><div className="vertical-text">Spl.Allowance</div> </th>
              <th rowSpan="2" className="border border-black text-[8px] px-1 align-bottom"><div className="vertical-text">O.T.Wages</div> </th>
              <th rowSpan="2" className="border border-black text-[8px] px-1 align-bottom"><div className="vertical-text">Misc. Earnings</div> </th>
              <th rowSpan="2" className="border border-black text-[8px] px-1 align-bottom"><div className="vertical-text">Other</div> </th>
             <th rowSpan="2" className="border border-black px-1 py-2 align-bottom"><div className="vertical-text">Gross Total</div> </th>
              <th colSpan="11" className="border border-black py-1 align-bottom">Total Deductions </th>
              <th rowSpan="2" className="border border-black px-1 py-2 font-bold align-bottom"><div className="vertical-text">Net Payment</div> </th>
              <th rowSpan="2" className="border border-black px-1 py-2 align-bottom"><div className="vertical-text">Date of Payment</div> </th>
              <th rowSpan="2" className="border border-black px-1 py-2 align-bottom"><div className="vertical-text">Signature / Thumb 
Impression (19)</div> </th>
            </tr>

            {/* --- SECOND ROW OF HEADER (The Sub-headers) --- */}
            <tr>
           
              {/* Loop for 1 to 31 days */}
              {[...Array(31)].map((_, i) => (
                <th key={i + 1} className="border border-black  align-bottom">
                  {i + 1}
                </th>
              ))}
            

              {/* Deductions Sub-headers */}
               
              <th rowSpan="2" className="border border-black px-1 py-2 align-bottom"><div className="vertical-text">ESIC</div> </th>
              <th rowSpan="2" className="border border-black px-1 py-2 align-bottom"><div className="vertical-text">PF</div> </th>
              <th rowSpan="2" className="border border-black px-1 py-2 align-bottom"><div className="vertical-text">Socy.</div> </th>
              <th rowSpan="2" className="border border-black px-1 py-2 align-bottom"><div className="vertical-text">Insurance</div> </th>
              <th rowSpan="2" className="border border-black px-1 py-2 align-bottom"><div className="vertical-text">Sal.Adv</div> </th>
              <th rowSpan="2" className="border border-black px-1 py-2 align-bottom"><div className="vertical-text">PT</div> </th>
              <th rowSpan="2" className="border border-black px-1 py-2 align-bottom"><div className="vertical-text">TDS</div> </th>
              <th rowSpan="2" className="border border-black px-1 py-2 align-bottom"><div className="vertical-text">Fine</div> </th>
              <th rowSpan="2" className="border border-black px-1 py-2 align-bottom"><div className="vertical-text">Damage & Loss</div> </th>
              <th rowSpan="2" className="border border-black px-1 py-2 align-bottom"><div className="vertical-text">Others</div> </th>
              <th rowSpan="2" className="border border-black px-1 py-2 align-bottom"><div className="vertical-text">Total Deduction</div> </th>
            </tr>
          </thead>
          
          <tbody>
            {
              attendanceData?.map((emp, index) => (
                <tr key={index}>
                  <td className="border border-black px-1">{index + 1}</td>
                  <td className="border border-black px-2">{emp.employeeData.Name}</td>
                  <td className="border border-black px-1">{emp.employeeData.Gender}</td>
                  <td className="border border-black px-1">{emp.employeeData?.Dob?emp.employeeData?.Dob?.split("-")[1] +"/"+ emp.employeeData?.Dob?.split("-")[2]:""}</td>
                  <td className="border border-black px-1">{emp.employeeData.EmpId}</td>
                  <td className="border border-black px-1">{emp.employeeData.Skill}</td>
                  <td className="border border-black px-1">{emp.employeeData?.Doj?emp.employeeData?.Doj?.split("-")[1] +"/"+ emp.employeeData?.Doj?.split("-")[2]:""}</td>
                  <td className="border border-black px-1 "><p>{`${emp.employeeData.Esic}`}</p></td>
                  <td className="border border-black px-1">{`${emp.employeeData.PfNum || ""}`}</td>
                  <td className="border border-black px-1 text-wrap w-10">{emp.employeeData.Uan}</td>
                   <td className="border border-black px-1">{emp.day1}</td>
                  <td className="border border-black px-1">{emp.day2}</td>
                  <td className="border border-black px-1">{emp.day3}</td>
                  <td className="border border-black px-1">{emp.day4}</td>
                  <td className="border border-black px-1">{emp.day5}</td>
                  <td className="border border-black px-1">{emp.day6}</td>
                  <td className="border border-black px-1">{emp.day7}</td>
                  <td className="border border-black px-1">{emp.day8}</td>
                  <td className="border border-black px-1">{emp.day9}</td>
                  <td className="border border-black px-1">{emp.day10}</td>
                  <td className="border border-black px-1">{emp.day11}</td>
                  <td className="border border-black px-1">{emp.day12}</td>
                  <td className="border border-black px-1">{emp.day13}</td>
                  <td className="border border-black px-1">{emp.day14}</td>
                  <td className="border border-black px-1">{emp.day15}</td>
                  <td className="border border-black px-1">{emp.day16}</td>
                  <td className="border border-black px-1">{emp.day17}</td>
                  {/* {td to 31} */}
                  <td className="border border-black px-1">{emp.day18}</td>
                  <td className="border border-black px-1">{emp.day19}</td>
                  <td className="border border-black px-1">{emp.day20}</td>
                  <td className="border border-black px-1">{emp.day21}</td>
                  <td className="border border-black px-1">{emp.day22}</td>
                  <td className="border border-black px-1">{emp.day23}</td>
                  <td className="border border-black px-1">{emp.day24}</td>
                  <td className="border border-black px-1">{emp.day25}</td>
                  <td className="border border-black px-1">{emp.day26}</td>
                  <td className="border border-black px-1">{emp.day27}</td>
                  <td className="border border-black px-1">{emp.day28}</td>
                  <td className="border border-black px-1">{emp.day29}</td>
                  <td className="border border-black px-1">{emp.day30}</td>
                  <td className="border border-black px-1">{emp.day31}</td>
                  <td className="border border-black px-1">{emp.tpresent}<pre>FL : {emp.tfl}</pre><pre>{emp.tpayable}</pre></td>
                  <td className="border border-black px-1">{emp.bdarate}</td>
                  <td className="border border-black px-1">{emp.basic}</td>
                  <td className="border border-black px-1">{emp.da}</td>
                  <td className="border border-black px-1">{emp.hraamt}</td>
                  <td className="border border-black px-1">{emp.caamt}</td>
                  <td className="border border-black px-1">{emp.medical}</td>
                  <td className="border border-black px-1">{emp.washingallowance}</td>
                  <td className="border border-black px-1">{emp.attAllowance}</td>
                  <td className="border border-black px-1 ">{emp.specialallowance}</td>
                  <td className="border border-black px-1">{emp.mrpotamt}</td>
                  <td className="border border-black px-1">{emp.miscamt}</td>
                  <td className="border border-black px-1 ">{0}</td>
                  <td className="border border-black px-1">{emp.mrpgross}</td>
                  <td className="border border-black px-1">{emp.esic}</td>
                  <td className="border border-black px-1">{emp.pf}</td>
                  <td className="border border-black px-1"></td>
                  <td className="border border-black px-1"></td>
                  <td className="border border-black px-1"></td>
                  <td className="border border-black px-1">{emp.prftax}</td>
                  <td className="border border-black px-1"></td>
                  <td className="border border-black px-1"></td>
                  <td className="border border-black px-1"></td>
                  <td className="border border-black px-1"></td>
                  <td className="border border-black px-1">{emp.deduction}</td>
                  <td className="border border-black px-1">{emp.mrpnetamt}</td>
                  <td className="border border-black px-1"></td>
                  <td className="border border-black px-1"></td>
                  </tr>
              ))
            }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>Total Basic</td>
              <td colSpan={2}>{payroll.basic}</td>
              <td colSpan={2}>Total Da</td>
              <td colSpan={2}>{payroll.da}</td>
              <td colSpan={4}>Total Attn Allow</td>
              <td colSpan={2}>{payroll.attAllowance}</td>
              <td colSpan={10}>Total Spl Allow</td>
              <td colSpan={3}>{payroll.specialallowance}</td>
              <td colSpan={6}>Total Gross Payment</td>
              <td colSpan={3}>{payroll.mrpgross}</td>
              <td colSpan={4}>Total PT</td>
              <td colSpan={2}>{payroll.prftax}</td>
              <td rowSpan="7"  colSpan={29}>
                <img src="https://backend.stcassociates.co.in/static/img/stamp.png" className=" float-right mr-10" width="200" height="200" alt="Stamp" />
              </td>
            </tr>
             <tr>
              <td  colSpan={2}>Total Esic Amt</td>
              <td colSpan={2}>{payroll.esic}</td>
              <td colSpan={2}>Total PF Amt</td>
              <td colSpan={2}>{payroll.pf}</td>
              <td colSpan={4}>Total Deduction</td>
              <td colSpan={2}>{payroll.deduction}</td>
              <td colSpan={10}>Net Payment</td>
              <td colSpan={3}>{payroll.mrpnetamt}</td>
              <td colSpan={6}>Total Day Worked</td>
              <td colSpan={3}>{payroll.tpresent}</td>
              <td colSpan={4}></td>
              <td colSpan={2}></td>
            </tr>
            <tr>
              <td  colSpan={2}></td>
              <td colSpan={2}></td>
              <td colSpan={2}></td>
              <td colSpan={2}></td>
              <td colSpan={4}></td>
              <td colSpan={2}></td>
              <td colSpan={10}></td>
              <td colSpan={3}></td>
              <td colSpan={6}>CL Day</td>
              <td colSpan={3}>0</td>
              <td colSpan={4}></td>
              <td colSpan={2}></td>
            </tr>
            <tr>
              <td  colSpan={2}></td>
              <td colSpan={2}></td>
              <td colSpan={2}></td>
              <td colSpan={2}></td>
              <td colSpan={4}></td>
              <td colSpan={2}></td>
              <td colSpan={10}></td>
              <td colSpan={3}></td>
              <td colSpan={6}>EL Day</td>
              <td colSpan={3}>0</td>
              <td colSpan={4}></td>
              <td colSpan={2}></td>
            </tr>
            <tr>
              <td  colSpan={2}></td>
              <td colSpan={2}></td>
              <td colSpan={2}></td>
              <td colSpan={2}></td>
              <td colSpan={4}></td>
              <td colSpan={2}></td>
              <td colSpan={10}></td>
              <td colSpan={3}></td>
              <td colSpan={6}>FL Day</td>
              <td colSpan={3}>0</td>
              <td colSpan={4}></td>
              <td colSpan={2}></td>
            </tr>
            <tr>
              <td  colSpan={2}></td>
              <td colSpan={2}></td>
              <td colSpan={2}></td>
              <td colSpan={2}></td>
              <td colSpan={4}></td>
              <td colSpan={2}></td>
              <td colSpan={10}></td>
              <td colSpan={3}></td>
              <td colSpan={6}>Total NH Day</td>
              <td colSpan={3}>0</td>
              <td colSpan={4}></td>
              <td colSpan={2}></td>
            </tr>
            <tr>
              <td  colSpan={2}></td>
              <td colSpan={2}></td>
              <td colSpan={2}></td>
              <td colSpan={2}></td>
              <td colSpan={4}></td>
              <td colSpan={2}></td>
              <td colSpan={10}></td>
              <td colSpan={3}></td>
              <td colSpan={6}>Total Man Day</td>
              <td colSpan={3}>{payroll.tpayable}</td>
              <td colSpan={4}></td>
              <td colSpan={2}></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
      )
    }
    </div>
  )
}

export default CombineMasterRoll