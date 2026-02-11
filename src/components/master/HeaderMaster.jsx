import React, { useEffect, useState } from 'react'
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
import axios from 'axios';
import { toast } from 'react-toastify';

function HeaderMaster(props) {
    const [add,setAdd] = useState(false)
     const [edit,setEdit] = useState(false)
    //  const [value, setValue] = useState(props.value || null);
    const [data,setData] = useState(null)
    const [loading,setLoading] = useState(false)
    const showMaster = ()=>{
        setAdd(!add)
        setEdit(false)
    }
    const showEditMaster = ()=>{
        setAdd(false)
        setEdit(!edit)
    }
    const createNew = async (data)=>{
       setLoading(true)
        if(data){
            try {
                const response = await axios.post(props.api+"create/", data);
                if(response.status === 201){
                    setData(response.data);
                toast.success(response.data.success)
                }
                if(response.status === 202){
                    setData(response.data);
                toast.success(response.data.success)
                }
                if(response.status === 204){
                toast.warning(`Nothing found ${response?.data?.success}`)
                }
                if(response.status === 226){
                toast.warning(response.data.exists)
                }
                
                if(response.status===200){

                
                if(response.data.warning){
                    toast.warning(response.data.warning)
                }
                else{
                    setData(response.data);
                    toast.success("Processed Successfully")
                }
                
            
                
                }
                return response
            } catch (err) {
                console.error(err)
                if(err.response.status === 404){
                var error = err.response.data
                Object.keys(error).map((key)=>{
                    toast.warning(`${key} ${error[key]}`)
                })
                }
                if(err.response.status === 400){
                    error = err.response.data
                Object.keys(error).map((key)=>{
                    toast.warning(`${key} ${error[key]}`)
                })
                } 
                
                if(err.status===409){
                    toast.warning(err.response.data.warning)
                    }
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        setLoading(false)
    }

  const updatemaster = async (mydata)=>{
    setLoading(true)
        const id = data.find((element)=>element.name === mydata.value)?.id
        console.log("editing id is ",id)
        if(id){
            mydata.id = id
        }
       
        if(mydata){
            try {
          const response = await axios.patch(props.api + "update/" + mydata.id +"/",mydata);
          if(response.status===200){
          setData(response.data);
          toast.success("Update Successfully")
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
          console.log("finally called")
        }
        }
        setLoading(false)
    }
    useEffect(() => {
        
        const fetchData = async () => {
            setLoading(true)
            try {
            const response = await axios.get(props.api);
            
            setData(response.data); // Axios automatically parses the response as JSON
            
            } catch (err) {
            if (axios.isCancel(err)) {
                console.log('Fetch aborted');
            } 
            } finally {
                setLoading(false);
            }
        };
        setLoading(true)
        fetchData();
        const source = axios.CancelToken.source();

        return ()=>{
        source.cancel()
        }
        }, [props.api]);
  return (

    <div className={'grid grid-cols-1 gap-x-2 items-center' + props.className}>
     
        <div className='flex gap-2 items-center justify-center'>
            <Select className=" w-10"
                defaultValue={props?.value} // Set the default value to the prop value
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
                    <EditItem heading={props?.name} value={props?.value} handNewItem={updatemaster} loading={loading} showMaster={showEditMaster}  />
                :""
            }            {
                props.add?
                <div className='w-[50px] flex justify-around gap-x-2'>
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

export default HeaderMaster