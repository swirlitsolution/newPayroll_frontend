import React from 'react'
import useRequest from '../../hooks/useRequest'
import { NavLink, useNavigate } from 'react-router-dom'
import DataGrid from '../custom/DataGrid'
import { Plus } from 'lucide-react'
const columns = [
    {field:'name',headerName:'Company Name',width:200},
    {field:'address',headerName:'Address',width:300},
    {field:'phone',headerName:'Phone'},
    {field:'email',headerName:'Email',width:200},
    {field:'gstin',headerName:'GSTIN'},
    {field:'cin',headerName:'CIN'},
    {field:'pan',headerName:'PAN'},
    {field:'workNature',headerName:'Work Nature',width:200},
    {field:'contractEstablishment',headerName:'Contract Establishment',width:200},
    {field:'principleEmployer',headerName:'Principle Employer',width:200},
]

function Companies() {
    const {data, error, loading, getRequest } = useRequest("api/company/details/list/")
    console.log("company data",data)
    const navigate = useNavigate();
    const handleRowClicked = (params)=>{
        console.log(params)
        navigate(`/company/?id=${params?.id}`,{id:params.id});
    }
  return (
     <div className='flex flex-col gap-2 p-1'>
        <div className='mt-4 mr-2'>
            <span className='flex gap-2 float-right'>
            <NavLink to="/company" className=" bg-gray-50 rounded-lg shadow p-2 hover:bg-gray-200">
                <div className='flex gap-2'><Plus /> Add</div>
            </NavLink>
        
        
            </span>
        </div>

        {loading?"Loading......": data?.length?(<DataGrid 
            heading="Companies"
            columns={columns} 
            row={data} 

            rowClicked={handleRowClicked}

            />):(
                <div>No data available</div>
            )}
    </div>
  )
}

export default Companies