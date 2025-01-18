import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X, RefreshCw, Upload } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import * as XLSX from "xlsx";

function SyncData({ heading, closeModel }) {
    const [data, setData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cancelled, setCancelled] = useState(false);
    const [total,setTotal] = useState(0)
    const navigate = useNavigate();
    const cookies = new Cookies()

    const [accessToken, setAccessToken] = useState("");
    const flattenObject = (obj, parentKey = '') => {
        let result = {};
    
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            const newKey = parentKey ? `${parentKey}_${key}` : key;
    
            if (typeof obj[key] === 'object' && obj[key] !== null) {
              // If the value is an object, recurse to flatten it
              Object.assign(result, flattenObject(obj[key], newKey));
            } else {
              // Otherwise, just assign the value
              result[newKey] = obj[key];
            }
          }
        }
    
        return result;
      };
    useEffect(() => {

        setAccessToken(cookies.get('access'))
        console.log(accessToken)
    }, [])

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                "http://swirlapps.in/api/payroll/master/employee",
                {
                    auth: {
                        username: "global",
                        password: "Kumar@123",
                    },
                    withCredentials: false,
                }
            );

            const apiData = Array.isArray(response.data)
                ? response.data
                : Array.isArray(response.data.employees)
                    ? response.data.employees
                    : [];

            if (apiData.length === 0) {
                toast.info("No data retrieved from API.");
                return;
            }

            const firstRow = apiData[0].rate;
            const colHeaders = Object.keys(firstRow);
         
            setHeaders(colHeaders);
            setData(apiData);

            // Log and display a toast after data is added successfully
            console.log("All data fetched successfully:", apiData);
            toast.success("All data has been fetched added!");
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("An error occurred while fetching data.");
        } finally {
            setIsLoading(false);
        }
    };

 const handleGenerateExcel = () => {
    const transformedArray = data.map(item => flattenObject(item));
    const ws = XLSX.utils.json_to_sheet(transformedArray);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, `${heading}.xlsx`);
  };
    const handleSubmitClick = async () => {
        setIsSubmitting(true);
        setCancelled(false);

        // Maintain a set to track submitted EmpId values
        const submittedEmpIds = new Set();
      
        for (let i = 0; i < data.length; i++) {
            if (cancelled) {
                toast.info("Submission process cancelled.");
                break;
            }
       
            const row = data[i].rate;

            // Check if EmpId already exists in the set
            // if (submittedEmpIds.has(row.EmpId)) {
            //     toast.info(`EmpId ${row.EmpId} already exists, skipping this row.`);
            //     continue; // Skip the current row if EmpId already exists
            // }

            // Add EmpId to the set to track it as submitted
            submittedEmpIds.add(row);

            // Add the condition for Ottype conversion here
            // let formattedOttype = row.ottype;
            // if (row.ottype === "SINGLE-OT") {
            //     formattedOttype = "SINGLE";
            // } else if (row.ottype === "DOUBLE-OT") {
            //     formattedOttype = "DOUBLE";
            // }

            // Format the 'Doe' field (Date of Exit) if it exists and is not null
            // let formattedDoe = row.Doe;
            // if (formattedDoe) {
            //     const dateObj = new Date(formattedDoe);
            //     formattedDoe = dateObj.toISOString().split('T')[0]; // This will give the format YYYY-MM-DD
            // } else {
            //     formattedDoe = null; // Or you can omit it entirely by not including it in the payload if the API allows
            // }

            // let formattedDob = row.Dob;
            // if (formattedDob) {
            //     const dateObj = new Date(formattedDob);
            //     formattedDob = dateObj.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
            // } else {
            //     formattedDob = null; // Set to null if not provided
            // }

            // Trim the Designation value to remove extra spaces
            // const formattedSite = row.SiteDetails?.name?.trim() || "";
            // const formattedDesignation = row.DesignationDetails?.name?.trim() || "";
            // const formattedDepartment = row.DepartmentDetails?.name?.trim() || "";

            const payload = {
                ctc: row?.ctc || 0,
                basic: row?.basic || 0,
                da: row?.da || 0,
                arate: row?.arate || 0,
                otrate: row?.otrate || 0,
                hra: row?.hra || 0,
                madical: row?.madical || 0,
                ExgratiaRetention: row?.ExgratiaRetention || 0,
                LTARetention: row?.LTARetention || 0,
                LTA: row?.LTA, // Use the trimmed Designation value here
                CA: row?.CA || 0,
                Fooding: row?.Fooding || 0,
                Misc: row?.Misc || 0,
                CEA: row?.CEA || 0,
                WashingAllowance: row?.WashingAllowance || 0,
                ProfessionalPursuits: row?.ProfessionalPursuits || 0,
                SpecialAllowance: row?.SpecialAllowance || 0,
                IncomeTax: row?.IncomeTax || 0,
                personalpay: row?.personalpay || 0,
                petrol: row?.petrol || 0,
                mobile: row?.mobile || 0,
                AttendAllow: row?.AttendAllow || 0,
                incentive: row?.incentive || 0,
                fixedamt: row?.fixedamt || 0,
            };

            try {
                const res = await axios.patch(
                    `https://global.swirlapps.in/importrate/${data[i].EmpId}/`,
                    payload, // The payload is the second parameter
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`, // Authorization header
                        },
                    }
                );

                if (res.status === 200 || res.status === 201) {
                    setTotal(i+1)
                    // toast.success(`Row ${i + 1} submitted successfully.`);
                } else {
                    // Handle specific "EmpId already exists" error
                    if (res.data.message && res.data.message.includes("EmpId already exists")) {
                        toast.info(`EmpId ${row.EmpId} already exists, moving to the next row.`);
                    } else {
                        toast.error(`Error submitting row ${i + 1}: ${res.data.message || "Unknown error"}`);
                        continue;
                    }
                }
            } catch (error) {
                // Handle error without stopping the loop
                if (error.response && error.response.data && error.response.data.message.includes("EmpId already exists")) {
                    toast.info(`EmpId ${data[i].EmpId} already exists, moving to the next row.`);
                } else {
                    console.error("Error submitting row:", error);
                    toast.error(`Error submitting row ${i + 1}: ${error.message}`);
                }
            }
        }

        setIsSubmitting(false);
    };






    const handleCancelClick = () => {
        setCancelled(true);
        setIsSubmitting(false);
    };



    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-10">
            <div className="relative top-20 mx-auto p-2 border w-[85%] shadow-lg rounded-md bg-white">
                <div className="p-2 space-y-2">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-900">
                            {heading ? heading.toUpperCase() : "DEFAULT HEADING"}
                        </h3>
                        <button className="text-gray-400 hover:text-gray-500" onClick={closeModel}>
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Button onClick={fetchData} disabled={isLoading}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Sync
                        </Button>
                        <Button onClick={handleSubmitClick} disabled={isSubmitting || data.length === 0}>
                            <Upload className="mr-2 h-4 w-4" />
                            Submit
                        </Button>
                        <Button onClick={handleGenerateExcel} disabled={isSubmitting || data.length === 0}>
                            <Upload className="mr-2 h-4 w-4" />
                            EXCEL
                        </Button>
                        {isSubmitting && (
                            <Button variant="danger" onClick={handleCancelClick}>
                                Cancel
                            </Button>
                        )}
                        <div><label>{total} </label><p> updated</p></div>
                    </div>

                    {isLoading && <p className="text-muted-foreground">Loading...</p>}
                    {data.length > 0 ? (
                        <div className="border rounded-md overflow-x-auto h-96">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        {headers.map((header) => (
                                            <th key={header} className="px-3 py-3">
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((row, index) => (
                                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                            {headers.map((header) => (
                                                <td key={`${index}-${header}`} className="px-3 py-1">
                                                    {row.rate[header]}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-10">
                            <h3 className="mt-2 text-sm font-semibold text-muted-foreground">No data synced</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Click "Sync" to retrieve data from the API.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SyncData;