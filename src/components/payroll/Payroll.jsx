import  { useEffect, useState } from 'react'
import Master from '../master/Master';
import { Label } from "@/components/ui/label"
import { useForm,Controller  } from "react-hook-form";
import usePost from '../../hooks/usePost';
import { Button } from '../ui/button';
import DataGrid from '../custom/DataGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from 'react-toastify';
import useFlattendObject from '../../hooks/useFlattendObject';
import { Input } from '../ui/input';
import Company from '../settings/company';
import WageSlipPDF from './WagesSlip';
import useRequest from '../../hooks/useRequest';
import axios from 'axios';

 const payrollcolumns = [
    {field:'employeeData_EmpId',headerName:'EmpId',width:'80px'},
    {field:'employeeData_Name',headerName:'Name'},
    {field:'employeeData_SiteDetails_name',headerName:'Site'},
    {field:'day',headerName:'Worked',width:'90px',renderCell:(params)=>{
        return (
            <tr>
                <tr className='border-b-2'>
                    <td>P</td>
                    <td>{params.tpresent}</td>
                </tr>
               <tr className='border-b-2'>
                <td>NH</td>
                <td>{params.tnh + params.tpn}</td>
               </tr>
                <tr className='border-b-2'>
                    <td>L</td>
                    <td>{params.tel + params.tcl + params.tfl}</td>
                </tr>
                <tr className='border-b-2'>
                    
                    <td>Total</td>
                    <td>{params.tpayable}</td>
                </tr>
            </tr>
        )
    }},
    {field:'rate',headerName:'Rate',renderCell:(params)=>{
        return (
            <tr>
                <tr className='border-b-2'>
                 <td>B</td>
                    <td>{params.basicrate}</td>
                </tr>
                <tr className='border-b-2'>
                 <td>Da</td>
                    <td>{params.darate}</td>
                </tr>
                <tr className='border-b-2'>
                 <td>Total</td>
                    <td>{parseFloat(params.basicrate) + parseFloat(params.darate)}</td>
                </tr>
            </tr>
        )}},
    {field:'basic',headerName:'Basic'},
    {field:'da',headerName:'DA'},
    {field:'hraamt',headerName:'HRA'},
    {field:'attallow',headerName:'Other Cash'},
    {field:'tiscoothr',headerName:'OT Hrs'},
    {field:'mrpotamt',headerName:'OT Amt'},
    {field:'mrpallownetamt',headerName:'Other Allowance'},

    {field:'mrpgross',headerName:'Gross'},
    {field:'pf',headerName:'PF'},
    {field:'esic',headerName:'ESIC'},
    {field:'prftax',headerName:'PRF Tax'},
    {field:'advance',headerName:'Advance'},
    {field:'deduction',headerName:'Deduction'},
    {field:'mrpnetamt',headerName:'Net Amt'},
   
]

// day =  tpayable + tnhday as per request from nadim sir on 04-09-2025 for the site tata cummins





const summarycolumns = [
    { field: 'EmpId', headerName: 'EmpId', width: '80px', renderCell: (params) => params.employeeData_EmpId },
    { field: 'Name', headerName: 'Name', renderCell: (params) => params.employeeData_Name },
    { field: 'day', headerName: 'Worked', width: '90px', renderCell: (params) => params.tpayable },
    { field: 'rate', headerName: 'Rate', renderCell: (params) => params.arate },
    { field: 'aamt', headerName: 'Actual Amt', renderCell: (params) => params.aamt.toFixed(2) },
    {field:'restothr',headerName:'OT Hrs'},
    {field:'restotamt',headerName:'OT Amt'},
    { field: 'allownetamt', headerName: 'Allowance' },
    { field: 'othergrosstotal', headerName: 'Total' },
]

const pfcolumns = [
    { field: 'employeeData_EmpId', headerName: 'EmpId', width: '80px' },
    { field: 'employeeData_Uan', headerName: 'UAN' },
    { field: 'employeeData_Name', headerName: 'Name' },
    { field: 'bdaamt', headerName: 'EPF Wages', renderCell: (params)=> Math.round(params.bdaamt) },
    { field: 'epfaplamt', headerName: 'EPF Wages', renderCell: (params)=> Math.round(params.epfaplamt) },
    { field: 'epfaplamt', headerName: 'EPS Wages', renderCell: (params)=> Math.round(params.epfaplamt) },
    { field: 'epfaplamt', headerName: 'EDLI Wages', renderCell: (params)=> Math.round(params.epfaplamt) },
    { field: 'pf', headerName: 'PF', renderCell: (params)=> Math.round(params.pf) },
    {
        field: 'epf', headerName: 'EPF Amt', renderCell: (params) => {
            const value = Number(params.epfaplamt) * 0.0833; // Ensure pfaplamt is a number
            return isNaN(value) ? '0.00' :Math.round(value); // Format the result to 2 decimal places
        }
    },
    {
        field: 'ppf', headerName: 'PPF Amt', renderCell: (params) => {
            const value = Math.round(Number(params.pf)) - Math.round(Number(params.epfaplamt) * 0.0833);
            return isNaN(value) ? '0.00' : Math.round(value); // Fallback to '0.00' if the value is invalid
        }
    },
    { field: 'ncp', headerName: 'NCP Day', renderCell: (params) => (params.tholiday + params.tsunday + params.tel + params.tcl + params.tfl) },
]
const esiccolumns = [
    { field: 'employeeData_EmpId', headerName: 'EmpId', width: '80px' },
    { field: 'employeeData_Esic', headerName: 'ESIC'},
    { field: 'employeeData_Name', headerName: 'Name' },
    { field: 'tpayable', headerName: 'Days' },
    { field: 'mrpgross', headerName: 'ESIC_Cont_Amt' },
    { field: 'esic', headerName: 'ESIC Amt' },

]
const bankcolumns = [
    { field: 'EmpId', headerName: 'EmpId', width: '80px', renderCell: (params) => params.employeeData_EmpId },
    { field: 'Name', headerName: 'Name', renderCell: (params) => params.employeeData_Name },
    { field: 'mrpgross', headerName: 'Bank', renderCell: (params) => params.employeeData_Bank },
    { field: 'ifsc', headerName: 'IFSC', renderCell: (params) => params.employeeData_Ifsc },
    { field: 'ac', headerName: 'Ac/No', renderCell: (params) => params.employeeData_Ac },
    { field: 'mrpnetamt', headerName: 'Net Amt' },

]
const sumBankcolumns = [
    { field: 'EmpId', headerName: 'EmpId', width: '80px', renderCell: (params) => params.employeeData_EmpId },
    { field: 'Name', headerName: 'Name', renderCell: (params) => params.employeeData_Name },
    { field: 'mrpgross', headerName: 'Bank', renderCell: (params) => params.employeeData_Bank },
    { field: 'ifsc', headerName: 'IFSC', renderCell: (params) => params.employeeData_Ifsc },
    { field: 'ac', headerName: 'Ac/No', renderCell: (params) => params.employeeData_Ac },
    { field: 'othergrosstotal', headerName: 'Net Amt' },

]
function Payroll() {
    const {control,register,token, handleSubmit, watch, formState: { errors } } = useForm()
    const { data, loading,getRequest } = usePost('')
    const [company,setCompany] = useState(null)
    const [nh,setNh] = useState(0)
    const [download,setDownload] = useState(false)
    const [rowdata,setRowdata] = useState(null)
    const [odisha,setOdisha] = useState(false)
    const { flattenObject } = useFlattendObject()
    const [leave,setLeave] = useState(null)
    const slipcolumns = [
    {field:'EmpId',headerName:'EmpId',width:'80px',renderCell:(params)=>params.employeeData_EmpId},
    {field:'Name',headerName:'Name',renderCell:(params)=>params.employeeData_Name},
    {field:'day',headerName:'Worked',width:'90px',renderCell:(params)=>params.employeeData_SiteDetails_name=="TATA CUMMINS"?(params.tpayable + params.tnhday):params.tpayable},
    {field:'basic',headerName:'Basic'},
    {field:'da',headerName:'DA'},
    {field:'mrpgross',headerName:'Gross'},
    {field:'advance',headerName:'Advance'},
    {field:'deduction',headerName:'Deduction'},
    {field:'mrpnetamt',headerName:'Net Amt'},
    {field:'view',headerName:'View',renderCell:(params)=>{
        return <WageSlipPDF employees={[params]} odisha={odisha} data={company} />
    }},
 
]
    const leaveData = async(year)=>{
        getRequest(`/leave/?year=${year}`).then((response)=>{
            setLeave(response.data.leaveregister)
        }).catch((error)=>{
        })  
    }
    const companydata = async ()=>{
        getRequest('/api/get/company/details').then((response)=>{
          
            setCompany(response.data)
        }).catch((error)=>{
            console.log(error)
        })
            
    }
    const onSubmit = (data)=>{
     
        const splited_date = data.month.split("-")
        const year = splited_date[0]
        const month = splited_date[1]
        leaveData(year)
        if(data.all){
            getRequest(`/getattendancereport/${month}/${year}/none/${data.all}/`).then((response)=>{
        
                     if(response?.data?.attendance){
                        setDownload(true)
                        const row = response?.data?.attendance.map(item=>flattenObject(item))
                        const sortedData = row.sort((a, b) => {
                            if (a.employeeData_Name < b.employeeData_Name) {
                                return -1;
                            }
                            else if (a.employeeData_Name > b.employeeData_Name) {
                                return 1;
                            }
                        }
                        )
                        const leavefilteredData = sortedData.map((item)=>{
                            const leavedetails = leave?.filter((leaveitem)=>leaveitem.employee.EmpId === item.employeeData_EmpId)
                           
                            item.leavedetails = leavedetails
                            return item
                        })
                        setRowdata(leavefilteredData)
                       
                    }
                }).catch((error)=>{
                    console.log(error)
                })
        }
        else if(data.Site && data.month !== ""){
            getRequest(`/getattendancereport/${month}/${year}/${data.Site}/${data.all}/`).then((response)=>{
              
                     if(response?.data?.attendance){
                        setDownload(true)
                        const row = response?.data?.attendance.map(item=>flattenObject(item))
                        const sortedData = row.sort((a, b) => {
                            if (a.employeeData_Name < b.employeeData_Name) {
                                return -1;
                            }
                            else if (a.employeeData_Name > b.employeeData_Name) {
                                return 1;
                            }
                        }
                        )
                             const leavefilteredData = sortedData.map((item)=>{
                            const leavedetails = leave?.filter((leaveitem)=>leaveitem.employee.EmpId === item.employeeData_EmpId)
                       
                            item.leavedetails = leavedetails
                            return item
                        })
                        setRowdata(leavefilteredData)
                    }
                    else{
                        console.log("no data found")
                    }
                }).catch((error)=>{
                    console.log(error)
                })

        }
        else{
            toast.warning("Select the site and month")
        }
        // postRequest(data)
    }
    const getNhDays = (site)=>{
        const res = getRequest(`/master/nhday/?site=${site}`)
        res.then((response)=>{
          if(response.data.length){
            setNh(response.data[0].day)
          }
            else{
                setNh(0)
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    useEffect(()=>{
    
        companydata()
     
   
    },[])
  return (
    <div>
        
        <Company />
        <form onSubmit={handleSubmit(onSubmit)} className='mt-2'>
            <div className='w-full border-2 flex gap-4 md:flex-row sm:flex-col sm:justify-start sm:items-start md:items-center sm:p-2 md:justify-center'>
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
                    <Label htmlFor="month">Month</Label>
                    <input type="month"  id="month" {...register("month")} className="bg-gray-50 border w-52 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    <Button type="submit" className=''>Submit</Button>
                   {
                    download?
                    <div className='border-2 rounded-md'>
                        <h3 className=' bg-slate-200 font-bold'>Download</h3>
                        <div className='flex gap-2 px-2'>
                            <a href={'https://backend.stcassociates.co.in/wages/'+watch('Site')+'/'+watch('month')+"/download"} target='_blank'> Wages</a>
                            <a href={'https://backend.stcassociates.co.in/summary/'+watch('Site')+'/'+watch('month')+"/download"} target='_blank'>Summary</a>

                        </div>
               
                    </div>
                    :""
                   }
      
            </div>
        </form>
        <div className='w-full mt-2'>
        <Tabs defaultValue="payroll" className="w-full">
            <TabsList className="flx gap-2">
                <TabsTrigger value="payroll">Payroll</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="slip">Slip</TabsTrigger>
                <TabsTrigger value="p_statement">Bank</TabsTrigger>
                <TabsTrigger value="s_statement">Bank Other</TabsTrigger>
                <TabsTrigger value="pf">PF</TabsTrigger>
                <TabsTrigger value="esic">ESIC</TabsTrigger>
            </TabsList>
            <TabsContent value="payroll">
            {loading?"Loading......": rowdata?.length?(<DataGrid 
              heading="Payroll"
              columns={payrollcolumns} 
              row={rowdata} 
      
             

              />):(
                <div>No data available</div>
              )}
            </TabsContent>
            <TabsContent value="summary">
            {loading?"Loading......": rowdata?.length?(<DataGrid 
              heading="Payroll"
              columns={summarycolumns} 
              row={rowdata} 
              isPayrollSummary={true}     

              />):(
                <div>No data available</div>
              )}
            </TabsContent>
            <TabsContent value="slip">
            {loading?"Loading......": rowdata?.length?
            <div className='w-full '>
                <div className="flex justify-center items-center gap-4 flex-row p-2">
                      {/* <a href={'https://backend.stcassociates.co.in/bulkdownloadslip/'+watch('Site')+'/'+watch('month')+"/"+ watch('all') +"/"+(odisha?"odisha":"jharkhand")+"/"} target='_blank'> all</a> */}
                {/*
                for testing only
                */}
                
                 {/* <a href={'https://backend.stcassociates.co.in/bulkdownloadslip/'+watch('Site')+'/'+watch('month')+"/"+ watch('all') +"/"+(odisha?"odisha":"jharkhand")+"/"} target='_blank'> all</a> */}
                <Input type="checkbox" id="state" onClick={()=>setOdisha(!odisha)}  className='w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />

                <label htmlFor='state' className="cursor-pointer">Odisha</label>
                <WageSlipPDF employees={rowdata} odisha={odisha} data={company} />
                </div>
                <DataGrid 
              heading="Payroll slip"
              columns={slipcolumns} 
              row={rowdata} 
      
             

              />
              </div>:(
                <div>No data available</div>
              )}
            </TabsContent>
            <TabsContent value="p_statement">
            {loading?"Loading......": rowdata?.length?(<DataGrid 
              heading="Payroll Bank Statement"
              columns={bankcolumns} 
              row={rowdata} 
      
             

              />):(
                <div>No data available</div>
              )}
            </TabsContent>
            <TabsContent value="s_statement">
            {loading?"Loading......": rowdata?.length?(<DataGrid 
              heading="Summary Bank Statement"
              columns={sumBankcolumns} 
              row={rowdata} 
      
             

              />):(
                <div>No data available</div>
              )}
            </TabsContent>
            <TabsContent value="pf">
            {loading?"Loading......": rowdata?.length?(<DataGrid 
              heading="PF Report"
              columns={pfcolumns} 
              row={rowdata} 
      
             

              />):(
                <div>No data available</div>
              )}
            </TabsContent>
            <TabsContent value="esic">
            {loading?"Loading......": rowdata?.length?(<DataGrid 
              heading="ESIC Report"
              columns={esiccolumns} 
              row={rowdata} 
      
             

              />):(
                <div>No data available</div>
              )}
            </TabsContent>
            
        </Tabs>

        
        </div>
    </div>
  )
}

export default Payroll