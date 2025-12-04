
import useRequest from '../../hooks/useRequest'
import DataGrid from '../custom/DataGrid'
import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify'
import axios from 'axios'
const columns = [
    {field:'status',headerName:'Status',renderCell:(params)=>params.is_selected?"Selected":"Not Selected"},
    {field:'name',headerName:'Company Name',width:200},
    {field:'workNature',headerName:'Work Nature',width:200},
    {field:'contractEstablishment',headerName:'Contract Establishment',width:200},
    {field:'principleEmployer',headerName:'Principle Employer',width:200},
    
    {field:'address',headerName:'Address',width:300},
]
function SelectCompany() {
    const {data, loading,getRequest } = useRequest("api/company/details/list/")
    console.log("company data",data)

    const handleRowClicked = async (params)=>{
        console.log("You selected",params)
        const cookies = new Cookies();
            const token = cookies.get('access');
  
        try {
          const response = await axios.put(`api/update/company/details/${params?.id}/`, {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            }
          );
          if(response.status===200){
            toast.success(`${params?.name} selected successfully`)
          }
        } catch (err) {
          console.error(err)
          if(err.status === 400){
            const error = err.response.data
            Object.entries(error).map(([key, value]) => (toast.warning(`${key}  ${value}`)))
          }
            if(err.status===409){
                toast.warning(err.response.data.warning)
              }
        
        } finally {
          console.log("Selection attempt finished")
        }
    
    }
    useEffect(()=>{
        getRequest()
    },[])
  return (
    <div className='flex flex-col gap-2 p-1'>
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

export default SelectCompany