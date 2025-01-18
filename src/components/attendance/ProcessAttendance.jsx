import React from 'react'
import CustomCalendar from '../custom/CustomCalendar'
import { Button } from '../ui/button'
import { useForm,Controller } from 'react-hook-form'
import { addDays,format  } from 'date-fns';
import usePost from '../../hooks/usePost';
import { Input } from '../ui/input';

function ProcessAttendance(props) {
      const {control,register, handleSubmit,setValue, watch, formState: { errors } } = useForm()
    const { data, error, loading,postRequest,deleteAllRequest } = usePost("/processattendance/")

    const onSubmit = (data)=>{
      
        const formattedData = {
            ...data,
            dateRange: {
              from: format(new Date(data.dateRange.from), 'yyyy-MM-dd'),
              to: format(new Date(data.dateRange.to), 'yyyy-MM-dd'),
            },
          };
          console.log("attendance data", formattedData);
          if(data.initial){
            deleteAllRequest("/processattendance/")
          }
          else{
            postRequest(formattedData)

          }

        
    }
  return (
    <div className="flex flex-col overflow-x-hidden overflow-y-auto gap-2 mt-2">
        <div className="bg-white rounded-lg shadow p-2 border-2">
        <div className="flex justify-between items-center gap-2">
            <div className=' text-center'>
            <h3 className="font-bold">{props?.heading.toUpperCase()}</h3>

            </div>
          
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 items-center justify-center">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">Date Range</label>
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
                {
                  
                  props.delete?<div className='flex gap-x-2 justify-center items-center text-center'>
                  <Input type="checkbox" id="initial"  {...register("initial")}  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">Intilize</label>
                
                  </div>
                  :""


                }
                
               
                <Button type="submit" >Process</Button>
            
            </form>
          
        </div>
        </div>
    
        <div className='flex gap-2 w-full'>
        
        </div>
    </div>
  )
}

export default ProcessAttendance