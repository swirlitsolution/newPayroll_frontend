import React from 'react'
import Card from '../custom/Card'

function Settings() {


  const cardlist = [
    {
      "heading":"Company",
      "paragraph":"View and update company details",
      "className":"bg-green-100 text-green-400",
      "renderComponent":"/company",
      "icon":"BriefcaseBusiness"
    },
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
    },
    {
      "heading":"Other Allowance", 
      "paragraph":"Applicable in MR Site Wise ",
      "className":"bg-gray-100 text-gray-400",
      "renderComponent":"/otherallowance",
      "icon":"IndianRupee"
    },
    {
      "heading":"Rate", 
      "paragraph":"Update rate category wise & site wise ",
      "className":"bg-yellow-100 text-yellow-400",
      "renderComponent":"/rateupdate",
      "icon":"BadgeDollarSign"
    },
    {
      "heading":"Site Config", 
      "paragraph":"Site Wise enable/disable configration ",
      "className":"bg-yellow-100 text-yellow-400",
      "renderComponent":"/siteconfig",
      "icon":"Settings2"
    }
    

  ]
  return (
    <div className='w-full flex flex-wrap items-center justify-center'>
    {
        cardlist.map((item,index)=>{
            return <Card key={index} heading={item.heading} paragraph={item.paragraph} className={item.className} renderComponent={item.renderComponent} icon={item.icon} />
        })
    }
        
    </div>
  )
}

export default Settings