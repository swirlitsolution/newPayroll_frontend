import React, { useEffect } from 'react'
import axios from 'axios';


// Helper function to format numbers to 2 decimal places
const formatNumber = (value) => {
  if (value === null || value === undefined) return '0.00';
  return (parseFloat(value) || 0).toFixed(2);
};
function MinimumRate(props) {
     const [rateData,setRateData] = React.useState({})
   
     useEffect(() => {
         const category = {
            'UN-SKILLED': {'basic':0,'da':0},
            'SKILLED': {'basic':0,'da':0},
            'SEMI-SKILLED': {'basic':0,'da':0},
            'HIGH-SKILLED': {'basic':0,'da':0},
            'OTHER': {'basic':0,'da':0}
         }
         if (props.site) {
             
                      const getrate = async ()=>{
                        const response = await axios.get('/master/categoryrate/', {
                          headers: {
                            'Content-Type': 'application/json',
                          },
                        });
                        const cat = ['UN-SKILLED','SKILLED','SEMI-SKILLED','HIGH-SKILLED','OTHER']
                        const siterate = (response.data || []).filter(item => item.SiteDetails?.name === props.site);
                        cat.forEach(c=>{
                          const filtered = siterate.filter(item => item.category === c);
                          if (filtered.length) {
                            category[c] = {
                              basic: filtered[0]?.basic ?? 0,
                              da: filtered[0]?.da ?? 0
                            }
                          }
                        })
                        setRateData(category);
                      }
                
                          getrate();
                      } 
                    
            
           
               
                   
         console.log("rate data",rateData,rateData['UN-SKILLED']?.basic) 
           
        }, [props.site]);
  return (
     
        <div className='flex justify-center mb-4'>
        <table className='border-collapse border border-black text-xs'>
            <thead>
            <tr>
                <th colSpan={5} className='border border-black p-1 text-center font-bold'>Rate of Minimum Wages and Since the Date</th>
            </tr>
            <tr>
                <th className='border border-black p-1'></th>
                <th className='border border-black p-1 font-semibold'>Highly Skilled</th>
                <th className='border border-black p-1 font-semibold'>Skilled</th>
                <th className='border border-black p-1 font-semibold'>Semi-Skilled</th>
                <th className='border border-black p-1 font-semibold'>Un-Skilled</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td className='border border-black p-1 font-semibold'>Minimum Basic</td>
                <td className='border border-black p-1 text-center'> {formatNumber(rateData['HIGH-SKILLED']?.basic)}</td>
                <td className='border border-black p-1 text-center'>{formatNumber(rateData['SKILLED']?.basic)}</td>
                <td className='border border-black p-1 text-center'>{formatNumber(rateData['SEMI-SKILLED']?.basic)}</td>
                <td className='border border-black p-1 text-center'>{formatNumber(rateData['UN-SKILLED']?.basic)}</td>
            </tr>
            <tr>
                <td className='border border-black p-1 font-semibold'>DA</td>
                <td className='border border-black p-1 text-center'>{formatNumber(rateData['HIGH-SKILLED']?.da)}</td>
                <td className='border border-black p-1 text-center'>{formatNumber(rateData['SKILLED']?.da)}</td>
                <td className='border border-black p-1 text-center'>{formatNumber(rateData['SEMI-SKILLED']?.da)}</td>
                <td className='border border-black p-1 text-center'>{formatNumber(rateData['UN-SKILLED']?.da)}</td>
            </tr>
            <tr>
                <td className='border border-black p-1 font-semibold'>Over Time</td>
                <td className='border border-black p-1 text-center'>0.00</td>
                <td className='border border-black p-1 text-center'>0.00</td>
                <td className='border border-black p-1 text-center'>0.00</td>
                <td className='border border-black p-1 text-center'>0.00</td>
            </tr>
            </tbody>
        </table>
        </div>
  )
}

export default MinimumRate
