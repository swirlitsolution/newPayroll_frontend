import { useState, useCallback } from "react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, FileSpreadsheet, Upload, X } from "lucide-react";
import usePost from "../../hooks/usePost";
import { toast } from "react-toastify";

function ImportFile({ heading, closeModel, newItem, api }) {
    const [sheetData, setSheetData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [columnsWithErrors, setColumnsWithErrors] = useState([]);
    const [isSending, setIsSending] = useState(false); // Tracks import state
    const [submissionStatus, setSubmissionStatus] = useState({}); // Track submission status for each row

    const { postRequest } = usePost(api);

    // Define mandatory columns
    const mandatoryColumns = {
        Name: true,
        Site: true,
        Imageurl: true,
        EmpId: true,
        Department: true,
        Designation: true,
        Gang: true,
        PfApplicable: true,
        EsicApplicable: true,
        PRFTax: true,
        AttendAllow: true,
        OtAppl: true,
        MrOtAppl: true,
        AllowAsPer: true,
        ReversePF: true,
        Aadhar: true,
        Weekoff: true,
        Doj: true,
        Status: true,
    };

    const excelDateToJSDate = (excelValue) => {
        if (typeof excelValue === "number") {
            const utcDays = excelValue - 25569;
            const utcValue = utcDays * 86400;
            const date = new Date(utcValue * 1000);
            return formatDate(date);
        } else if (typeof excelValue === "string" || excelValue instanceof Date) {
            const date = new Date(excelValue);
            if (!isNaN(date.getTime())) {
                return formatDate(date);
            }
        }
        return "";
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const validateMandatoryColumns = (row) => {
        return Object.keys(mandatoryColumns).filter((col) => {
            return mandatoryColumns[col] && (!row[col] || row[col].toString().trim() === "");
        });
    };

    const handleFileUpload = useCallback((e) => {
        const file = e.target.files?.[0];
        if (!file) return;
    
        setIsLoading(true);
        setColumnsWithErrors([]);
    
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const bstr = event.target?.result;
                const xdata = new Uint8Array(bstr);
                const wb = XLSX.read(xdata, { type: "array", cellDates: true, dateNF: "dd/MM/yyyy" });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
    
                const colHeaders = [];
                const range = XLSX.utils.decode_range(ws["!ref"]);
                for (let col = range.s.c; col <= range.e.c; col++) {
                    const cell = ws[XLSX.utils.encode_cell({ r: 0, c: col })];
                    colHeaders.push(cell ? cell.v : `Column ${col + 1}`);
                }
    
                const data = XLSX.utils.sheet_to_json(ws, { raw: true });
                const updatedData = [];
                let firstErrorRow = null;
    
                data.forEach((row, rowIndex) => {
                    // Convert Excel dates to the correct format
                    row["Dob"] = excelDateToJSDate(row["Dob"]);
                    row["Doj"] = excelDateToJSDate(row["Doj"]);
    
                    // Check for missing mandatory columns in the current row
                    const missingColumns = Object.keys(mandatoryColumns).filter((col) => {
                        return mandatoryColumns[col] && (!row[col] || row[col].toString().trim() === "");
                    });
    
                    if (missingColumns.length > 0) {
                        // Capture the first invalid row details
                        if (!firstErrorRow) {
                            firstErrorRow = { rowIndex: rowIndex + 1, missingColumns };
                        }
                    } else {
                        // Add the valid row to the updatedData array immediately
                        updatedData.push(row);
                    }
                });
    
                // Update the state with valid data and column headers
                setHeaders(colHeaders);
                setSheetData((prevData) => [...prevData, ...updatedData]);
    
                // Display an error for the first invalid row, if found
                if (firstErrorRow) {
                    toast.error(
                        `Row ${firstErrorRow.rowIndex} is missing mandatory data in columns: ${firstErrorRow.missingColumns.join(", ")}`
                    );
                }
    
                setIsLoading(false);
            } catch (err) {
                console.error("Error reading file:", err);
                setIsLoading(false);
            }
        };
    
        reader.onerror = () => {
            console.error("Error reading file.");
            setIsLoading(false);
        };
    
        reader.readAsArrayBuffer(file);
    }, []);
    
    

    const handleImportClick = async () => {
        setIsSending(true);
        for (let i = 0; i < sheetData.length; i++) {
            const row = sheetData[i];
            const res = await postRequest(row);

            if (res.status === 400) {
                setSubmissionStatus((prevStatus) => ({ ...prevStatus, [i]: false }));
                toast.error(`Error importing row ${i + 1}: ${res.error?.message || "Unknown error"}`);
                break;
            } else if (res.status === 200 || res.status === 201) {
                setSubmissionStatus((prevStatus) => ({ ...prevStatus, [i]: true }));
            }
        }
        setIsSending(false);
    };

    const handleCancelClick = () => {
        setIsSending(false);
        toast.info("Import operation canceled.");
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-10">
            <div className="relative top-20 mx-auto p-2 border w-[85%] shadow-lg rounded-md bg-white">
                <div className="p-2 space-y-2">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-900">{heading.toUpperCase()}</h3>
                        <button className="text-gray-400 hover:text-gray-500" onClick={closeModel}>
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
                    {sheetData.length > 0 ? (
                        <div className="border rounded-md overflow-x-auto h-96">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th className="px-3 py-3">Status</th>
                                        {headers.map((header) => (
                                            <th
                                                key={header}
                                                className={`px-3 py-3 ${columnsWithErrors.includes(header) ? "text-red-600 font-bold" : ""}`}
                                            >
                                                {header}
                                                {mandatoryColumns[header] && (
                                                    <span className="text-red-600 font-bold">*</span>
                                                )}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody>
                                    {sheetData.map((row, index) => (
                                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-3 py-1">
                                                {submissionStatus[index] ? (
                                                    <Check className="text-green-600" />
                                                ) : (
                                                    <X className="text-red-600" />
                                                )}
                                            </td>
                                            {headers.map((header) => (
                                                <td key={`${index}-${header}`} className="px-3 py-1">
                                                    {row[header] || ""}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-10">
                            <FileSpreadsheet className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-2 text-sm font-semibold text-muted-foreground">No Excel data</h3>
                            <p className="mt-1 text-sm text-muted-foreground">Upload an Excel file to see the data here</p>
                            <p className="mt-1 text-sm text-muted-foreground text-center">
                                To download sample file{" "}
                                <a href="http://127.0.0.1:8000/media/sample_employee_master.xlsx" className="text-primary underline">
                                    click here
                                </a>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ImportFile;




// import { useState, useCallback } from "react";
// import * as XLSX from "xlsx";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Check, FileSpreadsheet, Upload, X } from "lucide-react";
// import usePost from "../../hooks/usePost";

// function ImportFile({ heading, closeModel, api }) {
//   const [sheetData, setSheetData] = useState([]);
//   const [headers, setHeaders] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [cError, setcError] = useState(null);
//   const [submissionStatus, setSubmissionStatus] = useState({});
//   const { postRequest } = usePost(api);
//   const [isSending, setIsSending] = useState(false);

//   const excelDateToJSDate = (excelValue) => {
//     if (typeof excelValue === "number") {
//       // Convert Excel serial number to JS Date
//       const utcDays = excelValue - 25569; // Excel's epoch starts on 1900-01-01
//       const utcValue = utcDays * 86400; // Convert days to seconds
//       const date = new Date(utcValue * 1000); // Convert to milliseconds
//       return formatDate(date); // Format as yyyy-mm-dd
//     } else if (typeof excelValue === "string" || excelValue instanceof Date) {
//       // Parse string or Date object directly
//       const date = new Date(excelValue);
//       if (!isNaN(date.getTime())) {
//         return formatDate(date); // Format as yyyy-mm-dd
//       }
//     }
//     return ""; // Return an empty string if invalid
//   };

//   const formatDate = (date) => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };

//   const handleFileUpload = useCallback((e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setIsLoading(true);
//     setcError(null);

//     const reader = new FileReader();
//     reader.onload = (event) => {
//       try {
//         const bstr = event.target?.result;
//         const xdata = new Uint8Array(bstr);
//         const wb = XLSX.read(xdata, { type: "array", cellDates: true, dateNF: "yyyy-mm-dd" });
//         const wsname = wb.SheetNames[0];
//         const ws = wb.Sheets[wsname];
//         const data = XLSX.utils.sheet_to_json(ws, { raw: true }); // Preserve raw values

//         const updatedData = data.map((row) => {
//           if (row["Dob"]) {
//             row["Dob"] = excelDateToJSDate(row["Dob"]); // Convert DOB
//           }
//           if (row["Doj"]) {
//             row["Doj"] = excelDateToJSDate(row["Doj"]); // Convert DOJ
//           }
//           return row;
//         });

//         console.log("Excel data is ", updatedData);
//         setSheetData(updatedData);
//         if (updatedData.length > 0) {
//           setHeaders(Object.keys(data[0]));
//         }
//         setIsLoading(false);
//       } catch (err) {
//         setcError("Error reading file. Please make sure it's a valid Excel file.");
//         setIsLoading(false);
//       }
//     };
//     reader.onerror = () => {
//       setcError("Error reading file. Please try again.");
//       setIsLoading(false);
//     };
//     reader.readAsArrayBuffer(file);
//   }, []);

//   const handleImportClick = async () => {
//     setIsSending(true);
//     for (let i = 0; i < sheetData.length; i++) {
//       const row = sheetData[i];
//       const res = await postRequest(row);
//       if (res?.status === 400) {
//         setSubmissionStatus((prevStatus) => ({ ...prevStatus, [i]: false }));
//         break; // Stop on first error
//       } else if (res?.status === 200 || res?.status === 201) {
//         setSubmissionStatus((prevStatus) => ({ ...prevStatus, [i]: true }));
//       } else {
//         setSubmissionStatus((prevStatus) => ({ ...prevStatus, [i]: false }));
//       }
//     }
//     setIsSending(false);
//     setIsLoading(false);
//   };

//   const handleCancelClick = () => {
//     setIsSending(false);
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-10" id="my-modal">
//       <div className="relative top-20 mx-auto p-2 border w-[85%] shadow-lg rounded-md bg-white">
//         <div className="p-2 space-y-2">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-medium text-gray-900">{heading.toUpperCase()}</h3>
//             <button className="text-gray-400 hover:text-gray-500" onClick={() => closeModel()}>
//               <X className="h-6 w-6" />
//             </button>
//           </div>
//           <div className="flex items-center space-x-2">
//             <Input
//               type="file"
//               accept=".xlsx, .xls"
//               onChange={handleFileUpload}
//               className="file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
//               aria-label="Upload Excel file"
//             />
//             {isSending ? (
//               <Button onClick={handleCancelClick} variant="destructive">
//                 <X className="mr-2 h-4 w-4" />
//                 Cancel Import
//               </Button>
//             ) : (
//               <Button onClick={handleImportClick} disabled={isLoading || sheetData.length === 0}>
//                 <Upload className="mr-2 h-4 w-4" />
//                 Import Excel
//               </Button>
//             )}
//           </div>

//           {isLoading && <p className="text-muted-foreground">Loading...</p>}
//           {cError && <p className="text-destructive">{cError}</p>}

//           {sheetData.length > 0 && (
//             <div className="border rounded-md overflow-x-auto scrollbar-thin h-96">
//               <table className="w-full text-sm text-left text-gray-500">
//                 <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//                   <tr>
//                     <th></th>
//                     {headers.map((header) => (
//                       <th key={header} className="px-3 py-3">
//                         {header}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {sheetData.map((row, index) => (
//                     <tr key={index} className="bg-white border-b hover:bg-gray-50">
//                       <td className="px-3 py-1">
//                         {submissionStatus[index] ? (
//                           <Check className="text-green-600" />
//                         ) : (
//                           <X className="text-red-600" />
//                         )}
//                       </td>
//                       {headers.map((header) => (
//                         <td key={`${index}-${header}`} className="px-3 py-1">
//                           {row[header]}
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {sheetData.length === 0 && (
//             <div className="text-center py-10">
//               <FileSpreadsheet className="mx-auto h-12 w-12 text-muted-foreground" />
//               <h3 className="mt-2 text-sm font-semibold text-muted-foreground">No Excel data</h3>
//               <p className="mt-1 text-sm text-muted-foreground">Upload an Excel file to see the data here</p>
//               <p className="mt-1 text-sm text-muted-foreground text-center">
//                 To download sample file{" "}
//                 <a href="http://127.0.0.1:8000/media/sample_employee_master.xlsx">click here</a>
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ImportFile;
