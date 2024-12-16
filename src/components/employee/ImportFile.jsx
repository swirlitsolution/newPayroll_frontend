
import { useState, useCallback,useRef } from 'react'
import * as XLSX from 'xlsx'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, FileSpreadsheet, FileSpreadsheetIcon, Upload, X } from "lucide-react"
import usePost from '../../hooks/usePost'

function ImportFile({heading,closeModel,newItem, api}) {
    const [sheetData, setSheetData] = useState([])
    const [headers, setHeaders] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [cError, setcError] = useState(null)
    const [submissionStatus, setSubmissionStatus] = useState({})
    const { data, error, loading,postRequest,putapiRequest } = usePost(api)
    const [isSending, setIsSending] = useState(false)
   
    console.log("submition is ",submissionStatus)
    const excelDateToJSDate = (num) => {
        const utcDays = num - 25569; // Offset for Excel's epoch (Jan 1, 1900)
        const utcValue = utcDays * 86400; // Convert days to seconds
        const mydate = new Date(utcValue * 1000)

        return String(formatDate(mydate)); // Convert to milliseconds
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

  const handleFileUpload = useCallback((e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsLoading(true)
    setcError(null)

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const bstr = event.target?.result
        const xdata = new Uint8Array(bstr)
        const wb = XLSX.read(xdata, {type:'array',cellDates:true,dateNF: 'dd/MM/yyyy'})
        const wsname = wb.SheetNames[0]
        const ws = wb.Sheets[wsname]
        const data = XLSX.utils.sheet_to_json(ws, {raw:false,dateNF:'yyyy-mm-dd'})
        const updatedData = data.map(row => {
       
            
            row['Dob'] = excelDateToJSDate(row['Dob']); // Format to yyyy-mm-dd
            row['Doj'] = excelDateToJSDate(row['Doj']);
            return row;
        });
        console.log("excel data is ",updatedData)
        setSheetData(updatedData)
        if (updatedData.length > 0) {
          setHeaders(Object.keys(data[0]))
        }
        setIsLoading(false)
      } catch (err) {
        setcError('Error reading file. Please make sure it\'s a valid Excel file.')
        setIsLoading(false)
      }
    }
    reader.onerror = () => {
      setcError('Error reading file. Please try again.')
      setIsLoading(false)
    }
    reader.readAsArrayBuffer(file)
  }, [])
  const sendRowToAPI = async (row) => {
    // Replace this with your actual API endpoint
    
   postRequest(row)
  }

  const handleImportClick = async () => {
    setIsSending(true)
    for (let i = 0; i < sheetData.length; i++) {
        const row = sheetData[i]
        var res =  await postRequest(row)
            console.log(" data is ",res)
            if (res.status === 400) {
                setSubmissionStatus(prevStatus => ({ ...prevStatus, [i]: false }));
                console.log("Error occurred", res.error.status);
                break; // Stop on first error
               
            } else if (res.status === 200) {
                setSubmissionStatus(prevStatus => ({ ...prevStatus, [i]: true }));
            }
            else if (res.status === 201){
                setSubmissionStatus(prevStatus => ({ ...prevStatus, [i]: true })); 
            } else {
                setSubmissionStatus(prevStatus => ({ ...prevStatus, [i]: false }));
            }
        
        
       
      
    }
    setIsSending(false)
    setIsLoading(false)
  }
  const handleCancelClick = () => {

  setIsSending(false)
  }
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-10" id="my-modal">
            <div className="relative top-20 mx-auto p-2 border w-[85%] shadow-lg rounded-md bg-white">
                <div className="p-2 space-y-2">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">{heading.toUpperCase()}</h3>
                    <button className="text-gray-400 hover:text-gray-500" onClick={()=>closeModel()}>
                    <X className="h-6 w-6" />
                    </button>
                </div>
                    <div className="flex items-center space-x-2">
                        <Input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={handleFileUpload}
                        className="file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                        aria-label="Upload Excel file"
                        />
                         {isSending ? (
                            <Button onClick={handleCancelClick} variant="destructive">
                                <X className="mr-2 h-4 w-4" />
                                Cancel Import
                            </Button>
                           
                            ) : (
                                <Button onClick={handleImportClick} disabled={isLoading || sheetData.length === 0}>
                                <Upload className="mr-2 h-4 w-4" />
                                Import Excel
                            </Button>
                            )}
                     
                    </div>
            
                    {isLoading && <p className="text-muted-foreground">Loading...</p>}
                    {cError && <p className="text-destructive">{Error}</p>}
            
                    {sheetData.length > 0 && (
                        <div className="border rounded-md overflow-x-auto scrollbar-thin h-96">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                <th></th>
                                    {headers.map((header) => (
                                    <th key={header} className="px-3 py-3 cursor-pointer">
                                        <div className="flex justify-between items-center">
                                        {header}
                                        </div>
                                    </th>
                                    ))}
                                   
                                </tr>
                                </thead>
                                <tbody>
                                {sheetData.map((row, index) => (
                                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                    <td className='px-3 py-1'>
                                        {submissionStatus[index]?<Check className='text-green-600' />:<X className='text-red-600' />}
                                    </td>
                                    {headers.map((header) => (
                                      <td key={`${index}-${header}`} className="px-3 py-1 cursor-pointer">
                                       {row[header]} 
                                        </td>
                                ))}
                                    
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
            
                    {sheetData.length === 0  && (
                        <div className="text-center py-10">
                        <FileSpreadsheet className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-2 text-sm font-semibold text-muted-foreground">No Excel data</h3>
                        <p className="mt-1 text-sm text-muted-foreground">Upload an Excel file to see the data here</p>
                        <p className="mt-1 text-sm text-muted-foreground text-center">To download sample file <a href="http://127.0.0.1:8000/media/sample_employee_master.xlsx"> click here</a> </p>
                        
                        
                        </div>
                    )}
                </div>
            </div>
        </div>

      )
}

export default ImportFile