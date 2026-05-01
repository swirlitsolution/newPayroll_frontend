import React, { useRef } from 'react'
import { useReactToPrint } from "react-to-print";
import { Button } from '../ui/button';
import useRequest from '@/hooks/useRequest';
const days = Array.from({ length: 31 }, (_, index) => index + 1)
const dataRows = [
  {
    serial: 1302,
    name: 'SK.TAMUL HAQUE',
    relay: '8 S',
    place: 'P S',
    attendance: ['P', 'S', 'P', 'S', 'P', 'S', 'P', 'S', 'P', 'S', 'P', 'S', 'P', 'A', 'A', 'A', 'O', 'A', 'P', 'A', 'S', 'P', 'A', 'A', 'A', 'A', 'A','P','A','A','P'],
  },
  {
    serial: 1733,
    name: 'SURENDRA KUMAR 1',
    relay: '8 S',
    place: 'P S',
    attendance: ['P', 'S', 'P', 'S', 'P', 'S', 'P', 'S', 'P', 'S', 'P', 'S', 'P', 'S', 'P', 'S', 'P', 'S', 'P', 'S', 'P', 'S', 'P', 'S', 'P', 'S', 'P'],
  },
  {
    serial: 1940,
    name: 'SEKH HAFAIJUL',
    relay: '8 S',
    place: 'P S',
    attendance: ['P', 'S', 'P', 'S', 'P', 'S', 'P', 'S', 'P', 'S', 'P', 'S', 'P', 'S', 'P', 'S', 'P', 'S', 'P', 'S', 'P', 'S', 'P', 'S', 'P', 'S', 'P'],
  },
]

function FormDReport(props) {
    const contentRef = useRef();
    const reactToPrintFn = useReactToPrint({ contentRef });
    //const { data, error, loading} = useRequest("/parameter/")
    console.log("parameter data is ",props.month)
    const getTotalDayOfMonth = (month, year = new Date().getFullYear())=>{
        return new Date(year, month, 0).getDate();
    }
  return (
    <div >
        <Button
            onClick={reactToPrintFn}
            className=" w-10 mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
            Print
        </Button>
      <div ref={contentRef} className="mx-auto max-w-full bg-white  shadow-sm p-6">
        <div className="text-center mb-6">
          <p className="text-sm tracking-[0.2em] uppercase">Form D</p>
          <h1 className="text-2xl font-semibold tracking-wide">Format of Attendance Register</h1>
        </div>

        <div className="grid grid-cols-5  text-sm mb-6">
          <div className="space-y-1">
            <div className="font-semibold uppercase">Name of Establishment</div>
          
          </div>
           <div className="space-y-1 text-left">
            
            <div>{props?.company?.companydata?.name}</div>
          </div>
            <div className="space-y-1 text-left">
            <div className="font-semibold uppercase">Name of Owner</div>
        
          </div>
          <div className="space-y-1 text-right">
            <div className="font-semibold uppercase">LIN</div>
        
          </div>
          <div className="space-y-1 text-center">
        
            <div>1-9143-2709-7</div>
          </div>
          <div className="space-y-1">
            <div className="font-semibold uppercase">For the Period From</div>
      
          </div>
           <div className="space-y-1">

            <div>01-{`${props.month}`.split("-").reverse().join("-")} To {getTotalDayOfMonth(parseInt(props.month.split('-')[1]))}-{`${props.month}`.split("-").reverse().join("-")}</div>
          </div>
        </div>

        <div className=" border border-slate-300 rounded-md">
          <table className="min-w-[2000px] w-full border-collapse text-[11px]">
            <thead>
              <tr className="bg-slate-200 text-center align-middle">
                <th  className="border border-slate-300 px-2 py-2">Serial No. in Emp Register</th>
                <th className="border border-slate-300 px-2 py-2 ">Name</th>
                <th  className="border border-slate-300 px-2 py-2 w-10">Relay # / Set Work</th>
                <th  className="border border-slate-300 px-2 py-2 w-10">Place of Work</th>
                {days.map((day) => (
                    <React.Fragment key={`sub-${day}`}>
                        <th className="border border-slate-300 px-1 py-1">IN Out</th>
                        <th key={day} className="border border-slate-300 px-1 py-2">
                            {day}
                        </th>
                       
                  </React.Fragment>
                ))}
                 <th className='border border-slate-300 px-1 py-1 w-10'>Summery No of Days</th>
                <th className='border border-slate-300 px-1 py-1 w-10'>Remarks No of Hours</th>
                <th className='border border-slate-300 px-1 py-1 w-10'>Sign Reg Keeper</th>
              </tr>

            </thead>
            <tbody>
              { props.employee && props.employee.length > 0 ?(
                props.employee.map((row,index) => (
                    <>
                <tr key={index} className="odd:bg-white even:bg-slate-50 text-center align-middle">
                  <td className="border border-slate-300 px-2 py-2 text-left w-10">{row.employeeData_EmpId}</td>
                  <td className="border border-slate-300 px-2 py-2 text-left text-nowrap">{row.employeeData_Name}</td>
                  <td className="border border-slate-300 px-2 py-2"></td>
                  <td className="border border-slate-300 px-2 py-2"></td>
             
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day1 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '8' : ''}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day1}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day2 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '8' : ''}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day2}</td> 
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day3 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '8' : ''}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day3}</td> 
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day4 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '8' : ''}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day4}</td>
                {/* till the day 31 */}
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day5 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '8' : ''}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day5}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day6 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '8' : ''}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day6}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day7 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '8' : ''}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day7}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day8 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '8' : ''}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day8}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day9 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '8' : ''}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day9}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day10 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '8' : ''}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day10}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day11 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '8' : ''}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day11}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day12 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '8' : ''}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day12}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day13 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '8' : ''}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day13}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day14 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '8' : ''}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day14}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day15 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '8' : ''}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day15}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day16 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '8' : ''}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day16}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day17 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '8' : ''}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day17}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day18 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '8' : ''}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day18}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day19 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '8' : ''}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day19}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day20 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '8' : ''}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day20}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day21 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '8' : ''}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day21}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day22 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '8' : ''}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day22}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day23 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '8' : ''}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day23}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day24 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '8' : ''}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day24}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day25 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '8' : ''}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day25}</td>
                
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day26 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '8' : ''}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day26}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day27 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '8' : ''}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day27}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day28 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '8' : ''}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day28}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day29 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '8' : ''}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day29}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day30 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '8' : ''}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day30}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day31 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '8' : ''}</td>
                <td className="border border-slate-300 px-1 py-1 text-center">{row.day31}</td>
                <td className="border border-slate-300 px-1 py-1 text-center"></td>
                <td className="border border-slate-300 px-1 py-1 text-center"></td>
                 <td className="border border-slate-300 px-1 py-1 text-center"></td>   
                </tr>
                <tr>
                    <td className="border border-slate-300 px-2 py-2 text-left"></td>
                    <td className="border border-slate-300 px-2 py-2 text-left"></td>
                    <td className="border border-slate-300 px-2 py-2"></td>
                    <td className="border border-slate-300 px-2 py-2"></td>
             
                    <td className="border border-slate-300 px-1 py-1 text-center">{row.day1 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '17' : ''}</td>
                    <td className="border border-slate-300 px-1 py-1 text-center"></td>
                    <td className="border border-slate-300 px-1 py-1 text-center">{row.day2 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '17' : ''}</td>
                    <td className="border border-slate-300 px-1 py-1 text-center"></td> 
                    <td className="border border-slate-300 px-1 py-1 text-center">{row.day3 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '17' : ''}</td>
                    <td className="border border-slate-300 px-1 py-1 text-center"></td> 
                    <td className="border border-slate-300 px-1 py-1 text-center">{row.day4 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '17' : ''}</td>
                    <td className="border border-slate-300 px-1 py-1 text-center"></td>
                    {/* till the day 31 */}
                    <td className="border border-slate-300 px-1 py-1 text-center">{row.day5 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '17' : ''}</td>
                    <td className="border border-slate-300 px-1 py-1 text-center"></td>
                    <td className="border border-slate-300 px-1 py-1 text-center">{row.day6 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '17' : ''}</td>
                    <td className="border border-slate-300 px-1 py-1 text-center"></td>
                    <td className="border border-slate-300 px-1 py-1 text-center">{row.day7 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '17' : ''}</td>
                    <td className="border border-slate-300 px-1 py-1 text-center"></td>
                    <td className="border border-slate-300 px-1 py-1 text-center">{row.day8 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '17' : ''}</td>
                    <td className="border border-slate-300 px-1 py-1 text-center"></td>
                    <td className="border border-slate-300 px-1 py-1 text-center">{row.day9 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '17' : ''}</td>
                    <td className="border border-slate-300 px-1 py-1 text-center"></td>
                    <td className="border border-slate-300 px-1 py-1 text-center">{row.day10 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '17' : ''}</td>
                    <td className="border border-slate-300 px-1 py-1 text-center"></td>
                    <td className="border border-slate-300 px-1 py-1 text-center">{row.day11 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '17' : ''}</td>
                    <td className="border border-slate-300 px-1 py-1 text-center"></td>
                    <td className="border border-slate-300 px-1 py-1 text-center">{row.day12 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '17' : ''}</td>
                    <td className="border border-slate-300 px-1 py-1 text-center"></td>
                    <td className="border border-slate-300 px-1 py-1 text-center">{row.day13 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '17' : ''}</td>
                    <td className="border border-slate-300 px-1 py-1 text-center"></td>
                    <td className="border border-slate-300 px-1 py-1 text-center">{row.day14 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '17' : ''}</td>
                    <td className="border border-slate-300 px-1 py-1 text-center"></td>
                    <td className="border border-slate-300 px-1 py-1 text-center">{row.day15 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '17' : ''}</td>
                    <td className="border border-slate-300 px-1 py-1 text-center"></td>
                    <td className="border border-slate-300 px-1 py-1 text-center">{row.day16 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '17' : ''}</td>
                    <td className="border border-slate-300 px-1 py-1 text-center"></td>
                    <td className="border border-slate-300 px-1 py-1 text-center">{row.day17 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '17' : ''}</td>
                    <td className="border border-slate-300 px-1 py-1 text-center"></td>
                    <td className="border border-slate-300 px-1 py-1 text-center">{row.day18 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '17' : ''}</td>
                    <td className="border border-slate-300 px-1 py-1 text-center"></td>
                    <td className="border border-slate-300 px-1 py-1 text-center">{row.day19 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '17' : ''}</td>
                    <td className="border border-slate-300 px-1 py-1 text-center"></td>
                    <td className="border border-slate-300 px-1 py-1 text-center">{row.day20 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '17' : ''}</td>
                    <td className="border border-slate-300 px-1 py-1 text-center"></td>
                    <td className="border border-slate-300 px-1 py-1 text-center">{row.day21 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '17' : ''}</td>
                    <td className="border border-slate-300 px-1 py-1 text-center"></td>
                    <td className="border border-slate-300 px-1 py-1 text-center">{row.day22 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '17' : ''}</td>
                    <td className="border border-slate-300 px-1 py-1 text-center"></td>
                    <td className="border border-slate-300 px-1 py-1 text-center">{row.day23 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '17' : ''}</td>
                    <td className="border border-slate-300 px-1 py-1 text-center"></td>
                    <td className="border border-slate-300 px-1 py-1 text-center">{row.day24 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '17' : ''}</td>
                    <td className="border border-slate-300 px-1 py-1 text-center"></td>
                    <td className="border border-slate-300 px-1 py-1 text-center">{row.day25 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '17' : ''}</td>
                    <td className="border border-slate-300 px-1 py-1 text-center"></td>

                    <td className="border border-slate-300 px-1 py-1 text-center">{row.day26 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '17' : ''}</td>
                    <td className="border border-slate-300 px-1 py-1 text-center"></td>
                    <td className="border border-slate-300 px-1 py-1 text-center">{row.day27 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '17' : ''}</td>
                    <td className="border border-slate-300 px-1 py-1 text-center"></td>
                    <td className="border border-slate-300 px-1 py-1 text-center">{row.day28 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '17' : ''}</td>
                    <td className="border border-slate-300 px-1 py-1 text-center"></td>
                    <td className="border border-slate-300 px-1 py-1 text-center">{row.day29 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '17' : ''}</td>
                    <td className="border border-slate-300 px-1 py-1 text-center"></td>
                    <td className="border border-slate-300 px-1 py-1 text-center">{row.day30 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '17' : ''}</td>
                    <td className="border border-slate-300 px-1 py-1 text-center"></td>
                    <td className="border border-slate-300 px-1 py-1 text-center">{row.day31 === 'P' || row.day1 === 'N' || row.day1 === 'PN' ? '17' : ''}</td>
                    <td className="border border-slate-300 px-1 py-1 text-center w-10"></td>
                    <td className="border border-slate-300 px-1 py-1 text-center w-10"></td>
                    <td className="border border-slate-300 px-1 py-1 text-center w-10"></td>
                    <td className="border border-slate-300 px-1 py-1 text-center w-10"></td>   
                </tr>
                </>
              ))):"no Data Found"}
            </tbody>
          </table>
        </div>

   
      </div>
    </div>
  )
}

export default FormDReport