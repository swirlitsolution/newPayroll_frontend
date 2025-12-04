import React from 'react'
import useRequest from '../../hooks/useRequest'
import DataGrid from '../custom/DataGrid'
import {Plus, Upload } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const columns = [
    {field:'Site',headerName:'Site',renderCell:(params)=>params?.SiteDetails?.name},
    {field:'PfApplicable',headerName:'PF Applicable',renderCell:(params)=>params?.PfApplicable?"Yes":"No"},
    {field:'EsiApplicable',headerName:'ESIC Applicable',renderCell:(params)=>params?.EsiApplicable?"Yes":"No"},
    {field:'PrFTax',headerName:'PRF Tax Applicable',renderCell:(params)=>params?.PrFTax?"Yes":"No"},
    {field:'AttendanceAllow',headerName:'Attend Allow',renderCell:(params)=>params?.AttendanceAllow?"Yes":"No"},
    {field:'OtApplicable',headerName:'Email',renderCell:(params)=>params?.OtApplicable?"Yes":"No"},
    {field:'MrOtApplicable',headerName:'MR OT Applicable',renderCell:(params)=>params?.MrOtApplicable?"Yes":"No"},
    {field:'AllowanceAsPer',headerName:'Allowance As Per',renderCell:(params)=>params?.AllowanceAsPer?"Yes":"No"},
    {field:'PfLimitApplicable',headerName:'PF Limit Applicable',renderCell:(params)=>params?.PfLimitApplicable?"Yes":"No"},
    {field:'EsicLimitApplicable',headerName:'ESIC Limit Applicable',renderCell:(params)=>params?.EsicLimitApplicable?"Yes":"No"},
    {field:'PfLimit',headerName:'PF Limit',renderCell:(params)=>params?.PfLimit},
    {field:'EsicLimit',headerName:'ESIC Limit',renderCell:(params)=>params?.EsicLimit},
   ] 

function SiteConfig() {
    const {data, error, loading, getRequest } = useRequest("/master/siteconfig/")

    const navigate = useNavigate();
    const handleRowClicked = (params)=>{
        console.log(params)
        navigate(`/newsiteconfig?id=${params.id}`);
      }
    return (
          <div className='flex flex-col gap-2 p-1'>
              <div className='mt-4 mr-2'>
                  <span className='flex gap-2 float-right'>
                  <NavLink to="/newsiteconfig" className=" bg-gray-50 rounded-lg shadow p-2 hover:bg-gray-200">
                      <div className='flex gap-2'><Plus /> Add</div>
                  </NavLink>
              
              
                  </span>
              </div>
          
             {loading?"Loading......": data?.length?(<DataGrid 
                  heading="Site Configeration"
                  columns={columns} 
                  row={data} 
          
                  rowClicked={handleRowClicked}
      
                  />):(
                    <div>No data available</div>
                  )}
          </div>
        )
}

export default SiteConfig