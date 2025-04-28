import React, { useEffect, useState } from 'react'
import Master from '../master/Master';
import { Label } from "@/components/ui/label"
import { useForm,Controller  } from "react-hook-form";
import usePost from '../../hooks/usePost';
import { Button } from '../ui/button';
import DataGrid from '../custom/DataGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from 'react-toastify';
import useFlattendObject from '../../hooks/useFlattendObject';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';




const summarycolumns = [
    { field: 'EmpId', headerName: 'EmpId', width: '80px', renderCell: (params) => params.employeeData_EmpId },
    { field: 'Name', headerName: 'Name', renderCell: (params) => params.employeeData_Name },
    { field: 'day', headerName: 'Worked', width: '90px', renderCell: (params) => params.tpayable },
    { field: 'rate', headerName: 'Rate', renderCell: (params) => params.arate },
    { field: 'aamt', headerName: 'Actual Amt', renderCell: (params) => params.aamt.toFixed(2) },
    {field:'pf',headerName:'PF'},
    {field:'esic',headerName:'ESIC'},
    {field:'prftax',headerName:'PRF Tax'},
    {field:'advance',headerName:'Advance'},
    {field:'netamt',headerName:'Net Amt',renderCell:(params)=>(params.aamt - params.advance - params.prftax - params.pf - params.esic).toFixed(2)},
    {field:'restothr',headerName:'OT Hrs'},
    {field:'restotamt',headerName:'OT Amt'},
    { field: 'allownetamt', headerName: 'Allowance' },
    { field: 'othergrosstotal', headerName: 'Total',renderCell:(params)=>(params.aamt - (params.advance + params.prftax + params.pf + params.esic) + params.restotamt + params.allownetamt).toFixed(2) },
]

function PayrollSummery() {
    const {control,register,setValue, handleSubmit,reset, watch, formState: { errors } } = useForm()
    const { data, error, loading,getRequest } = usePost('')
    const [rowdata,setRowdata] = useState(null)
    const { flattenObject } = useFlattendObject()
    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const site = queryParams.get('site');
    const month = queryParams.get('month');
    const year = queryParams.get('year');
    console.log("payroll summary", { site, month, year });
    useEffect(() => {
        if (site && month && year) {
            getRequest(`/getattendancereport/${month}/${year}/${site}/`);
        }
    }, [site, month, year]);
  
    useEffect(()=>{
        console.log("get request",data)
        if(data?.attendance){
            const row = data?.attendance.map(item=>flattenObject(item)).sort((a,b)=>a.employeeData_Name - b.employeeData_Name)
            setRowdata(row)
        }
    },[data])
  return (
    <div>
    
  
        <div className='w-full mt-2'>
      
            {loading?"Loading......": rowdata?.length?(<DataGrid 
              heading={`Payroll Summary for ${site} ${month}-${year}`}
              columns={summarycolumns} 
              row={rowdata} 
              isPayrollSummary={true}     

              />):(
                <div>No data available</div>
              )}
         

        
        </div>
    </div>
  )
}

export default PayrollSummery