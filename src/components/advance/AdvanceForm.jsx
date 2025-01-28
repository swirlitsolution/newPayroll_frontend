import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Label } from "@/components/ui/label"
import { useForm, Controller } from 'react-hook-form'
import { Textarea } from "@/components/ui/textarea"
import { motion } from 'framer-motion';
import { Input } from '../ui/input'
import { Loader2 } from 'lucide-react'
import useRequest from '../../hooks/useRequest'
import { AuthContext } from '../../AuthContext';
import { useContext } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import usePost from '../../hooks/usePost'

function AdvanceForm({closeModel}) {
    const { control, register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm()
    const { data, error, loading,getRequest,postRequest } = usePost("/master/advance/");
    const [employee,setEmployee]=useState(null)
    const {user} = useContext(AuthContext);
    const onSubmit = (formdata)=>{
        console.log(formdata)

        postRequest(formdata)
    }
    
    useEffect(()=>{
        if(user?.is_superuser){
            const emp = getRequest("/master/employee/")
            emp.then((res)=>{
                setEmployee(res.data)
            })
        }
    },[user])
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-10" id="my-modal">
            <div className="relative top-20 mx-auto p-2 border w-[30%] shadow-lg rounded-md bg-white">
                <div className="p-2 space-y-2"  />
                    
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                    >
                    <form onSubmit={handleSubmit(onSubmit)} className=" text-start p-8 space-y-6">

                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Advance Request</h2>
                        <div className="space-y-2">
                         {
                            user?.is_superuser?
                            loading?<div>Loading ....</div>:
                                <div>
                                <Controller
                                    name="employee"
                                    defaultValue="" // Initial value can be set here
                                    control={control}
                                    render={({ field, fieldState: { error } }) => {
                                        const { onChange, value, ref } = field;
                                        return (
                                            <>
                                                <Autocomplete
                                                disablePortal
                                                size="small"
                                                classes={{ input: 'autoComplete-text', option: 'autoComplete-text text-sm'}}
                                                id="employee_autocomplete"
                                                options={employee} // the options prop expects an array of objects
                                                getOptionLabel={(option) => option.Name} // function to display option label
        
                                                onChange={(event, newValue) =>onChange(newValue?.id || null)}
                                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                                renderOption={(props, option) => (
                                                    <li {...props} key={option.id}>
                                                        {option.Name}
                                                    </li>
                                                    )}
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Employee Name" />
                                                                    )}
                                                                    />
                                                                {error && <span className="text-red-500">{error.message}</span>} {/* Display error message if exists */}
                                                            </>
                                                        );
                                                    }}
                                />
                            
                            
                            </div>
                            :""
                            }
                        <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
                            Advance Amount
                        </Label>
                        <Input
                            id="amount"
                            type="number"
                            placeholder="Enter amount"
                            {...register("amount")}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="reason" className="text-sm font-medium text-gray-700">
                            Reason for Advance
                        </Label>
                        <Textarea
                            id="reason"
                            placeholder="Briefly explain your reason"
                            {...register("reason")}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        </div>
                        <div className='w-full flex justify-between'>
                        
                        <Button
                            type="submit"
                            disabled={loading}
                            >
                            {loading ? (
                                <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                wait ...
                                </>
                            ) : (
                                "Submit"
                            )}
                        </Button>
                        <Button variant="destructive" onClick={closeModel}>Close</Button>
                        </div>
                    </form>
                </motion.div>
                
            </div>
            
        </div>
    )
}
    

export default AdvanceForm