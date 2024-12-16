import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import {  X } from 'lucide-react';
function NewItem({heading,handNewItem,loading,showMaster}) {

    const [name,setName] = useState(null)
    const handleSubmit = ()=>{
     
     
        handNewItem({name})
      
        
    }
    useEffect(()=>{
        if(loading === false){
            setName('')
        }
    },[loading])
    
    return <div>
    
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-left">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">CREATE {heading.toUpperCase()}</h3>
                    <button className="text-gray-400 hover:text-gray-500" onClick={()=>showMaster()}>
                    <X className="h-6 w-6" />
                    </button>
                </div>
              
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="name" value={name} onChange={(e)=>setName(e.target.value)} />
                                 
                <div className='flex gap-2 mt-2'>
               
                       {loading?"Loading":
                        <Button variant="contained" onClick={handleSubmit} >Save</Button>
                       } 
            
                </div>
        
            </div>
          
        </div>
    </div>
</div>
}

export default NewItem