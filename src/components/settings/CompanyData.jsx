import React from 'react'

function CompanyData({company}) {
  return (
    <div className='w-full'>
        <div className='font-bold text-lg'>Company Details</div>
        <div className='grid grid-cols-2 gap-2 mt-2'>
            <div>
                <div className='font-semibold'>Name:</div>
                <div>{company?.name}</div>
            </div>
            <div>
                <div className='font-semibold'>Address:</div>   
                <div>{company?.address}</div>
            </div>
            <div>
                <div className='font-semibold'>Phone:</div>
                <div>{company?.phone}</div>
            </div>
            <div>
                <div className='font-semibold'>Email:</div>
                <div>{company?.email}</div>
            </div>
            <div>
                <div className='font-semibold'>GSTIN:</div>
                <div>{company?.gstin}</div>
            </div>
            <div>
                <div className='font-semibold'>CIN:</div>
                <div>{company?.cin}</div>   
            </div>
            <div>
                <div className='font-semibold'>PAN:</div>
                <div>{company?.pan}</div>
            </div>
            <div>
                <div className='font-semibold'>Work Nature:</div>
                <div>{company?.workNature}</div>
            </div>
            <div>
                <div className='font-semibold'>Contract Establishment:</div>
                <div>{company?.contractEstablishment}</div>
            </div>
            <div>
                <div className='font-semibold'>Principle Employer:</div>
                <div>{company?.principleEmployer}</div>
            </div>
        </div>

    </div>
  )
}

export default CompanyData