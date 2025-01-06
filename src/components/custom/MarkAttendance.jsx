import React, { useEffect } from 'react'
import { X } from 'lucide-react';
import { useForm,Controller  } from "react-hook-form";
import { Backdrop, CircularProgress } from '@mui/material';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from '../ui/button';
import usePost from '../../hooks/usePost';
import { toast } from 'react-toastify';




function MarkAttendance(props) {
    const {control,register, handleSubmit,setValue, watch, formState: { errors } } = useForm()
    const { data, loading,postRequest,getRequest} = usePost("/markattendance/")
    const onSubmit = (data)=>{
        console.log("attendance data",data)
        postRequest(data)

        
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
            console.log("bel",bel,"bcl",bcl,"bfl",bfl)
            return {bel,bcl,bfl}
        }
        catch{
            console.log("bel",bel,"bcl",bcl,"bfl",bfl)
            return {bel,bcl,bfl}
        }
            
    }
    const getTotalWorking =  (value)=>{
        var empid = watch('EmpId')
        var attanDate = watch('attanDate') 
        const leavevalue = ['EL','CL','FL']
        const leave = leavevalue.includes(value)
        if(leave){
           const res =  getRequest(`/gettotalworkingday/${empid}/${attanDate}/`)
           res
           .then((response)=>{
            if(response.data?.worked){
                var balance = getBalanceLeave(response?.data)
                console.log("you selected ",value,balance)
                if(value === "EL"){
                    if(balance?.bel>0){
                        toast.success(`Balance EL is ${balance?.bel}`)
                    }
                    else{
                        toast.error(`Balance EL is ${balance?.bel}`)
                        setValue('status','A')
                    }
                }
                else if(value === "CL"){
                    if(balance?.bcl>0){
                        toast.success(`Balance CL is ${balance?.bcl}`)
                    }
                    else{
                        toast.error(`Balance CL is ${balance?.bcl}`)
                        setValue('status','A')
                    }
                }
                else if(value === "FL"){
                    if(balance?.bfl>0){
                        toast.success(`Balance FL is ${balance?.bfl}`)
                    }
                    else{
                        toast.error(`Balance FL is ${balance?.bfl}`)
                        setValue('status','A')
                    }
                }
                    
            }
            else{
                console.log("No data")
                setValue('status','A')
                toast.error("No earned leave till now.")
            }
           })
           .catch((error)=>{
            console.log("error during fetching total working day",error)
           })
            
        }
  
    }
 
    useEffect(()=>{
        console.log("marking attendance for",props.rowData)
      
        const setFormValue = ()=>{
            const savedData = localStorage.getItem('permitno');
            console.log(savedData)
            if (savedData) {
                setValue('permitno',savedData)
            }
            else{
                toast.warning("Please enter permit no.")
            }
            const today = new Date();
            const formattedDate = today.toISOString().slice(0, 10); // YYYY-MM-DD format
            setValue('attanDate',formattedDate)
            setValue('EmpId',props.rowData?.employee.EmpId)
            setValue('Name',props.rowData?.employee.Name)
            setValue('status',props.rowData?.attendance_status.status)
            setValue('ot',props.rowData?.attendance_status.ot)
            setValue('extrahour',props.rowData?.attendance_status.extrahour)
        }
        setFormValue()
    },[])

  return (
    <div>
    
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-left">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Attendance</h3>
                    <button className="text-gray-400 hover:text-gray-500" onClick={()=>props.showDialog()}>
                    <X className="h-6 w-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <label htmlFor="permitno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Permit No</label>
                <input type="text" disabled={true} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="permitno" {...register("permitno", {required: true, maxLength: 80})} />
                
                <label htmlFor="attanDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                <input type="date" disabled={true} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="attanDate" {...register("attanDate", {required: true, maxLength: 80})} />
                
                <label htmlFor="empid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">EmpId</label>
                <input type="text" disabled={true} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="empid" {...register("EmpId", {required: true, maxLength: 80})} />
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input type="text" disabled={true} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="name" {...register("Name")} />
                <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
               
                <Controller
                        name="status"
                        defaultValue={props.rowData?.status} // Initial value can be set here
                        control={control}
                        render={({ field, fieldState: { error } }) => {
                            const { onChange, value, ref } = field;
                       
                            return (
                                <>
                                    <Select
                                        onValueChange={(newValue) => {
                                            onChange(newValue || null)
                                            getTotalWorking(newValue)
                                           
                                            }} // Use onChange directly
                                        value={value} // Set the value prop to the selected value
                                    >
                                        <SelectTrigger className="w-full bg-white">
                                            <SelectValue placeholder="Select Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="P">Present</SelectItem>
                                            <SelectItem value="A">Absent</SelectItem>
                                            <SelectItem value="EL">EL</SelectItem>
                                            <SelectItem value="CL">CL</SelectItem>
                                            <SelectItem value="FL">FL</SelectItem>
                                            <SelectItem value="NH">NH</SelectItem>
                                            <SelectItem value="PN">PN</SelectItem>
                                            <SelectItem value="O">Off</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {error && <span className="text-red-500">{error.message}</span>} {/* Display error message if exists */}
                                </>
                            );
                        }}
                    />
                <label htmlFor="ot" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">OT</label>
                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="ot" {...register("ot")} />
                <label htmlFor="extrahour" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Extra Hour</label>
                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="extrahour" {...register("extrahour")} />
               
                <div className='flex gap-2'>
                {
                    props.loading? 
                        <Button variant="contained">Saving</Button>
                        :
                        <Button  type='submit' >Save</Button>
                }
                </div>
        
                </form>
            </div>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={props.loading}
                >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    </div>
</div>
  )
}

export default MarkAttendance