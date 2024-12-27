import React, { useEffect, useState } from 'react'
import DataGrid from '../custom/DataGrid'
import { Pen, Plus, Upload } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import useRequest from '../../hooks/useRequest'
import { useNavigate } from 'react-router-dom'
import ImportFile from './ImportFile'
import axios from 'axios'
import Cookies from 'universal-cookie'
import ApiImport from './ApiImport'

const columns = [
    {field:'id',headerName:'TrnId',width:'80px'},
    {field:'EmpId',headerName:'EmpId',width:'80px'},
    {field:'Name',headerName:'Name'},
    {field:'Father',headerName:'Father'},
    {field:'Site',headerName:'Site',renderCell:(params)=>params.SiteDetails.name},
    {field:'Department',headerName:'Department',renderCell:(params)=>params.DepartmentDetails.name},
    {field:'Designation',headerName:'Designation',renderCell:(params)=>params.DesignationDetails.name},
    {field:'Gang',headerName:'Gang',renderCell:(params)=>params.GangDetails.name},
    {field:'Email',headerName:'Email'},
    {field:'Aadhar',headerName:'Aadhar'}
   ] 


function Employeelist() {
    const [importFile,setImportFile] = useState(false)
    const [apiimport,setapiImport] = useState(false)
    const [rateImport,setRateImport] = useState(false)
    const { data, error, loading, getNextRequest,onlypatchRequest, getRequest} = useRequest("/master/employee/")
    const navigate = useNavigate();
    const [employeedata,setemployeedata] = useState(null)
    const cookies = new Cookies()
    const [employee,setEmployee] = useState("")
    const token = cookies.get('access')
    const handleRowClicked = (params)=>{
        console.log(params)
        navigate(`/employee/${params.id}`,{id:params.id});
      }
        const pageState = (direction) => {
          console.log("fetching page",direction)
        if (direction > 0 && data?.next) {
            getNextRequest(data.next);
        } else if (direction < 0 && data?.previous) {
            getNextRequest(data.previous);
        }
    };
    const postRequest = async (payload) => {
    
      console.log("data to save",payload)
      try {
        const response = await axios.post("/master/employee/", payload,
          {
              headers: {
                  'Authorization': `Bearer ${token}`
              },
              withCredentials: false
          }
        );
        console.log("post response",response)
        if(response.status === 201){
        
          console.log("created")
    
        
        
        }
      } catch (err) {
        console.error(err)
       
      
      } finally {
    console.log("employee created")
      }
    };
    const getemplist = async ()=>{
      const empurl = "http://127.0.0.1:8080/api/payroll/master/employee/"
      try {
        const response = await axios.get(empurl,
          {
              auth: {
              username: "global",
              password: "Kumar@123"
            },
              withCredentials: false
          }
        );
        console.log("get response",response)
        if(response?.data){
          console.log(response.data)
          const rate = []
          response.data.map((item)=>{
            onlypatchRequest(`/importrate/${item.Aadhar}/`,item.rate)
            setTimeout(()=>{
              console.log("waiting for response")
            },1000)
            rate.push(item.rate)
          })
          console.log(rate)
          setemployeedata(rate)
        }
      } catch (err) {
        console.error(err)
        
      } finally {
        console.log("fetched successed")
      }
    }
  return (
    <div className='flex flex-col gap-2 p-1'>
      <div className='mt-4 mr-2'>
          <span className='flex gap-2 float-right'>
            <NavLink to="/newemployee" className=" bg-gray-50 rounded-lg shadow p-2 hover:bg-gray-200">
              <div className='flex gap-2'><Plus /> Add</div>
            </NavLink>
      
              <div className='flex gap-2 bg-gray-50 rounded-lg shadow p-2 hover:bg-gray-200 cursor-pointer' 
              onClick={()=>{
                setImportFile(true)
                setRateImport(false)
                setapiImport(false)
                }}><Upload /> Import</div>
              <div 
              className='flex gap-2 bg-gray-50 rounded-lg shadow p-2 hover:bg-gray-200 cursor-pointer' 
              onClick={()=>{
                setImportFile(false)
                setapiImport(false)
                setRateImport(true)
              }}><Upload />Rate Import</div>
            <div className='flex gap-2 bg-gray-50 rounded-lg shadow p-2 hover:bg-gray-200 cursor-pointer' 
              onClick={()=>getemplist()}>
              <Upload /> Sync</div>
             
          </span>
      </div>
      
      {apiimport?<ApiImport heading="import employee"  
                    closeModel={()=>{
                      setImportFile(false)
                      setapiImport(false)
                      }} 
                      newItem={true} />:
                      <></>
                      }
      {importFile?<ImportFile heading="import employee"  
                    closeModel={()=>{
                      setImportFile(false)
                      setRateImport(false)
                      }} 
                      newItem={true}
                    api="/master/employee/" / >:<></>}
      {rateImport?<ImportFile heading="import rate"  
                    closeModel={()=>{
                      setImportFile(false)
                      setRateImport(false)
                      }} 
                      newItem={false}
                    api="/master/rate/" / >:<></>}
        {loading?"Loading......": data?.results?.length?(<DataGrid 
              heading="Employees"
              columns={columns} 
              row={data?.results} 
      
              rowClicked={handleRowClicked}
              Increament={pageState}
              Decreament={pageState}

              />):(
                <div>No data available</div>
              )}
    </div>
  )
}

export default Employeelist