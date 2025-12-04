import React from 'react'
import useRequest from '../../hooks/useRequest'
import DataGrid from '../custom/DataGrid'
import {Plus, Upload } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const columns = [
    {field:'id',headerName:'Id'},
    {field:'username',headerName:'Username',renderCell:(params)=>params.userdata.username},
    {field:'EmpId',headerName:'EmpId',renderCell:(params)=>params.employeedata.EmpId},
    {field:'Name',headerName:'Name',renderCell:(params)=>params.employeedata.Name},
    {field:'Site',headerName:'Site',renderCell:(params)=>params.employeedata.SiteDetails.name}
]


function UserManagement() {
    const {data, error, loading, getRequest } = useRequest("/api/user/profile/list/")
    const navigate = useNavigate();
    const handleRowClicked = (params)=>{
        console.log(params)
        navigate(`/updateuser/${params.userdata.id}`,{id:params.userdata.id});
    }
    return (
        <div className='flex flex-col gap-2 p-1'>
            <div className='mt-4 mr-2'>
                <span className='flex gap-2 float-right'>
                <NavLink to="/selectemployee" className=" bg-gray-50 rounded-lg shadow p-2 hover:bg-gray-200">
                    <div className='flex gap-2'><Plus /> Add</div>
                </NavLink>
            
            
                </span>
            </div>
        
           {loading?"Loading......": data?.length?(<DataGrid 
                heading="Users"
                columns={columns} 
                row={data} 
        
                rowClicked={handleRowClicked}
    
                />):(
                  <div>No data available</div>
                )}
        </div>
      )
    }

export default UserManagement