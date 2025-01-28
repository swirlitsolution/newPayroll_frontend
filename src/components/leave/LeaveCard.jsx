import React, { useRef, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion';
import { CalendarDays, Clock,ChevronDown, ChevronUp } from 'lucide-react'
import { Input } from '../ui/input'
function LeaveCard({
    employeeName,
    employeeAvatar,
    leaveType,
    startDate,
    endDate,
    status,
    user,
    remarks,
    id,
    ApproveLeave,
    RejectLeave
  }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [reject,setReject] = useState(false)
    const remarksRef = useRef(null)
    const statusColors = {
        approved: 'bg-green-500',
        pending: 'bg-yellow-500',
        rejected: 'bg-red-500'
      }
      const leaveTypeColors = {
        Vacation: 'bg-blue-500',
        'Sick Leave': 'bg-purple-500',
        Personal: 'bg-pink-500'
      }
      const getInitials = (name) => {
        return name
          .split(' ')
          .map(word => word[0])
          .join('')
          .toUpperCase()
          .slice(0, 2)
      }
     


    const RejectComponent = ()=>{
        return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-10" id="my-modal">
                    <div className="relative top-20 mx-auto p-2 border w-[50%] shadow-lg rounded-md bg-white">
                    <div className="p-2 space-y-4"  />
                    <div className='flex items-center justify-center gap-4'>
                    <label>{employeeName}</label>
                        <label>Remarks</label>
                        <Input type="text" ref={remarksRef} />
                        <Button onClick={()=>RejectLeave(id,remarksRef.current.value)}>Submit</Button>
                        <Button variant="destructive" onClick={()=>setReject(false)}>Close</Button>
                    
                    </div>
                        
                    </div>
                </div>
    }
  return (
    <Card className="w-full max-w-sm overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg ">

   <div className={`h-2 ${leaveTypeColors[leaveType] || 'bg-gray-500'}`} />
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 ring-2 ring-offset-2" style={{ringColor: statusColors[status]}}>
            <AvatarImage src={employeeAvatar} alt={employeeName} />
            <AvatarFallback className="text-lg font-semibold">{getInitials(employeeName)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-bold">{employeeName}</h3>
            <Badge variant="secondary" className="mt-1 font-medium">
              {leaveType}
            </Badge>
          </div>
        </div>
        <Badge variant="secondary" className={`${statusColors[status]} px-3 py-1 text-sm font-semibold text-white`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-gray-600">
          <CalendarDays className="h-5 w-5" />
          <span className="text-sm font-medium">
            {startDate} - {endDate}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="p-0"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </Button>
      </div>
    </CardContent>
    {reject?<RejectComponent />:""}
    <motion.div
      initial={false}
      animate={{ height: isExpanded ? 'auto' : 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden "
    >
      {user.is_superuser?
      <div>
      {status === 'pending' && (
        <CardFooter className="flex justify-end space-x-2 bg-gray-50 p-4">
          <Button variant="outline" onClick={()=>setReject(true)}>
            Reject
          </Button>
          <Button onClick={()=>ApproveLeave(id)}>Approve</Button>
        </CardFooter>
      )
      
      }
     
      </div>:<p>No action required</p>}
      {status === 'rejected' && (
        <p className='text-start p-2'><b>Reason for rejection  </b>: {remarks}</p>
      
      )
      
      }
    </motion.div>
  </Card>
)
}

export default LeaveCard