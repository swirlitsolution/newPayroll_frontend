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
const bonusCheckListcolumns = [
    {field:'id',headerName:'TrnId',width:'80px'},
    {field:'EmpId',headerName:'EmpId',width:'80px',renderCell:(params)=>params.employee.EmpId},
    {field:'Name',headerName:'Name',renderCell:(params)=>params.employee.Name},
    {field:'sex',headerName:'Sex',width:'90px',renderCell:(params)=>params.employee.Gender},
    {field:'Apr',headerName:'Apr',renderCell:(params)=>{
      return <tr>
        <tr className='border-b-2 w-full'>
          <td>{params.Apr}</td>
        </tr>
        <tr className='border-b-2 w-full'>
          <td>
            {params.AprGross}
          </td>
        </tr>
      </tr>
    }},
    {field:'May',headerName:'May',renderCell:(params)=>{
      return <tr>
        <tr className='border-b-2 w-full'>
          <td>{params.May}</td>
        </tr>
        <tr className='border-b-2 w-full'>
          <td>
            {params.MayGross}
          </td>
        </tr>
      </tr>
    }},
    {field:'Jun',headerName:'Jun',renderCell:(params)=>{
      return <tr>
        <tr className='border-b-2 w-full'>
          <td>{params.Jun}</td>
        </tr>
        <tr className='border-b-2 w-full'>
          <td>
            {params.JunGross}
          </td>
        </tr>
      </tr>
    }},
    {field:'Jul',headerName:'Jul',renderCell:(params)=>{
      return <tr>
        <tr className='border-b-2 w-full'>
          <td>{params.Jul}</td>
        </tr>
        <tr className='border-b-2 w-full'>
          <td>
            {params.JulGross}
          </td>
        </tr>
      </tr>
    }},
    {field:'Aug',headerName:'Aug',renderCell:(params)=>{
      return <tr>
        <tr className='border-b-2 w-full'>
          <td>{params.Aug}</td>
        </tr>
        <tr className='border-b-2 w-full'>
          <td>
            {params.AugGross}
          </td>
        </tr>
      </tr>
    }},
    {field:'Sept',headerName:'Sept',renderCell:(params)=>{
      return <tr>
        <tr className='border-b-2 w-full'>
          <td>{params.Sept}</td>
        </tr>
        <tr className='border-b-2 w-full'>
          <td>
            {params.SeptGross}
          </td>
        </tr>
      </tr>
    }},
    {field:'Oct',headerName:'Oct',renderCell:(params)=>{
      return <tr>
        <tr className='border-b-2 w-full'>
          <td>{params.Oct}</td>
        </tr>
        <tr className='border-b-2 w-full'>
          <td>
            {params.OctGross}
          </td>
        </tr>
      </tr>
    }},
    {field:'Nov',headerName:'Nov',renderCell:(params)=>{
      return <tr>
        <tr className='border-b-2 w-full'>
          <td>{params.Nov}</td>
      
        </tr>
        <tr className='border-b-2 w-full'>
          <td>
            {params.NovGross}
          </td>
        </tr>
      </tr>
    }},
    {field:'Dec',headerName:'Dec',renderCell:(params)=>{
      return <tr>
        <tr className='border-b-2 w-full'>
          <td>{params.Dec}</td>
        </tr>
        <tr className='border-b-2 w-full'>
          <td>
            {params.DecGross}
          </td>
        </tr>
      </tr>
    }},
    {field:'Jan',headerName:'Jan',renderCell:(params)=>{
      return <tr>
        <tr className='border-b-2 w-full'>
          <td>{params.Jan}</td>
        </tr>
        <tr className='border-b-2 w-full'>
          <td>
            {params.JanGross}
          </td>
        </tr>
      </tr>
    }},
    {field:'Feb',headerName:'Feb',renderCell:(params)=>{
      return <tr>
        <tr className='border-b-2 w-full'>
          <td>{params.Feb}</td>
        </tr>
        <tr className='border-b-2 w-full'>
          <td>
            {params.FebGross}
          </td>
        </tr>
      </tr>
    }},
    {field:'Mar',headerName:'Mar',renderCell:(params)=>{
      return <tr>
        <tr className='border-b-2 w-full'>
          <td>{params.Mar}</td>
        </tr>
        <tr className='border-b-2 w-full'>
          <td>
            {params.MarGross}
          </td>
        </tr>
      </tr>
    }},
    {field:'arear',headerName:'Arear'},
    {field:'TotalGross',headerName:'Total'},
    {field:'payrate',headerName:'Pay Rate',renderCell:(params)=>params.rate.basic + params.rate.da},
    {field:'total',headerName:'Day Worked'},
    {field:'Bonus',headerName:'Bonus Amt'},
]

const bonusRegistercolumns = [
  {field:'id',headerName:'TrnId',width:'80px'},
  {field:'Name',headerName:'Name',renderCell:(params)=>params.employee.Name},
  {field:'Father',headerName:'Father',width:'90px',renderCell:(params)=>params.employee.Father},
  {field:"completed",headerName:'Whther he has Combegining of the Accounting Year'}
]

function BonusRegister() {
  const {control, handleSubmit,register, formState: { errors } } = useForm()
    const { data, error, loading,postRequest } = usePost('/bonus/')
    const  { LeavePaySlip } = useImportExport("P")
  
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
    
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-2'>
            <div className='w-full border-2 flex gap-4 md:flex-row sm:flex-col sm:justify-start sm:items-start md:items-center sm:p-2 md:justify-center'>
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

                <label htmlFor='bonusper' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">Bonus %</label>
                <Input type='text' {...register("bonusper")} className='bg-white w-32'  id='bonusper' />
                
                   <Button type="submit" className=''>Submit</Button>
                
      
            </div>
        </form>
        <div className='w-full mt-2'>
        <Tabs defaultValue="bonuschecklist" className="w-full">
            <TabsList className="flx gap-2">
                <TabsTrigger value="bonuschecklist">Bonus CheckList</TabsTrigger>
                <TabsTrigger value="bonuspayregister">Bonus Pay Register</TabsTrigger>
                <TabsTrigger value="bonusledger">Bonus Ledger</TabsTrigger>
                <TabsTrigger value="bonuspayslip">Bonus Pay Slip</TabsTrigger>
                <TabsTrigger value="bonusbankregister">Bonus Bank Register</TabsTrigger>

            </TabsList>
            <TabsContent value="bonuschecklist">
            {loading?"Loading......": data?.bonusregister?.length?(<DataGrid 
              heading="Bonus Check List"
              columns={bonusCheckListcolumns} 
              row={data?.bonusregister} 
      
             

              />):(
                <div>No data available</div>
              )}
            </TabsContent>
            <TabsContent value="bonuspayregister">
            {loading?"Loading......": data?.bonusregister?.length?(<DataGrid 
              heading="Bonus Pay Register"
              columns={bonusRegistercolumns} 
              row={data?.bonusregister} 
      
             

              />):(
                <div>No data available</div>
              )}
            </TabsContent>
            <TabsContent value="bonusledger">
            {loading?"Loading......": data?.attendance?.length?(<DataGrid 
              heading="Leave Ledger"
              columns={slipcolumns} 
              row={data?.attendance} 
      
             

              />):(
                <div>No data available</div>
              )}
            </TabsContent>
            <TabsContent value="leavepayslip">
            {loading?"Loading......": data?.leaveregister?.length?(<Button onClick={()=>LeavePaySlip(data?.leaveregister)} >Download</Button>):(
                <div>No data available</div>
              )}
            </TabsContent>
            <TabsContent value="bonusbankregister">
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

export default BonusRegister