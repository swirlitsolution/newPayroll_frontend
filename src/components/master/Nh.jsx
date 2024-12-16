import React, { useState } from 'react'
import Master from '../master/Master';
import { Label } from "@/components/ui/label"
import { useForm,Controller  } from "react-hook-form";
import useRequest from '../../hooks/useRequest';
import DataGrid from '../custom/DataGrid';
import { Button } from '../ui/button'
import { Input } from '../ui/input';

const columns = [
    {field:'id',headerName:'TrnId',width:'80px'},
    {field:'site',headerName:'Site',renderCell:(params)=>params.siteinfo.name},
    {field:'day',headerName:'Days'},
    ] 


function Nh() {
    const {control,register,setValue, handleSubmit,reset, watch, formState: { errors } } = useForm()
    const { data, error, loading, postRequest,onlypatchRequest} = useRequest("/master/nhday/")
    
    const [row,setRow] = useState("")
    const onSubmit = (data)=>{
        console.log(data)
        if(data.new){
            postRequest(data)
        }
        else{
            onlypatchRequest(`/master/nhday/${row.id}/`,data)
        }
        
    }
    const handleRowClicked = (params)=>{
        console.log(params)
        setValue('site',params?.siteinfo?.name)
        setValue('day',params?.day)
        setValue('new',false)
        setRow(params)
    }
  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)} className='m-2'>
        <div className='w-full flex gap-4 items-center justify-center'>
        <Label htmlFor='new' className='col-span-3'>New</Label>
                <Input type="checkbox" id="new"  {...register("new")}  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                
        <Controller
                name="site"
                defaultValue="" // Initial value can be set here
                control={control}
                render={({ field, fieldState: { error } }) => {
                    const { onChange, value, ref } = field;
                return (
                    <Master
                    api = "/master/site/"
                    onValueChange={(newValue) => onChange(newValue || null)} 
                    value={value} name='site' />
                );
                }}
            />
            <Label htmlFor="day">Day</Label>
            <input type="text"  id="day" {...register("day")} className="bg-gray-50 border w-52 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            <Button type="submit" className=''>Save</Button>
        </div>
        </form>
        <div className='w-full'>
        {loading?"Loading......": data?.length?(<DataGrid 
              heading="NH"
              columns={columns} 
              row={data} 
      
              rowClicked={handleRowClicked}

              />):(
                <div>No data available</div>
              )} 
        </div>
    </div>
  )
}

export default Nh