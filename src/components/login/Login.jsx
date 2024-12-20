import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../../AuthContext';
import { Key, UserRound } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const {user, login } = useContext(AuthContext);
    
    if(user){
        navigate('/home')
    }  
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
 
        await login(username, password);
        navigate('/home');
    };

    return (
      <section className="flex w-full h-screen justify-center items-center bg-[#356c7c]">
    
        <div className="container w-full">
                <div className="grid grid-rows-1 bg-no-repeat bg-center">
                    <div className="grid grid-cols-1 justify-center justify-items-center mt-4">
                    
                        <div className="bg-white shadow-md rounded-md border-0 w-[280px] p-4">
                            <div className="text-center md:text-center">
                                <h1 className="mb-0 text-lg font-medium">
                                    PAYROLL
                                </h1>
                                <div className="flex flex-col justify-center items-center ">
                                      <div  className=" w-full p-4">
                                      <form  onSubmit={handleSubmit}>

                                
                                        <div className="flex items-start flex-col w-full mb-2">
                                            <label htmlFor="email" className="font-medium text-sm mb-2">Username</label>
                                            <div className="flex flex-wrap justify-center items-center relative border-2 rounded-lg w-full h-10">
                                               <UserRound className='font-medium w-1/6' />
                                                <input type="text"  name="username" className="block border-l-2 border-indigo-500 p-2 w-5/6 h-full"  />
                                            </div>
                                        </div>
                                        <div className="flex items-start flex-col w-full mt-4">
                                            <label htmlFor="password" className="font-medium text-sm mb-2">Password</label>
                                            <div className="flex flex-wrap justify-center items-center relative border-2 rounded-lg w-full h-10">
                                               <Key className='font-medium w-1/6' />
                                                <input type="password" name="password"  className="block p-2 w-5/6 border-l-2 border-indigo-500 h-full" />
                                            </div>
                                        </div>
                                   
                                   
                                      <div className="w-full p-4">
                                        <motion.input whileTap={{scale:0.6}} type='submit' className="text-white bg-gray-800 font-medium text-center cursor-pointer text-sm py-2 px-2 rounded-md w-full"
                                           value="Sign In" />
                                          
                                      </div>
                                      </form>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                
            
            </div>
    
            
        </section>

    );
};

export default Login;
