import React, { useEffect, useState } from 'react'
import { Label } from "@/components/ui/label"
import { addDays,format  } from 'date-fns';
import { useForm,Controller  } from "react-hook-form";
import usePost from '../../hooks/usePost';
import { Button } from '../ui/button';
import DataGrid from '../custom/DataGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CustomCalendar from '../custom/CustomCalendar';
import useImportExport from '../../hooks/useImportExport';
import { Input } from '../ui/input';
import Master from '../master/Master';
const leaveCheckListcolumns = [
    {field:'EmpId',headerName:'EmpId',width:'80px',renderCell:(params)=>params.employee.EmpId},
    {field:'Name',headerName:'Name',renderCell:(params)=>params.employee.Name},
    {field:'sex',headerName:'Sex',width:'90px',renderCell:(params)=>params.employee.Gender},
    {field:'Jan',headerName:'Jan'},
    {field:'Feb',headerName:'Feb'},
    {field:'Mar',headerName:'Mar'},
    {field:'Apr',headerName:'Apr'},
    {field:'May',headerName:'May'},
    {field:'Jun',headerName:'Jun'},
    {field:'Jul',headerName:'Jul'},
    {field:'Aug',headerName:'Aug'},
    {field:'Sept',headerName:'Sept'},
    {field:'Oct',headerName:'Oct'},
    {field:'Nov',headerName:'Nov'},
    {field:'Dec',headerName:'Dec'},
    {field:'total',headerName:'Total Attn'},
    {field:'el',headerName:'EL'},
    {field:'cl',headerName:'CL'},
    {field:'fl',headerName:'FL'},
    {field:'leave',headerName:'Total'},
    {field:'Remarks',headerName:'Remarks', width:"100px"},
]

const leavebankcolumns = [
    {field:'Name',headerName:'Name',renderCell:(params)=>params.employee.Name},
    {field:'ac',headerName:'Bank A/C',renderCell:(params)=>params.employee.Ac},
    {field:'bank',headerName:'Bank Name',renderCell:(params)=>params.employee.Bank},
    {field:'branch',headerName:'Bank Branch',renderCell:(params)=>params.employee.Branch},
    {field:'net',headerName:'Net Amount',renderCell:(params)=>Math.ceil((params.rate.basic + params.rate.da) * params.leave)},
 
]
const leavepaycolumns = [
    {field:'Name',headerName:'Name',renderCell:(params)=>params.employee.Name},
    {field:'EmpId',headerName:'EmpId',width:'80px',renderCell:(params)=>params.employee.EmpId},
    {field:'Designation',headerName:'Designation',renderCell:(params)=>params.employee.DesignationDetails.Name},
    {field:'leave',headerName:'Total'},
    {field:'unit',headerName:'Units Work Done'},
    {field:'Basic',headerName:'Basic',renderCell:(params)=>(params.rate.basic).toFixed(2)},
    {field:'Da',headerName:'Da',renderCell:(params)=>(params.rate.da).toFixed(2)},
    {field:'overtime',headerName:'Over Time'},
    {field:'othercash',headerName:'Earned Other cash Payment'},
    {field:'Total',headerName:'Total',renderCell:(params)=>Math.ceil((params.rate.basic + params.rate.da) * params.leave)},
    {field:'Pf',headerName:'PF'},
    {field:'Esic',headerName:'ESIC'},
    {field:'Others',headerName:'Others'},
    {field:'net',headerName:'Net Amount Paid',renderCell:(params)=>((params.rate.basic + params.rate.da) * params.leave).toFixed},
    {field:'sig',headerName:'Sig/Thumb Impression Work Man'},
    {field:'Initial',headerName:'Initial of Cont. or His Represent'},
    {field:'cont',headerName:'Signature of Cont. or his Represnt'},
]



function LeaveRegister() {
    const {control, handleSubmit, formState: { errors } } = useForm()
    const { data, error, loading,postRequest } = usePost('/leave/')
    const  { LeavePaySlip } = useImportExport("P")
    const [EmpId,setEmpId] = useState(0)
    const [ledger,setLedger] = useState(null)
    const onSubmit = (data)=>{
        console.log(data)
        const formattedData = {
            ...data,
            dateRange: {
              from: format(new Date(data.dateRange.from), 'yyyy-MM-dd'),
              to: format(new Date(data.dateRange.to), 'yyyy-MM-dd'),
            },
          };
        
        // getRequest(`/getattendancereport/${month}/${year}/`)
        
        postRequest(formattedData)
    }
    const LeaveLedger = ()=>{
      return <div className='flex items-center gap-4 p-4'>

         <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                  <th  className="px-3 border-2 py-3">Year</th>
                  <th  className="px-3 border-2 py-3">EL</th>
                  <th  className="px-3 border-2 py-3">CL</th>
                  <th  className="px-3 border-2 py-3">FL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-2 p-1 text-nowrap">Jan-{ledger?.[0].year}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].Janeltaken}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].Jancltaken}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].Janfltaken}</td>
              </tr>
              <tr>
                <td className="border-2 p-1 text-nowrap">Feb-{ledger?.[0].year}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].Febeltaken}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].Febcltaken}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].Febfltaken}</td>
              </tr>
              <tr>
                <td className="border-2 p-1 text-nowrap">Mar-{ledger?.[0].year}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].Mareltaken}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].Marcltaken}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].Marfltaken}</td>
              </tr>
              <tr>
                <td className="border-2 p-1 text-nowrap">Apr-{ledger?.[0].year}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].Apreltaken}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].Aprcltaken}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].Aprfltaken}</td>
              </tr>
              <tr>
                <td className="border-2 p-1 text-nowrap">May-{ledger?.[0].year}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].Mayeltaken}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].Maycltaken}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].Mayfltaken}</td>
              </tr>
              <tr>
                <td className="border-2 p-1 text-nowrap">Jun-{ledger?.[0].year}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].Juneltaken}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].Juncltaken}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].Junfltaken}</td>
              </tr>
              <tr>
                <td className="border-2 p-1 text-nowrap">Jul-{ledger?.[0].year}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].Juleltaken}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].Julcltaken}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].Julfltaken}</td>
              </tr>
              <tr>
                <td className="border-2 p-1 text-nowrap">Aug-{ledger?.[0].year}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].Augeltaken}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].Augcltaken}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].Augfltaken}</td>
              </tr>
              <tr>
                <td className="border-2 p-1 text-nowrap">Sept-{ledger?.[0].year}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].Septeltaken}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].Septcltaken}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].Septfltaken}</td>
              </tr>
              <tr>
                <td className="border-2 p-1 text-nowrap">Oct-{ledger?.[0].year}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].Octeltaken}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].Octcltaken}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].Octfltaken}</td>
              </tr>
              <tr>
                <td className="border-2 p-1 text-nowrap">Nov-{ledger?.[0].year}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].Noveltaken}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].Novcltaken}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].Novfltaken}</td>
              </tr>
              <tr>
                <td className="border-2 p-1 text-nowrap">Dec-{ledger?.[0].year}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].Deceltaken}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].Deccltaken}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].Decfltaken}</td>
              </tr>
              <tr>
                <td className="border-2 p-1 text-nowrap">Total</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].eltaken}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].cltaken}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].fltaken}</td>
              </tr>

            </tbody>
          </table>


          <table className="w-full  text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                  <th  className="px-3 border-2 py-3">Leave</th>
                  <th  className="px-3 border-2 py-3">EL</th>
                  <th  className="px-3 border-2 py-3">CL</th>
                  <th  className="px-3 border-2 py-3">FL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-2 p-1 text-nowrap">Earned</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].el}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].cl}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].fl}</td>
              </tr>
              <tr>
                <td className="border-2 p-1 text-nowrap">Paid</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].eltaken}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].cltaken}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].fltaken}</td>
              </tr>
              <tr>
                <td className="border-2 p-1 text-nowrap">Balance</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].elbalance}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].clbalance}</td>
                <td className="border-2 p-1 text-nowrap">{ledger?.[0].flbalance}</td>
              </tr>

            </tbody>
          </table>
      </div>
    }
    const FindLeaveLedger = ()=>{
  
      const employee = data?.leaveregister.filter(item=>item.employee.EmpId === String(EmpId))
      setLedger(employee)
      console.log("employee ledger is ",employee)
      
    }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-2'>
            <div className='w-full border-2 flex gap-4 md:flex-row sm:flex-col sm:justify-start sm:items-start md:items-center sm:p-2 md:justify-center'>
                <Controller
                    name="Site"
                    defaultValue="" // Initial value can be set here
                    control={control}
                    
                    render={({ field, fieldState: { error } }) => {
                        const { onChange, value, ref } = field;
                    return (
                        <Master 
                        api = "/master/site/"
                        onValueChange={(newValue) => {onChange(newValue || null)
                  
                        }} 
                        value={value} name='Site' />
                    );
                    }}
                />
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">Date Range</label>
                <Controller
                    name="dateRange"  // Field name
                    control={control}
                    defaultValue={{
                        from: new Date().toISOString().slice(0, 10),
                        to: addDays(new Date().toISOString().slice(0, 10), 20),
                    }}
                    render={({ field: { value, onChange } }) => (
                        <CustomCalendar date={value} setDate={onChange} />
                    )}
                    />
                   <Button type="submit" className=''>Submit</Button>
                
      
            </div>
        </form>
        <div className='w-full mt-2'>
        <Tabs defaultValue="leavechecklist" className="w-full">
            <TabsList className="flx gap-2">
                <TabsTrigger value="leavechecklist">Leave CheckList</TabsTrigger>
                <TabsTrigger value="leavepayregister">Leave Pay Register</TabsTrigger>
                <TabsTrigger value="leaveledger">Leave Ledger</TabsTrigger>
                <TabsTrigger value="leavepayslip">Leave Pay Slip</TabsTrigger>
                <TabsTrigger value="leavebankregister">Leave Bank Register</TabsTrigger>

            </TabsList>
            <TabsContent value="leavechecklist">
            {loading?"Loading......": data?.leaveregister?.length?(<DataGrid 
              heading="Leave Check List"
              columns={leaveCheckListcolumns} 
              row={data?.leaveregister} 
      
             

              />):(
                <div>No data available</div>
              )}
            </TabsContent>
            <TabsContent value="leavepayregister">
            {loading?"Loading......": data?.leaveregister?.length?(<DataGrid 
              heading="Leave Pay Register"
              columns={leavepaycolumns} 
              row={data?.leaveregister} 
      
             

              />):(
                <div>No data available</div>
              )}
            </TabsContent>
            <TabsContent value="leaveledger">
            <div className='flex items-center gap-2 justify-center '>  <Label>EmpId</Label>
              <Input type="text" className="w-40" onChange={(e)=>setEmpId(e.target.value)} />
              <Button onClick={FindLeaveLedger}>Ok</Button>
            </div>
            {ledger?.length?<LeaveLedger />:<div></div>}
          
            </TabsContent>
            <TabsContent value="leavepayslip">
            {loading?"Loading......": data?.leaveregister?.length?(<Button onClick={()=>LeavePaySlip(data?.leaveregister)} >Download</Button>):(
                <div>No data available</div>
              )}
            </TabsContent>
            <TabsContent value="leavebankregister">
            {loading?"Loading......": data?.leaveregister?.length?(<DataGrid 
              heading="Leave Bank Register"
              columns={leavebankcolumns} 
              row={data?.leaveregister} 
      
             

              />):(
                <div>No data available</div>
              )}
            </TabsContent>
            
        </Tabs>

        
        </div>
    </div>
  )
}

export default LeaveRegister