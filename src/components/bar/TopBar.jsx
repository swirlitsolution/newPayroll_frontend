import React, { useState,useContext } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { motion } from 'framer-motion';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import { LogOut } from 'lucide-react';


const TopBar = () => {
    const [isMenu,setIsMenu] = useState(false)
    const {user,token, logout } = useContext(AuthContext);
    const [checked,setChecked] = useState(false)
    const cookies = new Cookies()
    const showMenu = () =>{
        setIsMenu(!isMenu)
        return;
    }
    function getRSBToken(username,password){
         const res = axios.get("http://192.168.50.158:8073/jderest/v2/tokenrequest", {
            auth: {
                username:username,
                password:password
            },
            headers: { 
                'Content-Type': 'application/json', 
                'Access-Control-Allow-Origin':'*'
            },
            withCredentials: false
       });
       res
       .then((response)=>{
         console.log("rsbtoken",response)
         const rec_response = response
         if(rec_response.status === 200){
          
           let rsbtoken = rec_response.data.userInfo.token
           cookies.set('rsbtoken',rsbtoken);
           setChecked(true)
         }
        else{
            setChecked(false)
        }
       
       })
       .catch((error)=>{
        setChecked(false)
         toast.warning('Try Again')
       })
   
       }
       function getRSBUser(){
         const res = axios.get("/getrsbuser/", {
           headers: {
               'Authorization': `Bearer ${token}`
           },
           withCredentials: true
       });
       res
       .then((response)=>{
         const rec_response = response
         console.log(response)
         if(rec_response.status === 200){
          getRSBToken(rec_response.data.username,rec_response.data.password)
           
         }
         else{
           console.log("Not valid response")
           setChecked(false)
         }
       
       })
       .catch((error)=>{
         console.log(error)
         setChecked(false)
       })
       }
    function handleSwitchChange(){
        getRSBUser()
       
    } 

    
 
  return (
    <header className='h-[10%] md:h-[10%] xsm:h-[10%] bg-white shadow w-full md:p-6 md:px-4 sm:p-2 sm:px-2'>
    {/* Header desktop view */}
        <div className='hidden md:flex h-full w-full items-center justify-between'>
       <p className=' font-bold'>Payroll</p>

       
            <div className="flex items-center gap-8">
           
                <span className='px-4 py-2 pointer flex items-center gap-3 hover:bg-slate-200 transition-all duration-100 ease-in-out'>
                    <p className='text-center text-xs'> {user.username}<br /> {user.profile?user.profile.fname?user.profile.fname:"":""}</p>
                </span>
                <div className="relative cursor-pointer">
                <Avatar whileTap={{scale:0.6}}
                    alt="userProfile" 
                    className='w-10 min-w-[40px] min-h-[40px] drop-shadow-2xl rounded-full' 
                    onClick={showMenu}>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
               
                </Avatar>

                    {
                        isMenu && (
                        <motion.div 
                            initial={{opacity : 0, scale : 0.6}}
                            animate={{opacity : 1, scale : 1}}
                            exit={{opacity : 0, scale : 0.6}}
                             className="absolute z-10 flex flex-col w-40 bg-gray-50 shadow-xl top-12 right-0">
                       
                       
                        <button onClick={()=>logout()} className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out'>
                        Logout <LogOut />
                        </button>
                    </motion.div>
                        )
                    }
                    
                </div>
                
            </div>
        </div>


    {/* Header mobile view */}
    <div className='flex h-full w-full items-center p-2 justify-between md:hidden'>
    <p className=' font-bold'>Payroll</p>
            <div className="flex items-center gap-4 pr-2 justify-center">
            <span className='px-4 py-2 pointer flex items-center gap-3 hover:bg-slate-200 transition-all duration-100 ease-in-out'>
                       <p className='text-center text-xs'> {user.username}<br /> {user.profile?user.profile.fname?user.profile.fname:"":""}</p>
                        </span>
                <div className="relative cursor-pointer">
                <motion.img whileTap={{scale:0.6}} 
                    src={ Avatar} 
                    alt="userProfile" 
                    className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl rounded-full' 
                    onClick={showMenu}
                    />
                    {
                        isMenu && (
                        <motion.div 
                            initial={{opacity : 0, scale : 0.6}}
                            animate={{opacity : 1, scale : 1}}
                            exit={{opacity : 0, scale : 0.6}}
                             className="absolute flex flex-col w-40 bg-gray-50 shadow-xl top-12 right-0">
                       
                        <p  className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out'>
                        Logout <LogOut />
                        </p>
                    </motion.div>
                        )
                    }
                    
                </div>
                
            </div>
        </div>
    </header>
 
  )
}

export default TopBar
