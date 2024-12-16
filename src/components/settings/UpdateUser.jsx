import React, { useEffect, useState } from 'react'
import usePost from '../../hooks/usePost'
import { useParams } from 'react-router-dom'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Label } from "@/components/ui/label"

function UpdateUser() {
    const {control,register, handleSubmit,setValue,reset, watch, formState: { errors } } = useForm()
    const {id} = useParams()
    const { data, error, loading, putRequest, getRequest} = usePost(`/api/user/update/`)    
    const [password,setPassword] = useState(false)

    const handlechangepassword = ()=>{
        setValue('changepassword',!password)
        setPassword(!password)
        
    }
    const onSubmit = (formdata)=>{
        putRequest(formdata)
    }
    useEffect(()=>{
        getRequest(`/api/user/${id}/`)
    },[id])
    useEffect(()=>{
        
        setValue('username',data?.userdata?.username)
        setValue('email',data?.userdata?.email)
        setValue('is_active',data?.userdata?.is_active)
    },[data])
    return (
        <div className='flex w-full mt-4 justify-center'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='w-96 grid grid-cols-2 gap-2 text-start rounded-2xl border shadow-2xl items-start p-6'>
                    <label>Username</label>
                    <Input type="text" disabled={true} {...register("username")} className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                    <label>Email</label>
                    <Input type="text" {...register("email",{required:true})} className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                    <Label htmlFor='is_active'>Is Active</Label>
                    
                    <Input type="checkbox" id="is_active"  {...register("is_active")}  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />      
                    <Label htmlFor='is_supervisor'>Is Supervisor</Label>
    
                    <Input type="checkbox" id="is_supervisor"  {...register("is_supervisor")}  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />      
                    <Label htmlFor='is_admin'>Is Admin</Label>
    
                    <Input type="checkbox" id="is_admin"  {...register("is_admin")}  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />      
                    <Label htmlFor='changepassword'>Change Password</Label>
    
                    <Input type="checkbox" id="changepassword" onClick={handlechangepassword}  {...register("changepassword")}  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />      
                    {
                        password?
                        (<>
                            <Label htmlFor='password'>New Password</Label>
                        
                            <Input type="password" {...register("password")} className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                            </>
                        )
                        :""
                    } 
                    <Button className=" col-span-2">Save</Button>
                </div>
            </form>
        </div>
      )
    }
export default UpdateUser