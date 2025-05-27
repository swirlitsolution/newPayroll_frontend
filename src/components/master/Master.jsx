import React, { useState } from 'react'
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import useRequest from '../../hooks/useRequest';
import { Pencil, Plus } from 'lucide-react';
import NewItem from './NewItem';
import EditItem from './EditItem';

function Master(props) {
    const [add,setAdd] = useState(false)
     const [edit,setEdit] = useState(false)
    //  const [value, setValue] = useState(props.value || null);
    const { data, error, loading, postRequest,onlypatchRequest} = useRequest(props.api)

    const showMaster = ()=>{
        setAdd(!add)
        setEdit(false)
    }
    const showEditMaster = ()=>{
        setAdd(false)
        setEdit(!edit)
    }
    const createNew = (data)=>{
       
        if(data){
            postRequest(data)
        }
    }

  const updatemaster = (mydata)=>{
        const id = data.find((element)=>element.name === mydata.value)?.id
        console.log("editing id is ",id)
        if(id){
            mydata.id = id
        }
       
        if(mydata){
            onlypatchRequest(props.api + id +"/",mydata)
        }
    }
  return (

    <div className={'grid grid-cols-2 gap-x-2 items-center' + props.className}>
        <Label className='text-left'>
        {props.name.toUpperCase()}
        {props.mandatoryLabel ? <span style={{ color: 'red' }}> *</span> : null}
        </Label>
        <div className='flex gap-2 items-center justify-center'>
            <Select className=" w-10"
                disabled={props.disabled} // Disable the select if the prop is true
                onValueChange={props.onValueChange} // Use onChange directly
                value={props.value} // Set the value prop to the selected value
                >
                <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                    {data?data.map((element)=>(<SelectItem key={element.id} value={element.name}>{element.name}</SelectItem>)):""}
                </SelectContent>
            </Select>
                    
        
            {
                add?
                    <NewItem heading={props.name} handNewItem={createNew} loading={loading} showMaster={showMaster}  />
                :""
            }
            {
                edit?
                    <EditItem heading={props.name} value={props.value} handNewItem={updatemaster} loading={loading} showMaster={showMaster}  />
                :""
            }
            {
                props.add?
                <div className='w-full flex justify-between gap-x-2'>
                    <div onClick={()=>showMaster(true)} className='hover:text-green-600 text-xs'>    
                        <Plus className='cursor-pointer text-xs' />
                    </div>
                    <div onClick={()=>showEditMaster(true)} className='hover:text-green-600 text-sm'>    
                        <Pencil className='cursor-pointer text-sm' />
                    </div>
                </div>
                    :""
            }
        </div>
    </div>
  )
}

export default Master