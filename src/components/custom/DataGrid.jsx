import  {useRef, useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import useImportExport from '../../hooks/useImportExport'
import { Checkbox } from '../ui/checkbox'
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

const getValue = (item, field) => {
  // Split field by '.' to handle nested properties
  const fields = field.split('.');
  return fields.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : ''), item);
};



function DataGrid({heading,columns,row,checkBoxSelection,rowClicked,Increament,Decreament,exportlayout}) {
  const [filterBy,setFilterBy] = useState('')
  const [searchValue,setSearchValue] = useState('')
  const [tableData,setTableData] = useState(row)
  const  { exportToExcel, exportToPDF, isExporting } = useImportExport(exportlayout?exportlayout:"p")
  const tableRef = useRef(null);
  const handleGenerateExcel = () => {
    // Get the HTML table data
    const table = tableRef.current;
    
    // Create a workbook and add the table data
    const wb = XLSX.utils.table_to_book(table, { sheet: "Sheet 1" });
    
    // Write the workbook to Excel and trigger download
    XLSX.writeFile(wb, 'reportdocument.xlsx');
  };
  const handleGeneratePDF = () => {
    const doc = new jsPDF(
      {
        orientation: exportlayout,
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts:true
       }
    );
  
    // Capture the HTML table and add it to the PDF
    doc.autoTable({ html: tableRef.current , margin: { top: 5, left: 5, right: 5, bottom: 5 },});

    // Save the generated PDF
    doc.save('table.pdf');
  };
  const handleSearch = ()=>{
    if(searchValue.length > 3){
      const data = row.filter((element)=>{
         return columns.find((col) => {
       
          if(col.field === filterBy){
            let cellValue = col.renderCell ? col.renderCell(element) : getValue(element, col.field);
            if(`${cellValue}`.toLowerCase().includes(`${searchValue}`.toLowerCase())) {
              return element
            }
          }
          
        })
        // element[filterBy].toLowerCase().includes(searchValue.toLowerCase()) 
      
      })
      setTableData(data)
    }
    else{
      setTableData(row)
      
    }
  }
  return (
    <div className="flex flex-col overflow-x-hidden overflow-y-auto gap-2">
        <div className="bg-white rounded-lg shadow p-2 border-2">
          <div className="flex justify-between items-center pl-2">
            <h3 className=" font-bold">{heading.toUpperCase()}</h3>
            <div className="relative flex justify-around gap-2">
         
              <Select onValueChange={(value)=>setFilterBy(value)}>
                  <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter By" />
                    </SelectTrigger>
                    <SelectContent>

                      {columns.map((key) => (
                        
                            <SelectItem  value={key.field} key={key.field}> {key.headerName.charAt(0).toUpperCase() + key.headerName.slice(1)}</SelectItem>
                          
                            
                          
                        ))}
                    </SelectContent>
              </Select>
              <div className='flex gap-2 items-center pr-2'>
                <Input
                  type="text"
                  placeholder="Search..."
                  onChange={(e)=>setSearchValue(e.target.value)}
                 
                  className="pl-8 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                  <Search className=' cursor-pointer hover:text-indigo-600'  onClick={handleSearch} />
              </div>
              <Menubar >
                  <MenubarMenu>
                    <MenubarTrigger>Export</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem onClick={handleGenerateExcel}>
                        Excel
                      </MenubarItem>
                      <MenubarItem onClick={handleGeneratePDF}>
                        Pdf
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm h-[500px] scrollbar-thin">
        <table className="w-full text-sm text-left text-gray-500" ref={tableRef}>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
                        {
                          checkBoxSelection?<th><Input type="checkbox"  className='w-4 h-4 mx-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' /></th>:""
                        }
            {columns.map((row) => (
                <th
                  key={row.field}
                  className="px-3 py-3 cursor-pointer border-r-2 border-b-2"
                  style={{width:row.width}}
                >
                   <div className="flex justify-between items-center">
                    {row.headerName}
                  
                    </div>
                </th>
              ))}
              
            </tr>
          </thead>
          <tbody>
     
          {tableData?.map((item) => (
              <tr key={item.id} className="bg-white border-b hover:bg-gray-50"  onClick={rowClicked ? () => rowClicked(item) : undefined}>
              {
                          checkBoxSelection?<td><Input type="checkbox"  className='w-4 h-4 mx-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' /></td>:""
                        }
              {columns.map((col) => {
                let cellValue = col.renderCell ? col.renderCell(item) : getValue(item, col.field);
              
                return (
                  <td key={col.field} className="px-3 py-2 text-nowrap cursor-pointer border-r-2" style={{width:col.width}}>
                          {cellValue}
                       
                      </td>
                      );
                    })}

         

              </tr>
         
          ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center">
        <div>
        
        </div>
        <div className="space-x-2">
          <Button
           
           
            variant="outline"
            onClick={()=>Decreament(-1)}
          >
            Previous
          </Button>
          <Button
            onClick={()=>Increament(+1)}
            variant="outline"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DataGrid