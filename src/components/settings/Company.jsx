import  { useEffect } from 'react'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Label } from "@/components/ui/label"
import useRequest from '../../hooks/useRequest'



function Company() {
    const {register, handleSubmit,setValue, formState: { errors } } = useForm()
    const { data, error, loading, onlypatchRequest} = useRequest(`/api/get/company/details`)  
    const onSubmit = (formdata)=>{
            console.log("updating details",formdata)
            onlypatchRequest('api/update/company/details',formdata)
        }
     useEffect(()=>{
            setValue('name',data?.name)
            setValue('address',data?.address)
            setValue('phone',data?.phone)
            setValue('email',data?.email)
            setValue('gstin',data?.gstin)
            setValue('cin',data?.cin)
            setValue('pan',data?.pan)
            setValue('logo',data?.logo)
            setValue('workNature',data?.workNature)
            setValue('contractEstablishment',data?.contractEstablishment)
            setValue('principleEmployer',data?.principleEmployer)
    
        },[data])
   return (
      <div className='w-full mt-4 '>
      <form onSubmit={handleSubmit(onSubmit)} className='flex  w-full mt-4 justify-center'>
     
          <div className='w-[60%] grid grid-cols-4 gap-2 text-start rounded-2xl border shadow-2xl items-center p-6'>
          <div className='w-full col-span-4 bg-gray-200 rounded-md p-2'>Company Details</div>
              <Label>Company Name</Label>
              <Input type="text" {...register("name",{required:true})} className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
              <Label>Address</Label>
              <Input type="text" {...register("address")} className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
              <Label>Phone</Label>
              <Input type="text" id="phone"  {...register("phone")}  className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />      
              <Label htmlFor='email'>Email</Label>
              <Input type="text" id="email"  {...register("email")}  className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />      
              <Label htmlFor='gstin'>GSTIN</Label>
              <Input type="text" id="gstin"  {...register("gstin")}  className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />      
              <Label htmlFor='cin'>CIN</Label>
              <Input type="text" id="cin"  {...register("cin")}  className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />      
              <Label htmlFor='pan'>PAN</Label>
              <Input type="text" {...register("pan")} className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
              <Label htmlFor='logo'>Logo URL</Label>
              <Input type="text" {...register("logo")} className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
              <Label htmlFor='worknature'>Nature and location of work</Label>
              <Input type="text" {...register("workNature")} className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
              <Label htmlFor='contractEstablishment'>Name and Address of Establishment in / under which constract is carried on</Label>
              <Input type="text" {...register("contractEstablishment")} className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
              <Label htmlFor='principleEmployer'>Name and Address of principle Employee</Label>
              <Input type="text" {...register("principleEmployer")} className='w-full text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
              
              <Button className=" col-span-2">{loading?"Saving.....":"Save"}</Button>
          </div>
      </form>
  </div>
    )
}

export default Company