import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import Master from '../master/Master';
import { useForm,Controller  } from "react-hook-form";
import usePost from '../../hooks/usePost';
import { Button } from '../ui/button';
import { Label } from "@/components/ui/label"
import DataGrid from '../custom/DataGrid';
import { toast } from 'react-toastify';

const columns = [
    {field:'EmpId',headerName:'EmpId',width:'80px', renderCell:(params)=>params.employeeData.EmpId},
    {field:'Name',headerName:'Name', renderCell:(params)=>params.employeeData.Name},
    {field:'Site',headerName:'Site',renderCell:(params)=>params.employeeData.SiteDetails.name},
    {field:'Department',headerName:'Department',renderCell:(params)=>params.employeeData.DepartmentDetails.name},
    {field:'Designation',headerName:'Designation',renderCell:(params)=>params.employeeData.DesignationDetails.name},
    {field:'Gang',headerName:'Gang',renderCell:(params)=>params.employeeData.GangDetails.name},
    {field:'day1',headerName:'1',renderCell:(params)=>{
        return <span>{params.day1}{params.otday1?("/"+params.otday1):""}</span>}},
    {field:'day2',headerName:'2',renderCell:(params)=>{
        return  <span>{params.day2}{params.otday2?("/"+params.otday2):""}</span>}},
    {field:'day3',headerName:'3',renderCell:(params)=>{
        return <span>{params.day3}{params.otday3?("/"+params.otday3):""}</span>}},
    {field:'day4',headerName:'4',renderCell:(params)=>{
        return <span>{params.day4}{params.otday4?("/"+params.otday4):""}</span>}},
    {field:'day5',headerName:'5',renderCell:(params)=>{
        return <span>{params.day5}{params.otday5?("/"+params.otday5):""}</span>}},
    {field:'day6',headerName:'6',renderCell:(params)=>{
        return <span>{params.day6}{params.otday6?("/"+params.otday6):""}</span>}},
    {field:'day7',headerName:'7',renderCell:(params)=>{
        return <span>{params.day7}{params.otday7?("/"+params.otday7):""}</span>}},
    {field:'day8',headerName:'8',renderCell:(params)=>{
        return <span>{params.day8}{params.otday8?("/"+params.otday8):""}</span>}},
    {field:'day9',headerName:'9',renderCell:(params)=>{
        return <span>{params.day9}{params.otday9?("/"+params.otday9):""}</span>}},
    {field:'day10',headerName:'10',renderCell:(params)=>{
        return <span>{params.day10}{params.otday10?("/"+params.otday10):""}</span>}},
    {field:'day11',headerName:'11',renderCell:(params)=>{
        return <span>{params.day11}{params.otday11?("/"+params.otday11):""}</span>}},
    {field:'day12',headerName:'12',renderCell:(params)=>{
        return <span>{params.day12}{params.otday12?("/"+params.otday12):""}</span>}},
    {field:'day13',headerName:'13',renderCell:(params)=>{
        return <span>{params.day13}{params.otday13?("/"+params.otday13):""}</span>}},
    {field:'day14',headerName:'14',renderCell:(params)=>{
        return <span>{params.day14}{params.otday14?("/"+params.otday14):""}</span>}},
    {field:'day15',headerName:'15',renderCell:(params)=>{
        return <span>{params.day15}{params.otday15?("/"+params.otday15):""}</span>}},
    {field:'day16',headerName:'16',renderCell:(params)=>{
        return <span>{params.day16}{params.otday16?("/"+params.otday16):""}</span>}},
    {field:'day17',headerName:'17',renderCell:(params)=>{
        return <span>{params.day17}{params.otday17?("/"+params.otday17):""}</span>}},
    {field:'day18',headerName:'18',renderCell:(params)=>{
        return <span>{params.day18}{params.otday18?("/"+params.otday18):""}</span>}},
    {field:'day19',headerName:'19',renderCell:(params)=>{
        return <span>{params.day19}{params.otday19?("/"+params.otday19):""}</span>}},
    {field:'day20',headerName:'20',renderCell:(params)=>{
        return <span>{params.day20}{params.otday20?("/"+params.otday20):""}</span>}},
    {field:'day21',headerName:'21',renderCell:(params)=>{
        return <span>{params.day21}{params.otday21?("/"+params.otday21):""}</span>}},
    {field:'day22',headerName:'22',renderCell:(params)=>{
        return <span>{params.day22}{params.otday22?("/"+params.otday22):""}</span>}},
    {field:'day23',headerName:'23',renderCell:(params)=>{
        return <span>{params.day23}{params.otday23?("/"+params.otday23):""}</span>}},
    {field:'day24',headerName:'24',renderCell:(params)=>{
        return <span>{params.day24}{params.otday24?("/"+params.otday24):""}</span>}},
    {field:'day25',headerName:'25',renderCell:(params)=>{
        return <span>{params.day25}{params.otday25?("/"+params.otday25):""}</span>}},
    {field:'day26',headerName:'26',renderCell:(params)=>{
        return <span>{params.day26}{params.otday26?("/"+params.otday26):""}</span>}},
    {field:'day27',headerName:'27',renderCell:(params)=>{
        return <span>{params.day27}{params.otday27?("/"+params.otday27):""}</span>}},
    {field:'day28',headerName:'28',renderCell:(params)=>{
        return <span>{params.day28}{params.otday28?("/"+params.otday28):""}</span>}},
    {field:'day29',headerName:'29',renderCell:(params)=>{
        return <span>{params.day29}{params.otday29?("/"+params.otday29):""}</span>}},
    {field:'day30',headerName:'30',renderCell:(params)=>{
        return <span>{params.day30}{params.otday30?("/"+params.otday30):""}</span>}},
    {field:'day31',headerName:'31',renderCell:(params)=>{
        return <span>{params.day31}{params.otday31?("/"+params.otday31):""}</span>}},
    {field:'tpresent',headerName:'Present'},
    {field:'tpayable',headerName:'Payable'},
    {field:'tot',headerName:'OT'},
]
function AttendanceReport(props) {
    const {register,handleSubmit,control,watch, formState: { errors } } = useForm()
    const { data, loading,getRequest} = usePost("/markattendance/")
    const [download,setDownload] = useState(false)
    
    const handleRowClicked = (params)=>{
        console.log(params)

      }
    const onSubmit = (data)=>{
        console.log("attendance data",data)
        const splited_date = data.month.split("-")
        const year = splited_date[0]
        const month = splited_date[1]
        
        if(data.all){
            getRequest(`/getattendancereport/${month}/${year}/none/${data.all}/`)
        }
        else if(data.Site && data.month !== ""){
            getRequest(`/getattendancereport/${month}/${year}/${data.Site}/${data.all}/`)

        }
        else{
            toast.warning("Select the site and month")
        }
  
    }
    useEffect(()=>{
        if(data?.attendance?.length){
            setDownload(true)
        }
        else{
            setDownload(false)
        }
    },[data])
    return (
      <div className="flex flex-col overflow-x-hidden overflow-y-auto gap-2 mt-2">
          <div className="bg-white rounded-lg shadow p-2 border-2">
            <div className="flex justify-between items-center gap-2">
              <div className=' text-center'>
                <h3 className="font-bold">{props?.heading.toUpperCase()}</h3>
              </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex items-center space-x-4">
                <Label>All </Label>
                <Input type="checkbox" id="all"  {...register("all")}  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                                
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
                <input type="month"  id="month" {...register("month")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        
                <Button type='submit' >Ok</Button>
                </form>
                {
                    download?
                    <div className='border-2 rounded-md'>
                        <h3 className=' bg-slate-200 font-bold'>Download</h3>
                        <div className='flex gap-2 px-2'>
                            <a href={'https://backend.stcassociates.co.in/attendance/'+watch('Site')+'/'+watch('month')+"/download"} target='_blank'> Attendance</a>
             
                        </div>
               
                    </div>
                    :""
                   }
            </div>
          </div>
         
          <div className='flex gap-2 w-full'>
              <div className="  w-[100%] ">
              {loading?"Loading......": data?.attendance?.length? 
               ( <DataGrid 
                heading="Attendance"
                columns={columns} 
                row={data?.attendance} 
                rowClicked={handleRowClicked}
                exportlayout="l"
                />  )
                :(
              <div>No data available</div>)}
              </div>
          </div>
      </div>
    )
  }
export default AttendanceReport