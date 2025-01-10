import React from 'react'
import usePost from '../../hooks/usePost'
import DataGrid from '../custom/DataGrid'
import useRequest from '../../hooks/useRequest'


const leavecol = [
    {field:'applydate',headerName:'Applied'},
    {field:'leavefrom',headerName:'From'},
    {field:'leaveto',headerName:'To'},
    {field:'reason',headerName:'Reason'},
    {field:'status',headerName:'Status',renderCell:(params)=>{
        return <tr>
            <td>{params.approved?
                                <span 
                                    className='p-2 rounded-md bg-green-500 text-white'>
                                    Approved
                                </span>:params.rejected?
                                <span className='p-2 rounded-md bg-red-500 text-white'>Rejected</span>:<span className='p-2 rounded-md outline-yellow-500'>Pending</span>}</td>
        </tr>
    }},
]
function NewLeave() {
    const { data, error, loading,postRequest } = useRequest('/master/leave/')
  return (
    <div className='w-full flex justify-between'>
        <div className='w-[80%]'>
        {loading?"Loading......": data?.length?(<DataGrid 
              heading="Leave Check List"
              columns={leavecol} 
              row={data} 
      
             

              />):(
                <div>No data available</div>
              )}
        </div> 
        <div className='w-[20%]'>
            
        </div> 
    </div>
  )
}

export default NewLeave