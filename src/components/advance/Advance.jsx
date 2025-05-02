import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '../ui/input'
import { CheckCheck, CrossIcon, IndianRupee, Loader2, Plus, X } from 'lucide-react'
import useRequest from '../../hooks/useRequest'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronDown, DollarSign, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AdvanceForm from './AdvanceForm'
import { toast } from 'react-toastify'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { AuthContext } from '../../AuthContext';
  
const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  }
  
  const statusIcons = {
    pending: Clock,
    approved: CheckCircle,
    rejected: XCircle
  }
function Advance() {
    const { data, error, loading,onlyputRequest,onlypatchRequest } = useRequest("/master/advance/");
    const [isSubmitting,setIsSubmitting] = useState(false)
    const [newForm,setNewForm] = useState(false)
    const [advanceData,setAdvanceData] = useState(null)
    
   
    const handleStatusChange = (id,remarks,status)=>{
        if(status === "approved"){
            onlypatchRequest("/master/advance/"+id+"/",{status})
        }
        else if(status === "rejected"){
            // ON reject
            onlyputRequest("/master/advance/"+id+"/",{remarks,status})
        }
        else{
            toast.warning("Something went wrong")
        }
    }
    
    const AdvanceFilter = (filterby)=>{
        console.log(filterby)
       if(filterby === "all"){
        setAdvanceData(data)
       }
       else if(filterby === "approved"){
        setAdvanceData(data.filter((item)=>item.approved === true))
       }
       else if(filterby === "rejected"){
        setAdvanceData(data.filter((item)=>item.rejected === true))
        
       }
       else if(filterby === "pending"){
        setAdvanceData(data.filter((item)=>item.approved === false && item.rejected === false))
        
       }
    }
    const AdvanceCard = ({ advance, onStatusChange })=>{
        const [isExpanded, setIsExpanded] = useState(false)
        const status = advance.approved?"approved":advance.rejected?"rejected":"pending"
        const StatusIcon = statusIcons[status]
        const [reject,setReject] = useState(false)
        const [deduction,setDeduction] = useState(false)
        const {user} = useContext(AuthContext);
       const handledeductionchange = (e)=>{
        setDeduction(e.target.checked)
        if(!e.target.checked){
            onlyputRequest("/advancededuction/"+advance.id+"/",{installment:0,deduction:e.target.checked})
        }
           
            
        }
        const Deductionamtcomponent = ()=>{
            const deductionamt = useRef(null)
            const [deductionfrom,setDeductionFrom] = useState(null)
            const handledeductionsubmit = (id,deductionamount)=>{
                if(deductionamt.current.value === ""){
                    toast.warning("Please enter deduction amount")
                }
                else{
                    onlyputRequest("/advancededuction/"+id+"/",{installment:deductionamount,deductionfrom:deductionfrom,deduction:true})
                }
            }
            return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-10" id="my-modal">
                        <div className="relative top-20 mx-auto p-2 border w-[80%] shadow-lg rounded-md bg-white">
                        <div className="p-2 space-y-4"  />
                        <div className='flex flex-col  gap-4 text-start'>
                            <label>Deduction From</label>
                            <select name="deductionfrom" id="deductionfrom" onChange={(e)=>setDeductionFrom(e.target.value)} className='w-full p-2 border rounded-md'>
                                <option value="">Select Deduction From</option>
                                <option value="payroll">PAYROLL</option>
                                <option value="ot">OT</option>
                            </select>
                            <label>Installment Amount</label>
                            <Input type="text" ref={deductionamt} />
                            
                            <div className='flex justify-between w-full'>
                            <Button onClick={()=>handledeductionsubmit(advance.id,deductionamt.current.value)}>Submit</Button>
                            <Button variant="destructive" onClick={()=>setDeduction(false)}>Close</Button>
                            </div>
                        </div>
                            
                        </div>
                    </div>
        }
    
        
        const RejectComponent = ()=>{
            const remarksRef = useRef(null)

            return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-10" id="my-modal">
                        <div className="relative top-20 mx-auto p-2 border w-[80%] shadow-lg rounded-md bg-white">
                        <div className="p-2 space-y-4"  />
                        <div className='flex flex-col items-center justify-center gap-4 text-start'>
                            <label>Remarks</label>
                            <Input type="text" ref={remarksRef} />
                            <div className='flex justify-between w-full'>
                            <Button onClick={()=>onStatusChange(advance.id,remarksRef.current.value)}>Submit</Button>
                            <Button variant="destructive" onClick={()=>setReject(false)}>Close</Button>
                            </div>
                        </div>
                            
                        </div>
                    </div>
        }
        return (
            <motion.div
            layout
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className={isExpanded?" row-span-3":""}
            >
            {reject?<RejectComponent />:""}
            {deduction?<Deductionamtcomponent />:""}
            <Card className="mb-4 overflow-hidden">
                <CardContent className="p-0">
                <div 
                    className="p-4 cursor-pointer flex items-center justify-between"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${advance?.employeedata?.Name}`} />
                        <AvatarFallback>{advance?.employeedata?.Name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-semibold text-lg">{advance?.employeedata?.Name} - {advance?.employeedata?.EmpId}</h3>
                        <p className="text-sm text-gray-500">{new Date(advance.applydate).toLocaleDateString()}</p>
                    </div>
                    </div>
                    <div className="flex items-center space-x-2">
                    <Badge className={`${statusColors[status]} px-2 py-1 hover:text-white rounded-full`}>
                        <StatusIcon className="w-4 h-4 mr-1" />
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                    </motion.div>
                    </div>
                </div>
                <AnimatePresence>
                    {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center text-gray-700">
                            <DollarSign className="w-5 h-5 mr-2" />
                            <span className="font-medium">Amount:</span>
                            </div>
                            <span className="text-lg font-semibold">${advance.amount.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center text-gray-700">
                            <Calendar className="w-5 h-5 mr-2" />
                            <span className="font-medium">Applied on:</span>
                            </div>
                            <span>{new Date(advance.applydate).toLocaleDateString()}</span>
                        </div>
                        {
                            advance.approved?<div className="flex items-center justify-between mb-4">
                            <div className="flex items-center text-gray-700">
                            <Calendar className="w-5 h-5 mr-2" />
                            <span className="font-medium">Approved on:</span>
                            </div>
                            <span>{new Date(advance.approoveddate).toLocaleDateString()}</span>
                        </div>:""
                        }
                        {
                          user.is_superuser?  advance?.approved?<div className="flex items-center justify-between mb-4">
                            <div className="flex items-center text-gray-700">
                           {advance?.deduction? <CheckCheck className="w-5 h-5 mr-2" />:<X className='w-5 h-5 mr-2 text-red-600' />}
                            <span className="font-medium">Deduction:</span>
                            </div>
                            <Input type="checkbox" id="deduction" onChange={handledeductionchange}  checked={advance?.deduction} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                            
                        </div>:""
                        :""
                        }
                        {
                            advance?.approved?<div className="flex items-center justify-between mb-4">
                            <div className="flex items-center text-gray-700">
                           <IndianRupee className="w-5 h-5 mr-2" />
                            <span className="font-medium">Installment:</span>
                            </div>
                            <span>{advance.installment}</span>
                        </div>:""
                        }
                        {
                            advance.rejected?<div className="flex items-center justify-between mb-4">
                            <div className="flex items-center text-gray-700">
                            <Calendar className="w-5 h-5 mr-2" />
                            <span className="font-medium">Rejected on:</span>
                            </div>
                            <span>{new Date(advance.rejecteddate).toLocaleDateString()}</span>
                        </div>:""
                        }
                        <div className='grid grid-cols-2 w-full text-start'>
                        <b>Advance Reason : </b>
                            <p className="text-gray-600 mb-4 text-start  ">{advance.reason}</p>
                        {advance?.rejected?<div className='w-full grid grid-cols-2 text-start col-span-2'><b>Rejection Reason : </b>
                        <p className="text-gray-600 mb-4 text-start  ">{advance.rejectedRemarks}</p>
                    </div>:""}
                        
                        </div>
                       {status === 'pending' && (
                            <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() =>setReject(true)}>Deny</Button>
                            <Button onClick={() => onStatusChange(advance.id,advance.reason, 'approved')}>Approve</Button>
                            </div>
                        )}
                        </div>
                    </motion.div>
                    )}
                </AnimatePresence>
                </CardContent>
            </Card>
            </motion.div>
        )
        }
useEffect(()=>{
if(data){
    setAdvanceData(data)
}
},[data])
  return (
    <div className='flex flex-col justify-between items-center'>
        <div className='w-full p-2'>
            <Button className="float-right" onClick={()=>setNewForm(true)}><Plus /> New</Button>
        </div>
        {newForm?<AdvanceForm closeModel={()=>setNewForm(false)} />:""}

        <div className='w-full p-2'>
            <motion.div className='' layout>
                <AnimatePresence>
                    <FormControl>
                       
                        <RadioGroup
                            aria-labelledby="radio-filter"
                            defaultValue="all"
                            name="filterby"
                            onChange={(e)=>AdvanceFilter(e.target.value)}
                            row
                        >
                            <FormControlLabel value="all" control={<Radio />} label="All" />
                            <FormControlLabel value="approved" control={<Radio />} label="Approved" />
                            <FormControlLabel value="rejected" control={<Radio />} label="Rejected" />
                            <FormControlLabel value="pending" control={<Radio />} label="Pending" />
                        </RadioGroup>
                    </FormControl>
                </AnimatePresence>
            </motion.div>
            <motion.div className='h-full overflow-y-scroll pr-2' layout>
                <AnimatePresence>
                <div className='w-full grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2 items-start '>
                    {advanceData?.length?advanceData.map((advance) => (
                        <AdvanceCard key={advance.id} advance={advance} onStatusChange={handleStatusChange} />
                    )):<div className='w-full flex justify-center items-center xl:col-span-3 md:col-span-2 '> <Loader2 className="mr-2 h-4 w-4 animate-spin" />Loading ....</div>}
                </div>
                </AnimatePresence>
            </motion.div>
        </div>
    </div>
  )
}

export default Advance