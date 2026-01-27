import React, { useEffect, useState } from 'react'
import { useForm,Controller  } from "react-hook-form";
import usePost from '../../hooks/usePost';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import Master from '../master/Master';
import { X } from 'lucide-react';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { set } from 'date-fns';
import { useEmployee } from '../../hooks/useEmployee';
import { useSelector } from 'react-redux';
import AdvanceRegister from './AdvanceRegister';
import DamageRegister from './DamageRegister';
import WorkManRegister from './WorkManRegister';
import EmployeeMentCard from './EmployeeMentCard';
import FineRegister from './FineRegister';
import ServiceCertificate from './ServiceCertificate';
import OvertimeRegister from './OvertimeRegister';
import ReportHeader from './ReportHeader';

function Misc() {
    const {control,watch, register,handleSubmit, formState: { errors } } = useForm()
    // const { data, error, loading,postRequest,getRequest } = usePost('/leave/')
    const [disabled,setDisabled] = useState(false)
    const [close,setClose] = useState(false)
    const [afterFilter,setAfterFilter] = useState([])
    const [selectedEmployee,setSelectedEmployee] = useState([])
    const [wait,setwait] = useState(false)
    const { data, isLoading, error } = useEmployee()
    const [employees,setEmployees] = useState(null)
    const {company} = useSelector(state => state.Company);
    const [formdata,setFormData] = useState(null)

    const handleCard = ()=>{
        setClose(!close)
    }
    const filterEmployee = (formdata)=>{
      setwait(true)
      toast.info("Preparing data for your Report...")
      if(formdata.month){
        const filtermonth = formdata.month.split("-")[1]
        const filteryear = formdata.month.split("-")[0]
        
        if(formdata.type === 'all'){
          setAfterFilter( data?.filter((emp)=>{
            const dojmonth = emp?.Doj?.split("-")[1]
            const doyear = emp?.Doj?.split("-")[0]
              // console.log("filteryear",filteryear,"dojyear",doyear,"filtermonth",filtermonth,"dojmonth",dojmonth,filteryear === doyear && filtermonth === dojmonth)
              return (filtermonth === dojmonth && filteryear === doyear)

          })
        )
        setwait(false)
        }
        else if(formdata.type === 'sitewise'){
            setAfterFilter( 
              data?.filter((emp)=>{
              const dojmonth = emp?.Doj?.split("-")[1]
              const doyear = emp?.Doj?.split("-")[0]
                // console.log("filteryear",filteryear,"dojyear",doyear,"filtermonth",filtermonth,"dojmonth",dojmonth,filteryear === doyear && filtermonth === dojmonth)
                return (emp.SiteDetails.name === data.Site && filtermonth === dojmonth && filteryear === doyear)

              })
            )
            setwait(false)
        }
        else if(formdata.type === 'selected'){
          console.log("selected employee = ",afterFilter)
          setAfterFilter( 
            afterFilter?.filter((emp)=>{
              const dojmonth = emp?.Doj?.split("-")[1]
              const doyear = emp?.Doj?.split("-")[0]
              // console.log("filteryear",filteryear,"dojyear",doyear,"filtermonth",filtermonth,"dojmonth",dojmonth,filteryear === doyear && filtermonth === dojmonth)
          
              return (filtermonth === dojmonth && filteryear === doyear)
            })
          )
          setwait(false)
        }
      }
      else{
         if(formdata.type === 'all'){
          setAfterFilter(data)
          setwait(false)
        }
        else if(formdata.type === 'sitewise'){
            setAfterFilter( 
              data?.filter((emp)=>{
      
                // console.log("filteryear",filteryear,"dojyear",doyear,"filtermonth",filtermonth,"dojmonth",dojmonth,filteryear === doyear && filtermonth === dojmonth)
                return emp.SiteDetails.name === data.Site 

              })
            )
            setwait(false)
        }
        else{
          console.log("selected employee = ",afterFilter,afterFilter.length)
        }
      }
    }
    const onSubmit = (formdata)=>{
            console.log("data is ",formdata)
            filterEmployee(formdata)
            const site = formdata.site;
            const month = formdata.month.split('-')[1]
            const year = formdata.month.split('-')[0]
            
              
            // if(formdata.register === "advanceRegister"){
            //     generateAdvancePDF()
            // }
            // else if(formdata.register === "damageRegister"){
            //     generateDamagePDF()
            // }
            // else if(formdata.register === "employeementCard"){
            //     generateEmployeementCardPDF(month)
            // }
            // else if(formdata.register === "workmanregister"){
            //     generateWorkManRegister()
            // }
            // else if(formdata.register === "fineRegister"){
            //     generateFineRegister()
            // }
            // else if(formdata.register === "serviceCertificate"){
            //   generateServiceCertificate()
            // }
            // else if(formdata.register === "overTimeRegister"){
            //   generateOverTimePDF()
            // }
            // else {
            //   toast.warning("Please select any register to generate")
            // }
            
            // getRequest(`/getattendancereport/${month}/${year}/`)
            
            // postRequest(formattedData)
        }
      const handleChange = (event)=>{
        setFormData({
          ...formdata,
          [event.target.name]:event.target.value
        })
      }
    const SelectEmployee = ({heading,showMaster})=>{
        const handleOnChange = ()=>{
            const table = document.querySelector('table')
            const checkboxes = table.querySelectorAll('input[type="checkbox"]')
            const selected = []
            const selectedId = []
            checkboxes.forEach((checkbox) => {
                const id = checkbox.id
                if (checkbox.checked) {
                    const row = checkbox.closest('tr')
                    const empId = row.querySelector('td:nth-child(2)').textContent
                    const name = row.querySelector('td:nth-child(3)').textContent
                    selected.push({id,empId,name})
                    selectedId.push(empId)
                }
              })
            setAfterFilter( data?.filter(emp=> selectedId.includes(emp.EmpId)))
            setSelectedEmployee(selected)
            showMaster()
          }
        
        return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full " id="my-modal">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white h-[500px] ">
                <div className="mt-3 text-left">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-900">CREATE {heading.toUpperCase()}</h3>
                        <button className="text-gray-400 hover:text-gray-500" onClick={()=>showMaster()}>
                        <X className="h-6 w-6" />
                        </button>
                    </div>
                    <div className='w-full h-[350px] overflow-y-auto'>
                    <table className="w-full h-full  text-sm text-left text-gray-500 ">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th><Input type="checkbox" /></th>
                                <th  className="px-3 border-2 py-3">EmpId</th>
                                <th  className="px-3 border-2 py-3">Name</th>
                            </tr>
                          </thead>
                          <tbody className='h-[350px]' >
                           {data?.length>0?data.map((item)=>(
                            <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                                <td><Input type="checkbox" id={item.id} /></td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.EmpId}</td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.Name}</td>
                            </tr>
                            
                           ))
                           :<tr className="bg-white border-b hover:bg-gray-50">
                                <td colSpan={3} className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">No Data</td>
                            </tr>
                           }
                            
                          </tbody>
                        </table>
                    </div>
                    
                             
                    <div className='flex gap-2 mt-2'>
                
                   
                    <Button  onClick={handleOnChange} >Done</Button>
                       
                
                    </div>
            
                </div>
            
            </div>
    </div>
    }
    useEffect(()=>{
      console.log("formdata changed",formdata,selectedEmployee)
      const filteremp = ()=>{
        let emp = null
         if(formdata?.month){
          const filtermonth = formdata.month.split("-")[1]
          const filteryear = formdata.month.split("-")[0]
          emp = data?.filter((item)=>{
            const dojmonth = item?.Doj?.split("-")[1]
            const doyear = item?.Doj?.split("-")[0]
            return (filtermonth === dojmonth && filteryear === doyear)
          })
          setEmployees(emp)
        }
        if(formdata?.type === 'sitewise' && formdata?.Site){
          setSelectedEmployee([])
        let emp = data?.filter((item)=>item?.SiteDetails?.name == formdata.Site)
        setEmployees(emp)
        }
        if(formdata?.type === 'all'){
          setEmployees(data)
        }
        if(formdata?.type === 'selected'){
          emp  = data?.filter((item)=> selectedEmployee.findIndex(sel=>sel.empId == item.EmpId) !== -1)
          setEmployees(emp)
        }
       
        
      }
      filteremp()
    },[formdata])
  return (
    <div>
    <ReportHeader />
    {close?<SelectEmployee heading="Misc" showMaster={handleCard} />:""}
    <div className='w-full flex flex-col justify-between'>
        <div className='w-full flex justify-center mt-2'>
            <div className='w-[500px] border-2 grid [grid-template-columns:50px 150px 50px 150px] p-2 text-start '>
              <div className='w-full grid grid-cols-4 col-span-4'>
                <label  
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                Date Range
                </label>
                <Input type="month" id="month" onChange={handleChange} name="month" className=' w-42 col-span-3' />
                <Input type="radio" onChange={handleChange} value="all" id="all" name="type"  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                
                  <label htmlFor='all' className="block cursor-pointer mb-2 col-span-3 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">All</label>
                  
                
                  <Input type="radio" onChange={handleChange}  value="sitewise"  name="type"  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                                    
                <Controller
                  name="Site"
                  defaultValue="" // Initial value can be set here
                  control={control}
                  
                  render={({ field, fieldState: { error } }) => {
                      const { onChange, value, ref } = field;
                  return (
                      <Master 
                      disabled={disabled}
                      api = "/master/site/"
                      className="w-full col-span-3"
                      onValueChange={(newValue) => {onChange(newValue || null)
                        setFormData({
                          ...formdata,
                          Site:newValue
                        })
                      }} 
                      value={value} name='Site' />
                  );
                  }}
                />
                <Input type="radio" onClick={handleCard}  onChange={handleChange} value="selected" id="selected"  name="type" className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                <label htmlFor='selected' className="block cursor-pointer col-span-3 mb-2 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">Selected</label>
            
              </div>
              <div className='flex flex-col'>
                <div className='flex justify-between text-start'>
                  <Input type="radio" id="odishaformat" name="format" onChange={handleChange} value="odishaformat"  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                  <label htmlFor='odishaformat' className="block cursor-pointer mb-2 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">Odisha Format</label>
                
                </div>
                <div className='flex justify-between'>
                  <Input type="radio" id="jharkhandformat" name="format" onChange={handleChange} value="jharkhandformat"  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                  <label htmlFor='jharkhandformat' className="block cursor-pointer mb-2 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">Jharkhand Format</label>
                </div>
                
              </div>
          
              <div className='grid grid-cols-2 gap-2 col-span-4'>
                  <AdvanceRegister 
                    company={company} 
                    employee={employees}  
                    format={formdata?.format}
                    month={formdata?.month}
                    />
                  <DamageRegister company={company} 
                    employee={employees} month={formdata?.month} />
                  <WorkManRegister company={company} 
                    employee={employees}  month={formdata?.month} />
                  <EmployeeMentCard company={company} 
                    employee={employees} month={formdata?.month}  />
                  <FineRegister company={company} 
                    employee={employees}  month={formdata?.month} />
                  <ServiceCertificate company={company} 
                    employee={employees}  month={formdata?.month} />
                  <OvertimeRegister company={company} 
                    employee={employees} month={formdata?.month} />
                </div>
            </div>
        </div>
    
    </div>
    
    </div>
  )
}

export default Misc