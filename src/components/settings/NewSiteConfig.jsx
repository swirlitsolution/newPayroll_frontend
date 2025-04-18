import React, { useEffect } from 'react'
import usePost from '../../hooks/usePost'
import { useParams, useSearchParams } from 'react-router-dom'
import { Input } from '../ui/input'
import { useForm, Controller } from 'react-hook-form'
import { Button } from '../ui/button'
import { Label } from "@/components/ui/label"
import Master from '../master/Master'

function NewSiteConfig() {
    const {control,register, handleSubmit,setValue,reset, watch, formState: { errors } } = useForm()
    const params = useSearchParams()
    const id = params[0].get('id')
    const { data, error, loading, postRequest,putapiRequest, getRequest} = usePost(`/master/siteconfig/`)

    const onSubmit = (formdata)=>{
        Object.keys(formdata).forEach((key) => {
            if (formdata[key] === "") {
                formdata[key] = null; // Set empty strings to null
            }
        });
        if(id){
            putapiRequest(`/master/siteconfig/${id}/`,formdata)
        }
        else{
            postRequest(formdata)
        }
    }
    console.log(id,data)
    useEffect(()=>{
        if(id){
            getRequest(`/master/siteconfig/${id}/`).then((res)=>{
                console.log("data recieved",res)
                setValue('site',res?.data?.SiteDetails?.name)
                setValue('PfApplicable',res?.data?.PfApplicable)
                setValue('EsiApplicable',res?.data?.EsiApplicable)
                setValue('PrfTax',res?.data?.PrfTax)
                setValue('AttendanceAllow',res?.data?.AttendanceAllow)
                setValue('AllowanceAsPer',res?.data?.AllowanceAsPer)
                setValue('OtApplicable',res?.data?.OtApplicable)
                setValue('MrOtApplicable',res?.data?.MrOtApplicable)
                setValue('PfLimitApplicable',res?.data?.PfLimitApplicable)
                setValue('EsicLimitApplicable',res?.data?.EsicLimitApplicable)
                setValue('PfLimit',res?.data?.PfLimit)
                setValue('EsicLimit',res?.data?.EsicLimit)
            })
        }
    },[id])
    // useEffect(()=>{
        
    //     setValue('username',data?.EmpId)
    //     setValue('email',data?.Email)
    // },[data])
  return (
    <div className='flex w-full mt-4 justify-center'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='w-96 flex flex-col gap-2 text-start rounded-2xl border shadow-2xl items-start p-6'>
                     <Controller
                        name="site"
                        defaultValue="" // Initial value can be set here
                        control={control}
                        render={({ field, fieldState: { error } }) => {
                            const { onChange, value, ref } = field;
                            return (
                                <Master
                                    api="/master/site/"
                                    onValueChange={(newValue) => onChange(newValue || null)}
                                    value={value} name='site' mandatoryLabel={true} />
                            );
                        }}
                    />
                     
                    <div className='w-full grid grid-cols-4 gap-2 px-4 items-center mt-4 text-left'>
                        <Input type="checkbox" id="pfappl"  {...register("PfApplicable")} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />

                        <Label htmlFor='pfappl' className='col-span-3'>Pf Applicable</Label>
                        <Input type="checkbox" id="esicappl"  {...register("EsiApplicable")} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                        <Label htmlFor='esicappl' className='col-span-3'>ESIC Applicable</Label>
                        <Input type="checkbox" id="prftax"  {...register("PrfTax")} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                        <Label htmlFor='prftax' className='col-span-3'>PRF Tax Applicable</Label>
                        <Input type="checkbox" id="attendallow"  {...register("AttendanceAllow")} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                        <Label htmlFor='attendallow' className='col-span-3'>Attendance Allowance</Label>
                        <Input type="checkbox" id="allowasper"  {...register("AllowanceAsPer")} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                        <Label htmlFor='allowasper' className='col-span-3'>Allowance as per day</Label>
                        <Input type="checkbox" id="OtApplicable"  {...register("OtApplicable")} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                        
                        <Label htmlFor='OtApplicable' className='col-span-3'>OT Applicable</Label>
                        <Input type="checkbox" id="MrOtApplicable"  {...register("MrOtApplicable")} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                        <Label htmlFor='MrOtApplicable' className='col-span-3'>MR OT Applicable</Label>
                        
                        <Input type="checkbox" id="PfLimitApplicable"  {...register("PfLimitApplicable")} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                        <Label htmlFor='PfLimitApplicable' className='col-span-3'>Pf Limit Applicable</Label>
                        <Input type="checkbox" id="EsicLimitApplicable"  {...register("EsicLimitApplicable")} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                        <Label htmlFor='EsicLimitApplicable' className='col-span-3'>ESIC Limit Applicable</Label>
                        
                        <Input type="text" id="pflimit" {...register("PfLimit")} className='w-full  bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                        <Label htmlFor='pflimit' className='text-left col-span-3'>PF Limit Amount</Label>
                        <Input type="text" id="EsicLimit" {...register("EsicLimit")} className='w-full  bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                        <Label htmlFor='EsicLimit' className='text-left col-span-3'>ESIC Limit Amount</Label>
                    
                    </div>
                    <Button type="submit" className=" col-span-2">Save</Button>
                </div>
            </form>
        </div>
  )
}

export default NewSiteConfig