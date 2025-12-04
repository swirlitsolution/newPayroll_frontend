import React, { useEffect, useState } from 'react'
import useRequest from '../../hooks/useRequest'


function Allowance({id,name}) {
    const [checked,setChecked] = useState(false)
    const { data, error, loading, onlypatchRequest} = useRequest("/master/mrallow/?siteid="+id);
    const handleChange = (e)=>{
        const enable = e.target.checked
        console.log("checked",enable)
        setChecked(enable)
        onlypatchRequest(`/master/mrallow/${id}/`,{enable:enable})
    }
    console.log("data of site",name,"=",data)
    useEffect(()=>{
        if(data){
            if(Array.isArray(data)){
                setChecked(data[0].enable)
            }
            else{
                setChecked(data.enable)
            }
           
        }
       
        
    },[data])
  return (
    <tr key={id} className="bg-white border-b hover:bg-gray-50">
        <td className='px-3 py-1'>
            {name}
        </td>
        <td className='px-3 py-1'>
            <input type="checkbox" checked={checked} onChange={handleChange} className='' />
        </td>
    </tr>
  )
}

export default Allowance