import React, { useEffect, useState } from 'react'
import DataGrid from '../custom/DataGrid'
import useRequest from '../../hooks/useRequest'
import { useNavigate } from 'react-router-dom'
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
   ] 

function Employees() {
    const { data, error, loading, getNextRequest} = useRequest("/master/employee/") 
    const navigate = useNavigate();
    const handleRowClicked = (params)=>{
        console.log(params)
        navigate(`/createuser/${params.id}`,{id:params.id});
      }
        const pageState = (direction) => {
          console.log("fetching page",direction)
        if (direction > 0 && data?.next) {
            getNextRequest(data.next);
        } else if (direction < 0 && data?.previous) {
            getNextRequest(data.previous);
        }
    };

    return (
        <div className='flex flex-col gap-2 p-1'>
       
          {loading?"Loading......": data?.length?(<DataGrid 
                heading="Select Employee"
                columns={columns} 
                row={data} 
        
                rowClicked={handleRowClicked}
                Increament={pageState}
                Decreament={pageState}
    
                />):(
                  <div>No data available</div>
                )}
        </div>
      )
    }

export default Employees