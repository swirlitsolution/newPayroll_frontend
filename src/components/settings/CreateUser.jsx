import React, { useEffect } from 'react'
import usePost from '../../hooks/usePost'
import { useParams } from 'react-router-dom'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Label } from "@/components/ui/label"

function CreateUser() {
    const {control,register, handleSubmit,setValue,reset, watch, formState: { errors } } = useForm()
    const {id} = useParams()
    const { data, error, loading, postRequest, getRequest} = usePost(`/api/user/create/`)

    const onSubmit = (formdata)=>{
        postRequest(formdata)
    }
    useEffect(()=>{
        getRequest(`/master/employee/${id}/`)
    },[id])
    useEffect(()=>{
        
        setValue('username',data?.EmpId)
        setValue('email',data?.Email)
    },[data])
  return (
    <div className='flex w-full mt-4 justify-center'>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='w-96 grid grid-cols-2 gap-2 text-start rounded-2xl border shadow-2xl items-start p-6'>
                <label>Username</label>
                <Input type="text" disabled={true} {...register("username",{ required: true })} className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                <label>Email</label>
                <Input type="text" {...register("email",{ required: true })} className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                <label>Password</label>
                <Input type="password" {...register("password",{ required: true })} className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                <label>Confirm Password</label>
                <Input type="password" {...register("cpassword",{ required: true })} className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                <Label htmlFor='is_active'>Is Active</Label>
                
                <Input type="checkbox" id="is_active"  {...register("is_active")}  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />      
                <Label htmlFor='is_supervisor'>Is Supervisor</Label>

                <Input type="checkbox" id="is_supervisor"  {...register("is_supervisor")}  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />      
                <Label htmlFor='is_admin'>Is Admin</Label>

                <Input type="checkbox" id="is_admin"  {...register("is_admin")}  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />      
                    
                <Button className=" col-span-2">Save</Button>
            </div>
        </form>
    </div>
  )
}

export default CreateUser