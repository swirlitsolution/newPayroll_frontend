import React, { useEffect, useState } from 'react'
import MisCard from './MisCard'
import usePost from '../../hooks/usePost'
import DataGrid from '../custom/DataGrid'
import { useNavigate } from 'react-router-dom'
const columns = [
  
    { field: 'employee__Site__name', headerName: 'Site', },
 
    { field: 'total_payable', headerName: 'Attendance' , renderCell:(params)=>params?.total_payable?.toFixed(2) },
    { field: 'total_basic', headerName: 'Basic', renderCell:(params)=>params.total_basic?.toFixed(2) },
    { field: 'total_da', headerName: 'DA' ,renderCell:(params)=> params.total_da?.toFixed(2) },
    { field: 'total_mrpotamt', headerName:"OT", renderCell:(params)=>params.total_mrpotamt?.toFixed(2) },
    { field: 'total_gross', headerName: 'Gross', renderCell:(params)=> params.total_gross?.toFixed(2) },
    { field: 'total_pf', headerName: 'PF', renderCell:(params)=> params.total_pf?.toFixed(2) },
    { field: 'total_esic', headerName: 'ESIC' ,renderCell:(params)=> params.total_esic?.toFixed(2) },
    { field: 'total_net', headerName: 'Net Amount', renderCell:(params)=> params.total_net?.toFixed(2) },
  ]
function Mis() {
    const { data, error, loading, postRequest, getRequest} = usePost(`/mis/`)
    const [summery, setSummery] = useState({
        attendance: 0,
        basic: 0,
        da: 0,
        ot:0,
        gross: 0,
        pf: 0,
        esic: 0,
        netamt: 0
    })
    const [dateData,setDateData] = useState({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
    })
    const navigate = useNavigate()
    const handleDateChange = (e)=>{
        const date = e.target.value.split("-")
        const year = date[0]
        const month = date[1]
        setDateData({
            month: month,
            year: year
        })
        getRequest(`/mis/${month}/${year}/`)
    }
    const handleRowClicked = (params)=>{
        console.log("row",params)
        navigate(`/payrollsummery?site=${params?.employee__Site__name}&month=${dateData.month}&year=${dateData.year}`)
    }
    useEffect(()=>{
      if(data){
        data?.grouped_data?.forEach((item)=>{
            setSummery((prev)=>{
                return {
                    ...prev,
                    attendance: prev.attendance + item.total_payable,
                    basic: prev.basic + item.total_basic,
                    da: prev.da + item.total_da,
                    ot: prev.ot + item.total_mrpotamt,
                    gross: prev.gross + item.total_gross,
                    pf: prev.pf + item.total_pf,
                    esic: prev.esic + item.total_esic,
                    netamt: prev.netamt + item.total_net
                }
            })
        })
      }
    },[data])
  return (
    <div className='w-full flex flex-wrap items-center justify-center'>
    <div className='w-full flex justify-center items-center gap-2 mt-4'>
        <h3 className='text-lg font-semibold'>MIS</h3>
        <input type="month"  id="month" onChange={handleDateChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        
    </div>
    <div>
        
    </div>
    <div className='w-full flex flex-wrap items-center justify-center gap-4 mt-4'>
     {data?.grouped_data?.length?  <MisCard 
        title="Summary"
        data={[
          { label: "Attendance", value: summery.attendance.toFixed(2) },
          { label: "Basic", value: summery.basic.toFixed(2) },
          { label: "DA", value: summery.da.toFixed(2) },
          { label: "OT", value: summery.ot.toFixed(2) },
          { label: "Gross", value: summery.gross.toFixed(2) },
          { label: "PF", value: summery.pf.toFixed(2) },
          { label: "ESIC", value: summery.esic.toFixed(2) },
          { label: "Net Amount", value: summery.netamt.toFixed(2) },
        ]}
      />:<p>Please Select month</p>}
    </div>
        {loading?"Loading......": data?.grouped_data?.length? 
                       ( <DataGrid 
                        heading="Attendance"
                        columns={columns} 
                        row={data?.grouped_data} 
                        rowClicked={handleRowClicked}
                        exportlayout="l"
                        />  )
                        :(
                      <div>Loading data</div>)}
    </div>
  )
}

export default Mis