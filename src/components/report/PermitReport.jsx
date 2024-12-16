import React, { useEffect } from 'react'
import CustomCalendar from '../custom/CustomCalendar'
import { Button } from '../ui/button'
import { useForm,Controller } from 'react-hook-form'
import { addDays,format  } from 'date-fns';
import usePost from '../../hooks/usePost';
import DataGrid from '../custom/DataGrid';
const columns = [
    {field:'created',headerName:'Date'},
    {field:'Gang',headerName:'Gang',renderCell:(params)=>params.employeeData.GangDetails.name},
    {field:'EmpId',headerName:'EmpId',width:'80px', renderCell:(params)=>params.employeeData.EmpId},
    {field:'Name',headerName:'Name', renderCell:(params)=>params.employeeData.Name},
    {field:'status',headerName:'Status'},
    {field:'ot',headerName:'Ot'},
    {field:'extrahour',headerName:'Extra Hour'},
    {field:'permitno',headerName:'Permit'},
]

function PermitReport(props) {
    const {control,register, handleSubmit,setValue, watch, formState: { errors } } = useForm()
    const { data, error, loading,postRequest } = usePost("/permitreport/")

    const onSubmit = (data)=>{
        const formattedData = {
            ...data,
            dateRange: {
              from: format(new Date(data.dateRange.from), 'yyyy-MM-dd'),
              to: format(new Date(data.dateRange.to), 'yyyy-MM-dd'),
            },
          };
          console.log("attendance data", formattedData);
        postRequest(formattedData)

        
    }
    const handleRowClicked = (params)=>{
        console.log(params)
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
                    <Button type="submitwa" >Submit</Button>
                
                </form>
              
            </div>
            </div>
        
            <div className='flex gap-2 w-full'>
            <div className="  w-[100%] ">
              {loading?"Loading......": data?.attendance?.length? 
               ( <DataGrid 
                heading="Attendance"
                columns={columns} 
                row={data?.attendance} 
                rowClicked={handleRowClicked}              
                exportlayout="l"
                />  ):(
              <div>No data available</div>)}
              </div>
            </div>
        </div>
      )
}

export default PermitReport