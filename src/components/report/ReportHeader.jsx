import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCompany } from '../../Redux/Slices/CompanySlice';
import { useCompanyQuery } from '../../hooks/useCompanyQuery';
import { Controller, useForm } from 'react-hook-form';
import HeaderMaster from '../master/HeaderMaster';
import { Button } from '../ui/button';
import usePost from '@/hooks/usePost';
function ReportHeader() {
    const {data, error, loading, putapiRequest } = usePost("")
     const { control, register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm()
    const dispatch = useDispatch();
    const {company} = useSelector(state => state.Company);
    const {site} = useSelector(state => state.Site);
    
    const { companyData, isLoading } = useCompanyQuery(); // get current selected company data
    const onSubmit = (data)=>{
        
        putapiRequest(`api/companyworkmap/update/${company?.id}/`,data) // update company details for report header
    
    }
    console.log("company",company,"companydata",companyData)
    useEffect(()=>{
        
        dispatch(setCompany(companyData));
       

    
    },[companyData])
    useEffect(()=>{
        setValue("company",company?.companydata?.name)
            setValue("contractestablishment",company?.contractdata?.name)
            setValue("worknature",company?.worknaturedata?.name)
            setValue("principleemployer",company?.principledata?.name)
    },[company])

    if (isLoading) return  <p>Loading ....</p>
  return (
    <div>
        <div className="p-4 bg-white shadow-md rounded-md mb-4">
            {company?.id && (
                  
                <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-2 flex flex-col gap-4">
                    <div className='w-full flex justify-between '>
                        <div className="text-start w-[50%]">
                            <h2 className="text-lg font-semibold">Nature & Address of Contractor.   :</h2>
                             <div className='w-[300px]   '>
                                <Controller
                                name="company"
                                defaultValue={company?.companydata?.name} // Initial value can be set here
                                control={control}
                                render={({ field, fieldState: { error } }) => {
                                    const { onChange, value, ref } = field;
                                    return (
                                        <HeaderMaster
                                            api="api/company/details/"
                                            onValueChange={(newValue) => onChange(newValue || null)}
                                            value={value} name='company' add={false}  mandatoryLabel = {true}/>
                            
                                        );
                                }}
                            />
                             </div>
                            <p className="text-sm text-gray-600">{company?.companydata?.address || <p className='text-red-400'>Reset all again</p>}</p>
                        </div>
                        <div className=" text-end  w-[50%]">
                            <h2 className="text-lg font-semibold">Name & Address of the Establishment</h2>
                            <p className="text-sm text-gray-600">Under Which Contract is carried on </p>
                            <div className=' float-end'>
                            <Controller
                                name="contractestablishment"
                                defaultValue={company?.contractdata?.name} // Initial value can be set here
                                control={control}
                                render={({ field, fieldState: { error } }) => {
                                    const { onChange, value, ref } = field;
                                    return (
                                        <HeaderMaster
                                            api="api/contractestablishment/"
                                            onValueChange={(newValue) => onChange(newValue || null)}
                                            value={value} name='contractestablishment' add={true}  mandatoryLabel = {true}/>
                            
                                        );
                                }}
                            />
                            </div>
                          
                        </div>
                    </div>
                    <div className='w-full flex justify-between'>
                        <div className="text-start  w-[50%]">
                            <h2 className="text-lg font-semibold">Name & Location of Work  </h2>
                            <div className=' w-[300px]'>
                            <Controller
                                name="worknature"
                                defaultValue={company?.worknaturedata?.name} // Initial value can be set here
                                control={control}
                                render={({ field, fieldState: { error } }) => {
                                    const { onChange, value, ref } = field;
                                    return (
                                        <HeaderMaster
                                            api="api/worknature/"
                                            onValueChange={(newValue) => onChange(newValue || null)}
                                            value={value} name='worknature' add={true}  mandatoryLabel = {true}/>
                            
                                        );
                                }}
                            />
                            </div>
                        </div>
                        <div className="text-end  w-[50%]">
                            <h2 className="text-lg font-semibold">Name & Address of Principal Employer   :</h2>
                            <div className=' float-end'>
                                <Controller
                                    name="principleemployer"
                                    defaultValue={company?.principledata?.name} // Initial value can be set here
                                    control={control}
                                    render={({ field, fieldState: { error } }) => {
                                        const { onChange, value, ref } = field;
                                        return (
                                            <HeaderMaster
                                                api="api/principleemployer/"
                                                onValueChange={(newValue) => onChange(newValue || null)}
                                                value={value} name='principleemployer' add={true}  mandatoryLabel = {true}/>
                                
                                            );
                                    }}
                                />
                            </div>
                        </div>
                        
                    </div>
                    <Button type="submit" className='w-20 bg-blue-500 text-white rounded-md p-2 self-end'>{isLoading?"Saving...":"Save"}</Button>
                </form>
            )}
        </div>
    </div>
  )
}

export default ReportHeader