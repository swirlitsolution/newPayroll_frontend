import React, { useEffect, useRef, useState } from 'react'
import { Label } from "@/components/ui/label"
import { useForm, Controller } from 'react-hook-form'
import { addDays, format } from 'date-fns';
import { Textarea } from "@/components/ui/textarea"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select'
import CustomCalendar from '../custom/CustomCalendar';
import { Button } from '../ui/button';
import usePost from '../../hooks/usePost';
import { Autocomplete, TextField } from '@mui/material';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
  
function LeaveApplication({user,onClose}) {
    const { control, register, handleSubmit, watch, formState: { errors } } = useForm()
    const [employee,setEmployee] = useState(null)
    const { data, error, loading,getRequest,postRequest } = usePost("/master/leave/");
    const [leavedata,setLeaveData] = useState({})
    const [disabled,setDisabled] = useState(false)
    const onSubmit = (formdata)=>{
        console.log(formdata)
        var payload = ""
        if(formdata.to){
            payload =  {
                ...formdata,
                  leaveFrom: format(new Date(formdata.dateRange.from), 'yyyy-MM-dd'),
                  leaveTo: format(new Date(formdata.dateRange.to), 'yyyy-MM-dd'),
                
              };
        }
        else{
            payload =  {
                ...formdata,
                  leaveFrom: format(new Date(formdata.dateRange.from), 'yyyy-MM-dd'),
                  leaveTo: format(new Date(formdata.dateRange.from), 'yyyy-MM-dd'),
                
              }; 
        }
       
        
        const res = postRequest(payload)
        console.log("response is",res)
        // promises.then((res)=>{
        //     if(res.status === 201){
        //         toast.success("Leave Application Submitted Successfully.")
        //         onClose()
        //     }
        // })
        // .catch((error)=>{
        //     console.log("Error during submitting leave application.",error)
        //     toast.error("Error during submitting leave application.")
        // })
    }

    const getBalanceLeave = (data)=>{
        var bel = 0
        var bcl = 0
        var bfl = 0
        try{
            var worked = data?.worked
            var eltaken = data?.eltaken
            var cltaken = data?.cltaken
            var fltaken = data?.fltaken
            
            var eel = worked/20
            var ecl = worked/35
            var efl = worked/60
            if(eel>=1){
                eel = Math.ceil(eel)
            }
                
            else{
                eel = 0
            }
                
            if(ecl>=1){
                ecl = Math.ceil(ecl)
            }
            else{
                ecl = 0
            } 
            if(efl>=1){
                efl = Math.ceil(efl)
            }  
            else{
                efl = 0
            }  
            if(eel>15){
                eel = 15
            }   
            if(ecl>7){
                ecl = 7
            }
            if(efl>4){
                efl = 4
            }
            
            bel = eel - eltaken
            bcl = ecl - cltaken
            bfl = efl - fltaken
            
            setLeaveData({eltaken,cltaken,fltaken,eel,ecl,efl,bel,bcl,bfl})
            return {bel,bcl,bfl}
        }
        catch{
    
            return {bel,bcl,bfl}
        }
            
    }
    const getTotalWorking =  (empid)=>{
        var pk = watch('employee')
        const today = new Date();
        const formattedDate = today.toISOString().slice(0, 10); // YYYY-MM-DD format
        const cookies = new Cookies()
        const token = cookies.get('access')
            
        if(user?.is_superuser){
            var emp = employee?.find((item)=>item.id === pk)
            if(emp){
            
                const res =  axios.get(`/gettotalworkingday/${emp?.EmpId}/${formattedDate}/`, {
                    headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    },
                    // Attach the cancel token
                });
                res
                .then((response)=>{
                if(response.data?.worked){
                    getBalanceLeave(response?.data)
                    console.log(leavedata)
                }
                else{
                    console.log("No data")
                    toast.error("No earned leave till now.")
                }
                })
                .catch((error)=>{
                console.log("error during fetching total working day",error)
                })
            }
        }
        else{
            const res =  axios.get(`/gettotalworkingday/${empid}/${formattedDate}/`, {
                headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                },
                // Attach the cancel token
            });
            res
            .then((response)=>{
            if(response.data?.worked){
                getBalanceLeave(response?.data)
                console.log(leavedata)
            }
            else{
                console.log("No data")
                toast.error("No earned leave till now.")
            }
            })
            .catch((error)=>{
            console.log("error during fetching total working day",error)
            })
        }
    
        
    
    }
     
    const checkLeaveStatus = (value)=>{
        const leavevalue = ['EL','CL','FL']
        const leave = leavevalue.includes(value)
        if(leave){
             if(value === "EL"){
                if(leavedata?.bel>0){
                    toast.success(`Balance EL is ${leavedata?.bel}`)
                    setDisabled(false)
                }
                else{
                    toast.error(`Balance EL is ${leavedata?.bel}`)
                    setDisabled(true)
                }
            }
            else if(value === "CL"){
                if(leavedata?.bcl>0){
                    toast.success(`Balance CL is ${leavedata?.bcl}`)
                    setDisabled(false)
                }
                else{
                    toast.error(`Balance CL is ${leavedata?.bcl}`)
                    setDisabled(true)
                }
            }
            else if(value === "FL"){
                if(leavedata?.bfl>0){
                    toast.success(`Balance FL is ${leavedata?.bfl}`)
                    setDisabled(false)
                }
                else{
                    toast.error(`Balance FL is ${leavedata?.bfl}`)
                    setDisabled(true)
                }
            }
        }
     }
    useEffect(()=>{
   
        if(user?.is_superuser){
           const emp = getRequest("/master/employee/")
            emp.then((res)=>{
                setEmployee(res.data)
            })
        }
        else{
            const emp = getRequest("/api/user/login/profile/")
            emp.then((res)=>{
                setEmployee(res.data.employeedata)
                getTotalWorking(res.data.employeedata.EmpId)
            }) 
        }
    },[user])
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-10" id="my-modal">
        <div className="relative top-20 mx-auto p-2 border w-[30%] shadow-lg rounded-md bg-white">
            <div className="p-2 space-y-2"  />
            <div className='flex flex-col gap-2 items-center justify-center w-full p-2'>
                <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-3 border-2 py-3 text-center">Leave</th>
                            <th className="px-3 border-2 py-3 text-center">Earned</th>
                            <th className="px-3 border-2 py-3 text-center">Taken</th>
                            <th className="px-3 border-2 py-3 text-center">Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border-2 p-1 text-center">EL</td>
                            <td className="border-2 p-1 text-center">{leavedata?.eel || "0"}</td>
                            <td className="border-2 p-1 text-center">{leavedata?.eltaken || "0"}</td>
                            <td className="border-2 p-1 text-center">{leavedata?.bel || "0"}</td>
                        </tr>
                        <tr>
                            <td className="border-2 p-1 text-center">CL</td>
                            <td className="border-2 p-1 text-center">{leavedata?.ecl || "0"}</td>
                            <td className="border-2 p-1 text-center">{leavedata?.cltaken || "0"}</td>
                            <td className="border-2 p-1 text-center">{leavedata?.bcl || "0"}</td>
                        </tr>
                        <tr>
                            <td className="border-2 p-1 text-center">FL</td>
                            <td className="border-2 p-1 text-center">{leavedata?.efl || "0"}</td>
                            <td className="border-2 p-1 text-center">{leavedata?.fltaken || "0"}</td>
                            <td className="border-2 p-1 text-center">{leavedata?.bfl || "0"}</td>
                        </tr>
                    </tbody>
                </table>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 w-full text-start">
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

                                        onChange={(event, newValue) =>{
                                            onChange(newValue?.id || null)
                                            getTotalWorking()
                                            }}
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
                  <Label>Leave Type</Label>
                  <Controller
                        name="leavetype"
                        defaultValue="" // Initial value can be set here
                        control={control}
                        render={({ field, fieldState: { error } }) => {
                            const { onChange, value, ref } = field;
                            return (
                                <>
                                    <Select
                                        onValueChange={(newValue) =>{ 
                                            onChange(newValue || null)
                                            checkLeaveStatus(newValue)
                                            }} // Use onChange directly
                                        value={value} // Set the value prop to the selected value
                                    >
                                        <SelectTrigger className="w-full bg-white">
                                            <SelectValue placeholder="Leave Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="EL">Earned Leave</SelectItem>
                                            <SelectItem value="CL">Casual Leave</SelectItem>
                                            <SelectItem value="FL">Festival Leave</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {error && <span className="text-red-500">{error.message}</span>} {/* Display error message if exists */}
                                </>
                            );
                        }}
                    />
                    <div className="flex flex-col space-y-8 md:flex-row md:space-x-8 md:space-y-0">
                
                    </div>
                    <Label>Select Date</Label>
                    <Controller
                        name="dateRange"  // Field name
                        control={control}
                        defaultValue={{
                        from: new Date().toISOString().slice(0, 10),
                        to: addDays(new Date().toISOString().slice(0, 10), 20),
                        }}
                        render={({ field: { value, onChange } }) => (
                        <CustomCalendar date={value} setDate={onChange} />
                        )}
                    />
                      <Label>Reason For Leave</Label>
                          <Textarea // Bind the value from react-hook-form
                           placeholder="Please provide a reason for your leave request"
                            className="resize-none"
                            {...register("reason")}
                            />
                      
                    <Button type="submit" disabled={disabled}>
                 Submit
                    </Button>
                    <Button variant="destructive" className="ml-2" onClick={onClose}>
                    Close
                    </Button>
                </form>

            </div>
            
        </div>
    </div>
  )
}

export default LeaveApplication