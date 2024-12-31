import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { MoveLeft } from 'lucide-react'
import { NavLink, useParams } from 'react-router-dom'
import { useForm,Controller  } from "react-hook-form";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import usePost from '../../hooks/usePost';
import useRequest from '../../hooks/useRequest';
function EmpRate(props) {
    const {control,register, handleSubmit,setValue,reset, watch, formState: { errors } } = useForm()

    const {id} = useParams()
    const { data, error, loading, onlypatchRequest} = useRequest(`/master/rate/?pk=${id}`)

    const onSubmit = (empdata)=>{
        console.log(data)
        var pk = data[0].id
        console.log(pk,empdata)
        onlypatchRequest(`/master/rate/${pk}/`,empdata)
    }

    useEffect(()=>{
        console.log("Rate is ",data)
        if(data){
        const rate = data[0]
        setValue('basic',rate?.basic)
        setValue('da',rate?.da)
        setValue('arate',rate?.arate)
        setValue('otrate',rate?.otrate)
        setValue('hra',rate?.hra)
        setValue('madical',rate?.madical)
        setValue('ExgratiaRetention',rate?.ExgratiaRetention)
        setValue('LTARetention',rate?.LTARetention)
        setValue('LTA',rate?.LTA)
        setValue('CA',rate?.CA)
        setValue('CEA',rate?.CEA)
        setValue('WashingAllowance',rate?.WashingAllowance)
        setValue('ProfessionalPursuits',rate?.ProfessionalPursuits)
        setValue('SpecialAllowance',rate?.SpecialAllowance)
        setValue('IncomeTax',rate?.IncomeTax)
        setValue('personalpay',rate?.personalpay)
        setValue('petrol',rate?.petrol)
        setValue('mobile',rate?.mobile)
        setValue('incentive',rate?.incentive)
        setValue('fixedamt',rate?.fixedamt)
        }
        else{
            console.log("No Results")
        }
        

    },[data])
  return (
    <div className="flex flex-col overflow-x-hidden overflow-y-auto gap-2">
        <div className="bg-white rounded-lg shadow p-2 border-2">
            <div className="flex gap-2">
                <div className="relative flex justify-around gap-2">
                    <NavLink to={"/employee/"+id+"/"}><MoveLeft /></NavLink>
            
                </div>
                <h3 className="font-bold">{props?.heading.toUpperCase()} {id}</h3>
            </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex gap-2 w-full'>
                <div className="overflow-x-auto bg-gray-50  px-4 py-2 rounded-lg border border-gray-200 shadow-sm h-[550px] w-full ">
                
        
                    <div className='grid grid-cols-6 gap-x-2 gap-y-2 mt-4 items-center'>
                        <Label htmlFor='basic' className=' text-left'>Basic</Label>
                        <Input type='text' {...register("basic")} className='bg-white'  id='basic' />
                        <Label htmlFor='da' className='text-left'>Da</Label>
                        <Input type='text'  {...register("da")} className='bg-white'  id='da' />
                        <Label htmlFor='arate' className='text-left'>Actual Rate</Label>
                        <Input type='text'  {...register("arate")} className='bg-white' id='arate' />
                        <Label htmlFor='otrate' className=' text-left'>OT Rate</Label>
                        <Input type='text'  {...register("otrate")} className='bg-white' id='otrate' />
                
                        <Label htmlFor='hra' className='text-left'>HRA</Label>
                        <Input type='text'  {...register("hra")} className='bg-white' id='arate' />
                    
                        
                        <Label htmlFor='madical' className='text-left'>Madical</Label>
                        <Input type='text' className='bg-white'  id='madical' {...register("madical")} />
                        <Label htmlFor='ExgratiaRetention' className='text-left'>Exgratia Retention</Label>
                        <Input type="text" id="ExgratiaRetention" {...register("ExgratiaRetention")}  className='w-full  bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                        <Label htmlFor='LTARetention' className='text-left'>LTA Retention</Label>
                        <Input type="text" id="LTARetention" {...register("LTARetention")}  className='w-full  bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                        <Label htmlFor='LTA' className='text-left'>LTA</Label>
                        <Input type="text" id="LTA" {...register("LTA")}  className='w-full  bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                        <Label htmlFor='CA' className='text-left'>CA</Label>
                        <Input type="text" id="CA" {...register("CA")}  className='w-full  bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                        <Label htmlFor='Fooding' className='text-left'>Fooding</Label>
                        <Input type="text" id="Fooding" {...register("Fooding")}  className='w-full  bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                        <Label htmlFor='Misc' className='text-left'>Misc</Label>
                        <Input type="text" id="Misc" {...register("Misc")}  className='w-full  bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                        <Label htmlFor='WashingAllowance' className='text-left'>Washing Allowance</Label>
                        <Input type="text" id="WashingAllowance" {...register("WashingAllowance")}  className='w-full  bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                        <Label htmlFor='ProfessionalPursuits' className='text-left'>Professional Pursuits</Label>
                        <Input type="text" id="ProfessionalPursuits" {...register("ProfessionalPursuits")}  className='w-full  bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                    
                        <Label htmlFor='SpecialAllowance' className='text-left'>Special Allowance</Label>
                        <Input type="text" id="SpecialAllowance" {...register("SpecialAllowance")}  className='w-full  bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                        <Label htmlFor='IncomeTax' className='text-left'>Income Tax</Label>
                        <Input type="text" id="IncomeTax" {...register("IncomeTax")}  className='w-full  bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                        <Label htmlFor='personalpay' className='text-left'>Personal Pay</Label>
                        
                        <Input type="text" id="personalpay" {...register("personalpay")}  className='w-full  bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                    
                        <Label htmlFor='petrol' className='text-left'>Petrol</Label>
                
                        <Input type="text" id="petrol" {...register("petrol")}  className='w-full  bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
        
                        <Label htmlFor='mobile' className='text-left'>Mobile</Label>
                        <Input type="text" id="mobile" {...register("mobile")}  className='w-full  bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                        <Label htmlFor="incentive" className='text-left'>Incentive</Label>
                        <Input type="text" id="incentive" {...register("incentive")}  className='w-full  bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                    
                        <Label htmlFor="fixedamt" className='text-left'>Fixed Amt</Label>
                        <Input type="text" id="fixedamt" {...register("fixedamt")}  className='w-full  bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                        <Button type="submit" className=' col-start-5 col-span-2 mt-4'>Save</Button>
                    </div>
            
                
    
                </div>
           
            </div>
        </form>
            
   
    </div>
  )
}

export default EmpRate