import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useRequest from '../../hooks/useRequest'
import { Controller, useForm } from 'react-hook-form'
import Master from './Master'
import { Input } from '../ui/input'
import { Label } from "@/components/ui/label"
import { Button } from '../ui/button'

function EditTaxSlave() {
const { control, register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm()
    const { id } = useParams()
    const { data, error, loading, putRequest } = useRequest(`/master/taxslave/${id}/`)

    const onSubmit = (formdata)=>{
        console.log(formdata)
        putRequest(formdata)
    }
    useEffect(()=>{
        console.log(data)
        setValue("Site", data?.SiteDetails?.name)
        setValue("fromamt", data?.fromamt)
        setValue("toamt", data?.toamt)
        setValue("amt", data?.amt)
    },[data])
  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex items-center justify-center w-full'>
                <div className="overflow-x-auto bg-gray-50 mt-4  px-4 py-2 rounded-lg border border-gray-200 shadow-sm w-[50%] ">

                        <div className='flex flex-col gap-4 text-left '>
                           
                        <Controller
                            name="Site"
                            defaultValue="" // Initial value can be set here
                            control={control}
                            render={({ field, fieldState: { error } }) => {
                                const { onChange, value, ref } = field;
                                return (
                                    <Master
                                        api="/master/site/"
                                        onValueChange={(newValue) => onChange(newValue || null)}
                                        value={value} name='site' add={false}  mandatoryLabel = {true}/>
                        
                                        );
                            }}
                        />
                        <div className='grid grid-cols-2 gap-y-2 w-full'>
                        <Label>From Amt</Label>
                        <Input type="text" {...register("fromamt")}  className='bg-white ' />
                        <Label>To Amt</Label>
                        <Input type="text" {...register("toamt")}  className='bg-white ' />
                        <Label>Amt</Label>
                        <Input type="text" {...register("amt")}  className='bg-white ' />
                        </div>
                        <Button type="submit">Update</Button>
                        </div>
                </div>
            </div>
        </form>
    </div>
  )
}

export default EditTaxSlave