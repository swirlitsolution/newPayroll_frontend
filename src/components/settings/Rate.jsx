import React, { useEffect, useState } from 'react'
import useRequest from '../../hooks/useRequest'
import { PlusCircleIcon } from 'lucide-react'
import { useForm,Controller } from 'react-hook-form'
import Master from '../master/Master'
import { Input } from '../ui/input'

function Rate() {
    const { data, error, loading, postRequest,onlypatchRequest,onlyputRequest} = useRequest("/master/categoryrate/") 
    const [display,setDisplay] = useState(false)
    const [editingId,setEditingId] = useState(null)
    const handleEdit = (id)=>{
        setEditingId(id)
        setDisplay(true)
    }
    const processRateUpdation = (id)=>{
        onlyputRequest(`/master/categoryrate/${id}/`,{process:true})
    }

    const UpdateRate = ()=>{
            const {control,register, handleSubmit,setValue,reset, formState: { errors } } = useForm()
            const onSubmit = (formData)=>{
                console.log(formData)
                if(!editingId){
                    postRequest(formData)
                    reset()
                }
                else{
                    onlypatchRequest(`/master/categoryrate/${editingId}/`,formData)
                    setEditingId(null)
                

                }
            }
        useEffect(()=>{
            if(editingId){
                if(Array.isArray(data)){
                const row = data?.find((row)=>row.id === editingId)
                console.log(row)
                setValue('Site',row.SiteDetails.name)
                setValue('category',row.category)
                setValue('basic',row.basic)
                setValue('da',row.da)
                }
                
            }
            else{
                reset()
            }
        },[editingId])
        return(
            <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-4 rounded-md">
                    <h3>Update Rate</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex m-2 gap-2">
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
                                            value={value} name='site' add={false}  mandatoryLabel = {true}/>
                            
                                        );
                                }}
                            />
                        </div>
                        <div className="flex m-2 gap-2">
                            <label>Category</label>
                            <select {...register('category')}>
                                <option value="UN-SKILLED">UN-SKILLED</option>
                                <option value="SKILLED">SKILLED</option>
                                <option value="SEMI-SKILLED">SEMI-SKILLED</option>
                                <option value="HIGH-SKILLED">HIGH-SKILLED</option>
                                <option value="OTHER">OTHER</option>
                            </select>
                        </div>
                        <div className="flex m-2 gap-2">
                            <label>Basic</label>
                            <Input type="text" {...register('basic')}  />
                        </div>
                        <div className="flex m-2 gap-2">
                            <label>DA</label>
                            <Input type="text" {...register('da')} />
                        </div>
                        <div className="flex justify-between m-2">
                            <button type='submit' className="bg-blue-500 text-white px-2 py-1 rounded-md">Save</button>
                            <button className="bg-blue-500 text-white px-2 py-1 rounded-md" onClick={()=>setDisplay(false)}>Close</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
  return (
    <div>
        <div className="flex justify-between items-center p-2 rounded-md shadow-md mt-2">
        <h3>Rate</h3>
        <button className="bg-blue-500 text-white px-2 py-1 rounded-md" onClick={()=>setDisplay(true)}><span className='flex'><PlusCircleIcon className='mr-2' /> Add</span></button>
        </div>
        {display && <UpdateRate />}
        {
            data?.length?
            <div className="border rounded-md overflow-x-auto w-full flex justify-center  scrollbar-thin h-full">
              
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th className="px-3 py-3 cursor-pointer">
                            Site
                        </th>
                        <th className="px-3 py-3 cursor-pointer">
                            Category
                        </th>
                        <th className="px-3 py-3 cursor-pointer">
                            Basic
                        </th>
                        <th className="px-3 py-3 cursor-pointer">
                            Da
                        </th>
                        <th className="px-3 py-3 cursor-pointer">
                            Action
                        </th>
                    
                        
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row, index) => (
                        <tr key={index} className="bg-white border-b">
                            <td className="px-3 py-3">{row.SiteDetails.name}</td>
                            <td className="px-3 py-3">{row.category}</td>
                            <td className="px-3 py-3">{row.basic}</td>
                            <td className="px-3 py-3">{row.da}</td>
                            <td className="px-3 py-3">
                                <button className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2" onClick={()=>handleEdit(row.id)}>Edit</button>
                                <button className="bg-blue-500 text-white px-2 py-1 rounded-md" onClick={()=>processRateUpdation(row.id)}>Process</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
               :<p>No Data Available</p>
        }
    </div>
  )
}

export default Rate