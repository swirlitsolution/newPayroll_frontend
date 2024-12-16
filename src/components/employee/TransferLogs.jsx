import React from 'react'
import CustomCalendar from '../custom/CustomCalendar'
import { Button } from '../ui/button'
import { useForm,Controller } from 'react-hook-form'
import { addDays,format  } from 'date-fns';
import usePost from '../../hooks/usePost';
import DataGrid from '../custom/DataGrid';

const columns = [
    {field:'created',headerName:'Date',renderCell:(params)=>{
        var created = params.created;
        return `${created.split('T')[0]} ${created.split('T')[1].split('.')[0]}`
    }},
    {field:'fromgang',headerName:'From Gange'},
    {field:'togang',headerName:'To Gange'},
    {field:'empid',headerName:'EmpId'},
    {field:'name',headerName:'Name'},
]

function TransferLogs(props) {
    const {control, handleSubmit } = useForm()
    const { data, error, loading,getRequest } = usePost("/transfer/")
    const onSubmit = (data)=>{
      
        const formattedData = {
            ...data,
            dateRange: {
              from: format(new Date(data.dateRange.from), 'yyyy-MM-dd'),
              to: format(new Date(data.dateRange.to), 'yyyy-MM-dd'),
            },
          };
          console.log("attendance data", formattedData);
       
        getRequest(`/transfer/?from=${formattedData.dateRange.from}&to=${formattedData.dateRange.to}`)
        

        
    }
    return (
        <div className="flex flex-col overflow-x-hidden overflow-y-auto gap-2 mt-2 w-full">
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
    
                  
                    <Button type="submit" >Process</Button>
                
                </form>
              
            </div>
            </div>
        
            
            {loading?"Loading......": data?.results?.length?(<DataGrid 
              heading="Employees"
              columns={columns} 
              row={data?.results} 
      
             
              />):(
                <div>No data available</div>
              )}
           
        </div>
      )
    }

export default TransferLogs