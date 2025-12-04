import React from 'react'
import useRequest from '../../hooks/useRequest'
import Allowance from './Allowance'

function OtherAllowance() {
const { data, loading} = useRequest("/master/site/") 
console.log(data)
  return (
    <div>
        {loading?<p>Loading.....</p>:
        
        data?.length?
        <div className="border rounded-md overflow-x-auto w-full flex justify-center  scrollbar-thin h-full">
           <div>
           <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th className="px-3 py-3 cursor-pointer">
                        Site
                    </th>
                    <th className="px-3 py-3 cursor-pointer">
                        Action
                    </th>
                
                    
                </tr>
                </thead>
                <tbody>
                {data.map((row, index) => (
                    <Allowance key={index} id={row.id} name={row.name} />
                ))}
                </tbody>
            </table>
           </div>
        </div>
        :<p>No Data Available</p>
        
        }
    </div>
  )
}

export default OtherAllowance