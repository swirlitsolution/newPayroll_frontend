import React, { useEffect, useState } from 'react'
import useRequest from '../../hooks/useRequest'
import LeaveCard from './LeaveCard'
import { AuthContext } from '../../AuthContext';
import { useContext } from 'react'
import { Button } from '../ui/button'
import LeaveAppliation from './LeaveApplication'
import { Controller, useForm } from 'react-hook-form'
import CustomCalendar from '../custom/CustomCalendar'
import { addDays,format } from 'date-fns'
import { Label } from "@/components/ui/label"

function NewLeave() {
    const { data, error, loading,onlypatchRequest,onlyputRequest } = useRequest('/master/leave/')
    const {user} = useContext(AuthContext);
    const [newLeave,setNewLeave] = useState(false)
    const { control, register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm()
    const [leaveData,setLeaveData] = useState(null)
    const formatedDate = (datestr)=>{
      const [year, month, day] = datestr.split("-");
      return `${day}-${month}-${year}`
    }

 
  const onSubmit = (formdata)=>{
    const startDate = format(new Date(formdata.dateRange.from), 'yyyy-MM-dd')
    const enddate = format(new Date(formdata.dateRange.to), 'yyyy-MM-dd')
    const filteredleave = data.filter((item)=> item.applydate >=startDate && item.applydate <=enddate)
    setLeaveData(filteredleave)

  }
  const onReject = (id,remarks)=>{
    onlyputRequest("/master/leave/"+id+"/",{remarks})
  }
  const onApprove = (id)=>{
    onlypatchRequest("/master/leave/"+id+"/",{id})
  }
  useEffect(()=>{
    if(data?.length){
      setLeaveData(data)
    }
  },[data])
  return (
    <div className='w-full flex justify-between'>
        <div className='w-full m-2'>
        <div className='flex justify-between mb-2'>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 w-full flex items-center gap-2">
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

              <Button type="submit">
                Search
              </Button>
          </form>
          <Button onClick={()=>setNewLeave(true)} className="float-right mb-2 mr-4">New</Button>
        </div>
        {newLeave?<LeaveAppliation user={user} onClose={()=>setNewLeave(false)} />:""}
        <div className='w-full grid grid-cols-3 gap-4 justify-center items-center'>

        {
          loading?
          "Loading......":
           leaveData?.length?
            leaveData.map((item)=>
              <LeaveCard 
              key={item.id}
              id={item.id}
                employeeName={item.employeedata.Name}
                employeeAvatar={item.employeedata.ImageUrl}
                leaveType={item.leavetype}
                startDate={formatedDate(item.leaveFrom)}
                endDate={formatedDate(item.leaveTo)}
                user = {user}
                remarks = {item.rejectRemarks}
                ApproveLeave = {onApprove}
                RejectLeave = {onReject}
                status={item.approved?"approved":item.rejected?"rejected":"pending"}
              />
         
              )
            :
              <div>No data available</div>
          }
        </div>
        
        </div> 
     
    </div>
  )
}

export default NewLeave