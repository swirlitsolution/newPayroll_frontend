import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  setCompany } from '../../Redux/Slices/CompanySlice';
import { useCompanyQuery } from '../../hooks/useCompanyQuery';
function ReportHeader() {
    
    const dispatch = useDispatch();
    const {company} = useSelector(state => state.Company);
    const { companyData, isLoading } = useCompanyQuery(); // get current selected company data
    
    useEffect(()=>{
       
        dispatch(setCompany(companyData));
    
    },[companyData])
    if (isLoading) return  <p>Loading ....</p>
  return (
    <div>
        <div className="p-4 bg-white shadow-md rounded-md mb-4">
            {company && (
                <div className="w-full mt-2 flex flex-col gap-4">
                    <div className='w-full flex justify-between '>
                        <div className="text-start w-[50%]">
                            <h2 className="text-lg font-semibold">Nature & Address of Contractor.   :</h2>
                            <p className="text-sm text-gray-600">{company.name}</p>
                            <p className="text-sm text-gray-600">{company.address}</p>
                        </div>
                        <div className=" text-end  w-[50%]">
                            <h2 className="text-lg font-semibold">Name & Address of the Establishment</h2>
                            <p className="text-sm text-gray-600">Under Which Contract is carried on </p>
                            <p className="text-sm text-gray-600">{company.contractEstablishment}</p>
                        </div>
                    </div>
                    <div className='w-full flex justify-between'>
                        <div className="text-start  w-[50%]">
                            <h2 className="text-lg font-semibold">Name & Location of Work  </h2>
                            <p className="text-sm text-gray-600">{company?.workNature}</p>
                        </div>
                        <div className="text-end  w-[50%]">
                            <h2 className="text-lg font-semibold">Name & Address of Principal Employer   :</h2>
                            <p className="text-sm text-gray-600">{company?.principleEmployer}</p>
                        </div>
                        
                    </div>
                    
                </div>
            )}
        </div>
    </div>
  )
}

export default ReportHeader