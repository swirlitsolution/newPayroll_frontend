import React, { useEffect, useState } from 'react'
import useRequest from '../../hooks/useRequest';
import DataGrid from '../custom/DataGrid';
import { Button } from '../ui/button'
import Master from './Master'
import { Input } from '../ui/input'
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from 'react-hook-form';
import { Plus, X } from "lucide-react"
const columns = [
    {field:'site',headerName:'Site',renderCell:(params)=>params.SiteDetails.name},
    {field:'fromamt',headerName:'From Amt'},
    {field:'toamt',headerName:'To Amt'},
    {field:'amt',headerName:'Amt'},
]
function TaxSlave() {
    const { data, error, loading, postRequest} = useRequest("/master/taxslave/")
    const { control, register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm()
    
    const navigate = useNavigate();
    const [newslave,setNewslave] = useState(false)

    const onSubmit = (formdata)=>{
      postRequest(formdata)
    }
    const handleRowClicked = (params)=>{
        navigate(`/taxslave/${params.id}`, { id: params.id });
    }
    const NewTaxSlave = ()=>{
     

      return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-10" id="my-modal">
                <div className="relative top-20 mx-auto p-2 border w-[30%] shadow-lg rounded-md bg-white">
                  <div className=" space-y-2">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-900">Tax Slave</h3>
                        <button className="text-gray-400 hover:text-gray-500" onClick={()=>setNewslave(false)}>
                        <X className="h-6 w-6" />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className='flex items-center justify-center w-full'>
                        <div className="overflow-x-auto bg-gray-50 mt-4  px-4 py-2 rounded-lg border border-gray-200 shadow-sm  w-full ">

                          <div className='flex flex-col gap-4 text-left '>
                                
                            <Controller
                              name="Site"
                              defaultValue="" // Initial value can be set here
                              control={control}
                              render={({ field, fieldState: { error } }) => {
                                  const { onChange, value, ref } = field;
                                  return (
                                      <Master
                                          api="/master/site/"
                                          onValueChange={(newValue) => onChange(newValue || null)}
                                          value={value} name='Site' add={false}  mandatoryLabel = {true}/>
                          
                                          );
                              }}
                              />
                            <div className='grid grid-cols-2 gap-y-2 w-full'>
                              <Label>From Amt</Label>
                              <Input type="text" {...register("fromamt")}  className='bg-white ' />
                              <Label>To Amt</Label>
                              <Input type="text" {...register("toamt")}  className='bg-white ' />
                              <Label>Amt</Label>
                              <Input type="text" {...register("amt")}  className='bg-white ' />
                            </div>
                            <Button type="submit">Save</Button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
    }
  return (
    <div className='flex flex-col'>
      {newslave?<NewTaxSlave />:<div></div>}
      <div className="m-2">
      <Button className=" float-end" onClick={()=>setNewslave(!newslave)}><Plus />New</Button>
      </div>
      
      <div className='w-full'>
        
        {loading?"Loading......": data?.length?(<DataGrid 
              heading="Tax Slave"
              columns={columns} 
              row={data} 
      
              rowClicked={handleRowClicked}

              />):(
                <div>No data available</div>
              )} 
        </div>
    </div>
  )
}

export default TaxSlave