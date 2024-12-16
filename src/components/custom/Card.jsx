import * as lucide from 'lucide-react'; // Import all icons as an object
import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Card(props) {
  const navigate = useNavigate();
  const [iconName, setIconName] = useState(props.icon); // State for the dynamic icon
  const IconComponent = lucide[iconName];
  const redirectTO = ()=>{
    navigate(props.renderComponent)
  }
  return (
    <motion.div whileTap={{scale:0.6}} className="w-80 h-60 flex flex-col justify-center items-center gap-2 p-7 m-4  shadow-xl rounded-xl border cursor-pointer " onClick={redirectTO}>
        <div className={`w-20 h-20 flex items-center text-cente p-4  rounded-[50%] ${props.className}` }>
            <IconComponent className="w-full h-20 "/>
        </div>
        <div className='flex flex-col text-center gap-y-2 w-full p-2'>
            <h2 className='text-lg font-semibold'>{props.heading}</h2>
            <p className=' text-gray-400 text-xs'>{props.paragraph}</p>
        </div>
        
    </motion.div>
  )
}

export default Card