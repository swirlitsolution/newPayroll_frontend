import React, { useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useRequest from '../../hooks/useRequest'
import { NavLink, useParams } from 'react-router-dom'
import { MoveLeft } from 'lucide-react'
import { useForm,Controller  } from "react-hook-form";
import Master from '../master/Master'
import { Button } from '../ui/button'

function GangTransfer() {
    const {control,register, handleSubmit,setValue,reset, watch, formState: { errors } } = useForm()
    const {id} = useParams()
    const { data, error, loading, onlypostRequest} = useRequest(`/master/employee/${id}/`)

    const onSubmit = (formdata)=>{
        console.log("gang transfer data is ",formdata)
        onlypostRequest("/transfer/",formdata)
    }


    useEffect(()=>{
        console.log("employee data is ",data)
        setValue("EmpId",data?.EmpId)
        setValue("Name",data?.Name)
        setValue("Gang",data?.GangDetails?.name)
        
    },[data])
    return (
        <div className="flex flex-col overflow-x-hidden overflow-y-auto gap-2">
            <div className="bg-white rounded-lg shadow p-2 border-2">
              <div className="flex gap-2">
              <div className="relative flex justify-around gap-2">
                <NavLink to="/transfer"><MoveLeft /></NavLink>
                
                </div>
                <h3 className="font-bold">Select Gang</h3>
                
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex gap-2 w-full items-center justify-center'>
                    <div className="overflow-x-auto bg-gray-50  px-4 py-2 rounded-lg border border-gray-200 shadow-sm  w-[50%] ">
                        <div className='grid grid-cols-2 gap-x-2 gap-y-2 mt-4 items-center'>
                            <Label htmlFor='empid' className=' text-left'>EmpId</Label>
                            <Input disabled={true} type='text' {...register("EmpId")} className='bg-white'  id='empid' />
                            <Label htmlFor='name' className='text-left'>Name</Label>
                            <Input disabled={true} type='text' {...register("Name")} className='bg-white'  id='name' />
                            <div className='col-span-2'>
                                <Controller
                                    name="Gang"
                                    defaultValue="" // Initial value can be set here
                                    control={control}
                                    render={({ field, fieldState: { error } }) => {
                                        const { onChange, value, ref } = field;
                                return (
                                        <Master
                                        api = "/master/gang/"
                                        onValueChange={(newValue) => onChange(newValue || null)} 
                                        value={value} name='gang' add={false} />
                                );
                                    }}
                                />
                    
                            </div>
                            <Button type="submit" className=' col-span-2 mx-10 mt-4'>Save</Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
  )
}

export default GangTransfer