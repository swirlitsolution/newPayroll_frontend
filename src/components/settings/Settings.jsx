import React from 'react'
import Card from '../custom/Card'

function Settings() {


const cardlist = [
  {
    "heading":"User Management", 
    "paragraph":"Add, View and manage user role and permission", 
    "className":"bg-indigo-100 text-indigo-400",
    "renderComponent":"/manageuser",
    "icon":"UserRound"
  },
  {
    "heading":"Payroll Parameter", 
    "paragraph":"Set Payroll Parameter, Used to generate payroll",
    "className":"bg-purple-100 text-purple-400",
    "renderComponent":"/payrollparameter",
    "icon":"Settings2"
  },
  {
    "heading":"NH", 
    "paragraph":"Set NH as per Site",
    "className":"bg-orange-100 text-orange-400",
    "renderComponent":"/nh",
    "icon":"LocateFixed"
  },
  {
    "heading":"Tax Slave", 
    "paragraph":"Set Tax Slave as per Site",
    "className":"bg-orange-100 text-orange-400",
    "renderComponent":"/taxslave",
    "icon":"IndianRupee"
  }

]
  return (
    <div className='w-full flex flex-wrap'>
    {
        cardlist.map((item,index)=>{
            return <Card key={index} heading={item.heading} paragraph={item.paragraph} className={item.className} renderComponent={item.renderComponent} icon={item.icon} />
        })
    }
        
    </div>
  )
}

export default Settings