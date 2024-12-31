import React, { useEffect, useState } from 'react'
import MyDataGrid from '../custom/MyDataGrid'
import { useForm  } from "react-hook-form";
  
import MarkAttendance from '../custom/MarkAttendance';
import usePost from '../../hooks/usePost';
import { Button } from '../ui/button';
import { toast } from 'react-toastify';
import { Upload } from 'lucide-react';
import ImportAttendance from '../employee/ImportAttendance';


const columns = [
    {field:'id',headerName:'EmpID',width:'50px', renderCell:(param)=>param.employee.EmpId},
    {field:'Name',headerName:"Employee", renderCell:(param)=>param.employee.Name},
    {field:'Site',headerName:"Site", renderCell:(param)=>param.employee.SiteDetails.name},
    {field:'Status',headerName:'Status', renderCell:(param)=>param.attendance_status.status},
    {field:'Ot',headerName:'OT', renderCell:(param)=>param.attendance_status.ot},
    {field:'extrahour',headerName:'Extra', renderCell:(param)=>param.attendance_status.extrahour},
   ] 


function Attendance(props) {
  const {control, formState: { errors } } = useForm()
    const { data, error, loading, getRequest} = usePost("/getcurrentattendance/")
    const [mark,setMark] = useState(false)
    const [importFile,setImportFile] = useState(false)
    const [permitno,setPermitNo] = useState(0)
    const [row,setRow] = useState(null)
    const [currentDate,setCurrentDate] = useState(null)
    const showDialog = ()=>{
        setMark(!mark)
    }

    const handleRowClicked = (params)=>{
        console.log(params)
        setRow(params)
        showDialog()
      }

  const SavePermitNo = ()=>{
    console.log("permit no is ",permitno)
    localStorage.setItem('permitno', permitno);
    const permit = localStorage.getItem('permitno')
    if(permit){
      toast.success("Saved permit no successfully")
    }
    else{
      toast.warning("Not saved Try again")
    }
  }
    useEffect(()=>{
      const savedData = localStorage.getItem('permitno');

      const getEmployee = (data)=>{
        console.log(data)
        if (savedData) {
          setPermitNo(savedData)
        }
        const today = new Date();
        const formattedDate = today.toISOString().slice(0, 10); // YYYY-MM-DD format
        setCurrentDate(today)
        getRequest(`/getcurrentattendance/${formattedDate}/`)
    }
    getEmployee()
    },[])
  return (
    <div className="flex flex-col overflow-x-hidden overflow-y-auto gap-2 mt-2">
        <div className="bg-white rounded-lg shadow p-2 border-2">
          <div className="flex justify-between items-center gap-2">
            <div className=' text-center'>
              <h3 className="font-bold">{props?.heading.toUpperCase()}</h3>

            </div>
            <div className='flex gap-2 items-center'>
              <label htmlFor="permitno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">Permit No</label>
              <input type="text" value={permitno} onChange={(e)=>setPermitNo(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="permitno" />
                  <Button onClick={SavePermitNo} >Save</Button>
              
            </div>
            <div className='flex gap-2 bg-gray-50 rounded-lg shadow p-2 hover:bg-gray-200 cursor-pointer' 
              onClick={()=>{
                setImportFile(true)
                }}><Upload /> Import</div>
            <span>{currentDate?.getDate() + "-"+ parseInt(currentDate?.getMonth()+1) +"-"+currentDate?.getFullYear()}</span>
      
          </div>
        </div>
       
        <div className='flex gap-2 w-full'>
        {importFile?<ImportAttendance heading="import attendance"  
                    closeModel={()=>{
                      setImportFile(false)
                      }} 
                      newItem={true}
                    api="/importattendance/" / >:<></>}
       <div className="  w-[100%] ">
       {loading?"Loading......": data?.length? 
               ( <MyDataGrid 
                heading="Employees"
                columns={columns} 
                row={data} 
                rowClicked={handleRowClicked}
                pageInfo={true}
                checkBoxSelection={true}
                totalCounts={data?.count || 0}
                />  ):(
              <div>No data available</div>)}
            </div>
      
            {
                mark?
                    <MarkAttendance showDialog={showDialog} rowData={row} />
                    :""
            }
        </div>
    </div>
  )
}

export default Attendance