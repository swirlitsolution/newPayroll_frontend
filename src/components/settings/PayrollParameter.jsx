import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Label } from "@/components/ui/label"
import useRequest from '../../hooks/useRequest'

function PayrollParameter() {
    const {control,register, handleSubmit,setValue,reset, watch, formState: { errors } } = useForm()
    const { data, error, loading, postRequest} = useRequest(`/parameter/`)  
    const onSubmit = (formdata)=>{
        console.log(formdata)
        postRequest(formdata)
    }
    useEffect(()=>{
        setValue('pfper',data?.parameter?.pfper)
        setValue('epfper',data?.parameter?.epfper)
        setValue('ppfper',data?.parameter?.ppfper)
        setValue('ifper',data?.parameter?.ifper)
        setValue('actwopfper',data?.parameter?.actwopfper)
        setValue('actwooneper',data?.parameter?.actwooneper)
        setValue('actwotwoper',data?.parameter?.actwotwoper)
        setValue('esicemployerper',data?.parameter?.esicemployerper)
        setValue('esicemployeeper',data?.parameter?.esicemployeeper)
        setValue('cmonth',data?.parameter?.cmonth)
        setValue('pmonth',data?.parameter?.pmonth)
        setValue('tday',data?.parameter?.tday)
        setValue('sunday',data?.parameter?.sunday)
        setValue('holiday',data?.parameter?.holiday)
        setValue('manday',data?.parameter?.manday)
        setValue('pflimit',data?.parameter?.pflimit)
        setValue('esiclimit',data?.parameter?.esiclimit)
        setValue('leavestartdate',data?.parameter?.leavestartdate)
        setValue('bonusstartdate',data?.parameter?.bonusstartdate)

    },[data])
  return (
    <div className='w-full mt-4 '>
    <form onSubmit={handleSubmit(onSubmit)} className='flex  w-full mt-4 justify-center'>
   
        <div className='w-[60%] grid grid-cols-4 gap-2 text-start rounded-2xl border shadow-2xl items-center p-6'>
        <div className='w-full col-span-4 bg-gray-200 rounded-md p-2'>Payroll Parameter</div>
            <Label>PF %</Label>
            <Input type="text" {...register("pfper",{required:true})} className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
            <Label>EPF %</Label>
            <Input type="text" {...register("epfper",{required:true})} className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
            <Label>PPF %</Label>
            <Input type="text" id="PPFPER"  {...register("ppfper")}  className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />      
            <Label htmlFor='ifper'>IF %</Label>
            <Input type="text" id="is_supervisor"  {...register("ifper")}  className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />      
            <Label htmlFor='actwopfper'>A / C NO 2 P.F % </Label>
            <Input type="text" id="actwopfper"  {...register("actwopfper")}  className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />      
            <Label htmlFor='actwooneper'>A/C 21 PF %</Label>
            <Input type="text" id="actwooneper"  {...register("actwooneper")}  className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />      
            <Label htmlFor='actwotwoper'>A/C 22 PF %</Label>
            <Input type="text" {...register("actwotwoper")} className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
            <Label htmlFor='esicemployerper'>ESIC EMPLOYER %</Label>
            <Input type="text" {...register("esicemployerper")} className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
            <Label htmlFor='esicemployeeper'>ESIC EMPLOYEE %</Label>
            <Input type="text" {...register("esicemployeeper")} className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
            <Label htmlFor='cmonth'>CURRENT MONTH</Label>
            <Input type="month" {...register("cmonth")} className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
            <Label htmlFor='pmonth'>PREVIOUS  MONTH</Label>
            <Input type="month" {...register("pmonth")} className='w-full text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
            <Label htmlFor='tday'>TOTAL DAYS</Label>
            <Input type="text" {...register("tday")} className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
            <Label htmlFor='sunday'>SUNDAY</Label>
            <Input type="text" {...register("sunday")} className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
            <Label htmlFor='holiday'>HOLIDAY %</Label>
            <Input type="text" {...register("holiday")} className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
            <Label htmlFor='manday'>MANDAY</Label>
            <Input type="text" {...register("manday")} className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
            <Label htmlFor='pflimit'>PF LIMIT</Label>
            <Input type="text" {...register("pflimit")} className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
            <Label htmlFor='esiclimit'>ESIC LIMIT</Label>
            <Input type="text" {...register("esiclimit")} className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
            <Label htmlFor='leavestartdate'>LEAVE START DATE</Label>
            <Input type="date" {...register("leavestartdate")} className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
            <Label htmlFor='bonusstartdate'>BONUS START DATE</Label>
            <Input type="date" {...register("bonusstartdate")} className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
            
            <Button className=" col-span-2">{loading?"Saving.....":"Save"}</Button>
        </div>
    </form>
</div>
  )
}

export default PayrollParameter