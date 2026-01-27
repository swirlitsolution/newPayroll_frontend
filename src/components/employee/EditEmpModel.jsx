import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { MoveLeft, Search } from 'lucide-react'
import { NavLink, useParams } from 'react-router-dom'
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CircularProgress from '@mui/material/CircularProgress';
import Cookies from 'universal-cookie';
import Box from '@mui/material/Box';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import axios from 'axios';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Master from '../master/Master';
import useRequest from '../../hooks/useRequest';

function EditEmpModel({emp}) {
     const { control, register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm()
        const [bank, setBank] = useState(null)
        const [ifserror, setIfscError] = useState(null)
        const [iloading, setILoading] = useState(false)
        const [auto, setAuto] = useState(false)
        const [id,setId] = useState(0)
      
    
        const onSubmit = (empdata) => {
            console.log(empdata)
            putRequest(empdata)
        }
        const handleIfsc = async () => {
    
            setILoading(true)
            const ifsc = watch('ifsc')
            if (ifsc?.length > 4) {
                try {
                    const response = await axios.get("https://ifsc.razorpay.com/" + `${ifsc}`);
                    console.log(response.data)
                    setBank(response.data); // Axios automatically parses the response as JSON
                    setValue('Bank', response.data?.Bank)
                    setValue('Branch', response.data?.Branch)
                    setValue('Ifsc', response.data?.Ifsc)
                } catch (err) {
                    if (axios.isCancel(err)) {
                        console.log('Fetch aborted');
                    } else {
                        setIfscError(err); // Set the error state for other errors
                    }
                } finally {
                    setILoading(false);
                }
            }
        }
        const getNextEmpId = async () => {
            try {
                const response = await axios.get("/empid/");
    
                console.log(response.data); // Axios automatically parses the response as JSON
                setValue('EmpId', response.data.empid)
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log('Fetch aborted');
                } else {
                    console.log(err); // Set the error state for other errors
                }
            } finally {
                console.log("done");
            }
        }
    
        useEffect(() => {
            if (auto === true) {
                getNextEmpId()
            }
            else {
                setValue('EmpId', "0")
            }
        }, [auto])
        useEffect(() => {
            console.log("employee data is ", emp)
            if(emp){
                setId(emp?.id)
                setValue("Site", emp?.SiteDetails_name)
                setValue("EmpId", emp?.EmpId)
                setValue("Name", emp?.Name)
                setValue("Father", emp?.Father)
                setValue("Dob", emp?.Dob)
                setValue("Gender", emp?.Gender)
                setValue("MaritalStatus", emp?.MaritalStatus)
                setValue("Imageurl", emp?.Imageurl)
                setValue("Department", emp?.DepartmentDetails_name)
                setValue("Designation", emp?.DesignationDetails_name)
                setValue("Gang", emp?.GangDetails_name)
                setValue("Uan", emp?.Uan)
                setValue("Esic", emp?.Esic)
        
                setValue("Mobile", emp?.Mobile)
                setValue("Email", emp?.Email)
                setValue("EmpSafetyCard", emp?.EmpSafetyCard)
                setValue("SafetyCardExpiry", emp?.SafetyCardExpiry)
                setValue("Aadhar", emp?.Aadhar)
                setValue("Pan", emp?.Pan)
                setValue("Address", emp?.Address)
                setValue("Bank", emp?.Bank)
                setValue("Branch", emp?.Branch)
                setValue("Ifsc", emp?.Ifsc)
                setValue("Ac", emp?.Ac)
                setValue("Otslave", emp?.Otslave)
                setValue("Ottype", emp?.Ottype)
                setValue("Paymentmode", emp?.Paymentmode)
                setValue("Weekoff", emp?.Weekoff)
                setValue("Skill", emp?.Skill)
                setValue("Doj", emp?.Doj)
                setValue("Status", emp?.Status)
                setValue("PfApplicable", emp?.PfApplicable)
                setValue("EsicApplicable", emp?.EsicApplicable)
                setValue("PRFTax", emp?.PRFTax)
                setValue("AttendAllow", emp?.AttendAllow)
                setValue("AllowAsPer", emp?.AllowAsPer)
                setValue("ReversePF", emp?.ReversePF)
                setValue("OtAppl", emp?.OtAppl)
                setValue("MrOtAppl", emp?.MrOtAppl)
            }
    
        }, [emp])
  return (
      <div className="flex flex-col overflow-x-hidden overflow-y-auto gap-2">
            
    
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex gap-2 w-full'>
                        <div className="overflow-x-auto bg-gray-50  px-4 py-2 rounded-lg border border-gray-200 shadow-sm h-[550px] w-[70%] ">
    
                            <div className='flex flex-col '>
                                <div>
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
                                                    value={value} name='site' add={true}  mandatoryLabel = {true}/>
                                   
                                                );
                                        }}
                                    />
    
                                </div>
                                <div className='flex felx-col gap-2'>
                                    <Label htmlFor='empid' className='text-right '>EmpId<span className='text-red-500 text-lg'>*</span></Label>
                                    <Label htmlFor='Auto' className=''>Auto</Label>
                                    <Input type="checkbox" id="Auto" onChange={() => setAuto(!auto)} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
    
                                    <Input type='text' className='bg-white'  {...register("EmpId")} id='empid' />
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-x-2 gap-y-2 mt-4 items-center'>
                                <Label htmlFor='name' className=' text-left'>Name<span className='text-red-500 text-lg'>*</span></Label>
                                <Input type='text' {...register("Name")} className='bg-white' id='name' />
                                <Label htmlFor='father' className='text-left'>Father</Label>
                                <Input type='text'  {...register("Father")} className='bg-white' id='father' />
                                <Label htmlFor='dob' className='text-left'>Dob</Label>
                                <Input type='date'  {...register("Dob")} className='bg-white' id='dob' />
                                <Label htmlFor='gender' className=' text-left'>Gender</Label>
    
                                <Controller
                                    name="Gender"
                                    defaultValue="" // Initial value can be set here
                                    control={control}
                                    render={({ field, fieldState: { error } }) => {
                                        const { onChange, value, ref } = field;
    
                                        return (
                                            <>
                                                <Select
                                                    onValueChange={(newValue) => onChange(newValue || null)} // Use onChange directly
                                                    value={value} // Set the value prop to the selected value
                                                >
                                                    <SelectTrigger className="w-full bg-white">
                                                        <SelectValue placeholder="Gender" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="MALE">MALE</SelectItem>
                                                        <SelectItem value="FEMALE">Female</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                {error && <span className="text-red-500">{error.message}</span>} {/* Display error message if exists */}
                                            </>
                                        );
                                    }}
                                />
    
                                <Label htmlFor='marital' className='text-left'>Merital Status</Label>
                                <Controller
                                    name="MaritalStatus"
                                    defaultValue="" // Initial value can be set here
                                    control={control}
                                    render={({ field, fieldState: { error } }) => {
                                        const { onChange, value, ref } = field;
                                        return (
                                            <>
                                                <Select
                                                    onValueChange={(newValue) => onChange(newValue || null)} // Use onChange directly
                                                    value={value} // Set the value prop to the selected value
                                                >
                                                    <SelectTrigger className="w-full bg-white">
                                                        <SelectValue placeholder="Merital" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="MARRIED">MARRIED</SelectItem>
                                                        <SelectItem value="UNMARRIED">UNMARRIED</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                {error && <span className="text-red-500">{error.message}</span>} {/* Display error message if exists */}
                                            </>
                                        );
                                    }}
                                />
    
                                <Label htmlFor='Imageurl' className='text-left'>Image Url</Label>
                                <Input type='text' className='bg-white' id='Imageurl' {...register("Imageurl")} />
    
                                <div className='col-span-2'>
                                    <Controller
                                        name="Department"
                                        defaultValue="" // Initial value can be set here
                                        control={control}
                                        render={({ field, fieldState: { error } }) => {
                                            const { onChange, value, ref } = field;
                                            return (
                                                <Master
                                                    api="/master/department/"
                                                    onValueChange={(newValue) => onChange(newValue || null)}
                                                    value={value} name='department' add={true} mandatoryLabel={true} />
                                            );
                                        }}
                                    />
    
                                </div>
                                <div className='col-span-2'>
                                    <Controller
                                        name="Designation"
                                        defaultValue="" // Initial value can be set here
                                        control={control}
                                        render={({ field, fieldState: { error } }) => {
                                            const { onChange, value, ref } = field;
                                            return (
                                                <Master
                                                    api="/master/designation/"
                                                    onValueChange={(newValue) => onChange(newValue || null)}
                                                    value={value} name='designation' add={true} mandatoryLabel={true} />
                                            );
                                        }}
                                    />
    
                                </div>
                                <div className='col-span-2'>
                                    <Controller
                                        name="Gang"
                                        defaultValue="" // Initial value can be set here
                                        control={control}
                                        render={({ field, fieldState: { error } }) => {
                                            const { onChange, value, ref } = field;
                                            return (
                                                <Master
                                                    api="/master/gang/"
                                                    onValueChange={(newValue) => onChange(newValue || null)}
                                                    value={value} name='gang' add={true} />
                                            );
                                        }}
                                    />
    
                                </div>
                                <Label htmlFor='uan' className='text-left'>UAN</Label>
                                <Input type="text" id="uan" {...register("Uan")} className='w-full  bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                                <Label htmlFor='esic' className='text-left'>ESIC</Label>
                                <Input type="text" id="esic" {...register("Esic")} className='w-full  bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                                <Label htmlFor='mobile' className='text-left'>Mobile</Label>
                                <Input type="text" id="mobile" {...register("Mobile")} className='w-full  bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                                <Label htmlFor='email' className='text-left'>Email</Label>
                                <Input type="email" id="email" {...register("Email")} className='w-full  bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                                <Label htmlFor='safetyno' className='text-left'>Safety No</Label>
                                <Input type="text" id="safetyno" {...register("EmpSafetyCard")} className='w-full  bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                                <Label htmlFor='safetyexpiry' className='text-left'>Safety Card expiry</Label>
                                <Input type="date" id="safetyexpiry" {...register("SafetyCardExpiry")} className='w-full  bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                                <Label htmlFor='aadhar' className='text-left'>Aadhar<span className='text-red-500 text-lg'>*</span></Label>
                                <Input type="text" id="aadhar" {...register("Aadhar")} className='w-full  bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                                <Label htmlFor='pan' className='text-left'>Pan</Label>
                                <Input type="text" id="pan" {...register("Pan")} className='w-full  bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
    
                                <Label htmlFor='address' className='text-left'>Address</Label>
                                <Input type="text" id="address" {...register("Address")} className='w-full  bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                                <Label htmlFor='bank' className='text-left'>Bank</Label>
                                <Input type="text" id="bank" {...register("Bank")} className='w-full  bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                                <Label htmlFor='branch' className='text-left'>Branch</Label>
    
                                <Input type="text" id="branch" {...register("Branch")} className='w-full  bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
    
                                <Label htmlFor='ifsc' className='text-left'>IFSC</Label>
                                <div className='flex items-center gap-1'>
                                    <Input type="text" id="ifsc" {...register("Ifsc")} className='w-full  bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
    
                                    <Dialog>
                                        <DialogTrigger>
                                            <span onClick={handleIfsc}>
                                                <Search className='cursor-pointer' />
                                            </span>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Bank Details</DialogTitle>
                                                <DialogDescription>
                                                    {iloading ?
                                                        <Box sx={{ display: 'flex' }}>
                                                            <CircularProgress />
                                                        </Box>
                                                        :
                                                        <div className='grid grid-cols-2 gap-2 w-full'>
                                                            <div>Name</div>
                                                            <div>{bank?.BANK}</div>
                                                            <div>Bank Code</div>
                                                            <div className='w-full'>{bank?.BANKCODE}</div>
                                                            <div>MICR</div>
                                                            <div className='w-full'>{bank?.MICR}</div>
                                                            <div>IFSC</div>
                                                            <div>{bank?.IFSC}</div>
                                                            <div>Branch</div>
                                                            <div>{bank?.BRANCH}</div>
                                                            <div>Address</div>
                                                            <div className='w-full'>{bank?.ADDRESS}</div>
                                                            <div>District</div>
                                                            <div className='w-full'>{bank?.DISTRICT}</div>
                                                        </div>
                                                    }
                                                </DialogDescription>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
    
                                </div>
                                <Label htmlFor='acno' className='text-left'>AC / No</Label>
                                <Input type="text" id="acno" {...register("Ac")} className='w-full  bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                                <Label className='text-left'>OT Slave</Label>
                                <Controller
                                    name="Otslave"
                                    defaultValue="" // Initial value can be set here
                                    control={control}
                                    render={({ field, fieldState: { error } }) => {
                                        const { onChange, value } = field;
    
                                        return (
                                            <>
                                                <Select
                                                    onValueChange={(newValue) => onChange(newValue || null)} // Use onChange directly
                                                    value={value} // Set the value prop to the selected value
                                                >
                                                    <SelectTrigger className="w-full bg-white">
                                                        <SelectValue placeholder="Select slave" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="1">1</SelectItem>
                                                        <SelectItem value="8">8</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                {error && <span className="text-red-500">{error.message}</span>} {/* Display error message if exists */}
                                            </>
                                        );
                                    }}
                                />
                                <Label className='text-left'>OT Type</Label>
                                <Controller
                                    name="Ottype"
                                    defaultValue="" // Initial value can be set here
                                    control={control}
                                    render={({ field, fieldState: { error } }) => {
                                        const { onChange, value } = field;
    
                                        return (
                                            <>
                                                <Select
                                                    onValueChange={(newValue) => onChange(newValue || null)} // Use onChange directly
                                                    value={value} // Set the value prop to the selected value
                                                >
                                                    <SelectTrigger className="w-full bg-white">
                                                        <SelectValue placeholder="Select Type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="SINGLE">SINGLE</SelectItem>
                                                        <SelectItem value="DOUBLE">DOUBLE</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                {error && <span className="text-red-500">{error.message}</span>} {/* Display error message if exists */}
                                            </>
                                        );
                                    }}
                                />
                                <Label className='text-left'>Payment Mode</Label>
                                <Controller
                                    name="Paymentmode"
                                    defaultValue="" // Initial value can be set here
                                    control={control}
                                    render={({ field, fieldState: { error } }) => {
                                        const { onChange, value } = field;
    
                                        return (
                                            <>
                                                <Select
                                                    onValueChange={(newValue) => onChange(newValue || null)} // Use onChange directly
                                                    value={value} // Set the value prop to the selected value
                                                >
                                                    <SelectTrigger className="w-full bg-white">
                                                        <SelectValue placeholder="Select mode" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="SALARY">SALARY</SelectItem>
                                                        <SelectItem value="WAGES">WAGES</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                {error && <span className="text-red-500">{error.message}</span>} {/* Display error message if exists */}
                                            </>
                                        );
                                    }}
                                />
                                <Label className='text-left'>Week Off</Label>
                                <Controller
                                    name="Weekoff"
                                    defaultValue="" // Initial value can be set here
                                    control={control}
                                    render={({ field, fieldState: { error } }) => {
                                        const { onChange, value } = field;
    
                                        return (
                                            <>
                                                <Select
                                                    onValueChange={(newValue) => onChange(newValue || null)} // Use onChange directly
                                                    value={value} // Set the value prop to the selected value
                                                >
                                                    <SelectTrigger className="w-full bg-white">
                                                        <SelectValue placeholder="Select week" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="SUNDAY">SUNDAY</SelectItem>
                                                        <SelectItem value="MONDAY">MONDAY</SelectItem>
                                                        <SelectItem value="TUESDAY">TUESDAY</SelectItem>
                                                        <SelectItem value="WEDNESDAY">WEDNESDAY</SelectItem>
                                                        <SelectItem value="THURSDAY">THURSDAY</SelectItem>
                                                        <SelectItem value="FRIDAY">FRIDAY</SelectItem>
                                                        <SelectItem value="SATURDAY">SATURDAY</SelectItem>
    
                                                    </SelectContent>
                                                </Select>
                                                {error && <span className="text-red-500">{error.message}</span>} {/* Display error message if exists */}
                                            </>
                                        );
                                    }}
                                />
                                <Label className='text-left'>Category</Label>
                                <Controller
                                    name="Skill"
                                    defaultValue="" // Initial value can be set here
                                    control={control}
                                    render={({ field, fieldState: { error } }) => {
                                        const { onChange, value } = field;
    
                                        return (
                                            <>
                                                <Select
                                                    onValueChange={(newValue) => onChange(newValue || null)} // Use onChange directly
                                                    value={value} // Set the value prop to the selected value
                                                >
                                                    <SelectTrigger className="w-full bg-white">
                                                        <SelectValue placeholder="Select category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="UN-SKILLED">UN-SKILLED</SelectItem>
                                                        <SelectItem value="SKILLED">SKILLED</SelectItem>
                                                        <SelectItem value="SEMI-SKILLED">SEMI-SKILLED</SelectItem>
                                                        <SelectItem value="HIGH-SKILLED">HIGH-SKILLED</SelectItem>
                                                        <SelectItem value="OTHER">OTHER</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                {error && <span className="text-red-500">{error.message}</span>} {/* Display error message if exists */}
                                            </>
                                        );
                                    }}
                                />
                                <Label className='text-left'>DOJ</Label>
                                <Input type="date" {...register("Doj")} className='w-full  bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                                <Label className='text-left'>Status<span className='text-red-500 text-lg'>*</span></Label>
                                <Controller
                                    name="Status"
                                    defaultValue="" // Initial value can be set here
                                    control={control}
    
                                    render={({ field, fieldState: { error } }) => {
                                        const { onChange, value } = field;
    
                                        return (
                                            <>
                                                <Select
                                                    onValueChange={(newValue) => onChange(newValue || null)} // Use onChange directly
                                                    value={value} // Set the value prop to the selected value
                                                >
                                                    <SelectTrigger className="w-full bg-white">
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                                                        <SelectItem value="IN-ACTIVE">IN-ACTIVE</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                {error && <span className="text-red-500">{error.message}</span>} {/* Display error message if exists */}
                                            </>
                                        );
                                    }}
                                />
                            </div>
    
    
    
                        </div>
                        <div className="overflow-x-auto bg-gray-50  p-1 rounded-lg border border-gray-200 shadow-sm w-[30%] h-auto ">
                            <div className='w-full h-[225px]'>
                                <img src={watch("Imageurl") || "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-173524.jpg"} className='w-full h-full rounded-lg' />
    
                            </div>
                            <div className='w-full grid grid-cols-4 gap-2 px-4 items-center mt-4 text-left'>
                                <Input type="checkbox" id="pfappl"  {...register("PfApplicable")} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
    
                                <Label htmlFor='pfappl' className='col-span-3'>Pf Applicable</Label>
                                <Input type="checkbox" id="esicappl"  {...register("EsicApplicable")} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                                <Label htmlFor='esicappl' className='col-span-3'>ESIC Applicable</Label>
                                <Input type="checkbox" id="prftax"  {...register("PRFTax")} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                                <Label htmlFor='prftax' className='col-span-3'>PRF Tax Applicable</Label>
                                <Input type="checkbox" id="attendallow"  {...register("AttendAllow")} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                                <Label htmlFor='attendallow' className='col-span-3'>Attendance Allowance</Label>
                                <Input type="checkbox" id="allowasper"  {...register("AllowAsPer")} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                                <Label htmlFor='allowasper' className='col-span-3'>Allowance as per day</Label>
                                <Input type="checkbox" id="reversepf"  {...register("ReversePF")} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                                <Label htmlFor='reversepf' className='col-span-3'>Reverse Pf</Label>
                                <Input type="checkbox" id="otappl"  {...register("OtAppl")} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                                <Label htmlFor='otappl' className='col-span-3'>OT Applicable</Label>
                                <Input type="checkbox" id="mrotappl"  {...register("MrOtAppl")} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                                <Label htmlFor='mrotappl' className='col-span-3'>MR OT Applicable</Label>
                                <Button type="submit" className=' col-span-4 mt-4'>Save</Button>
                                <NavLink to={'/rate/' + id + "/"} className=' col-span-4 mt-2 p-2 bg-black rounded-md text-center text-white'>Rate</NavLink>
                            </div>
    
    
                        </div>
                    </div>
                </form>
            </div>
  )
}

export default EditEmpModel