import * as lucide from 'lucide-react'; // Import all icons as an object
import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';



function MisCard(props) {
      const navigate = useNavigate();
      const [iconName, setIconName] = useState(props.icon); // State for the dynamic icon
      const IconComponent = lucide[iconName];
      const redirectTO = ()=>{
        navigate(props.renderComponent)
      }
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-[600px] flex flex-col justify-center items-center gap-4 m-4 shadow-lg rounded-xl border border-gray-200 bg-white cursor-pointer transition-all duration-300 hover:shadow-2xl"
      onClick={redirectTO}
    >
      <div className={`w-full h-10 flex items-center justify-center p-2 rounded-t-xl bg-indigo-600 text-white ${props.className}`}>
       
        <h3 className="text-lg font-semibold">{props.title}</h3>
      </div>
      <div className="grid grid-cols-2  text-left gap-4 w-full p-4">
        {props.data.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-600 font-semibold">{item.label}</span>
            <span className="text-gray-400 font-bold">{item.value}</span>
          </div>
        ))}
        
      </div>
     
    </motion.div>
  );
}

export default MisCard