// here is code :
// import React, { useState, useEffect, useRef } from "react";
// import { Pagination, Stack } from "@mui/material";
// import { Input } from "../ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Menubar,
//   MenubarContent,
//   MenubarItem,
//   MenubarMenu,
//   MenubarTrigger,
// } from "@/components/ui/menubar";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import BonusTable from "./BonusTable";
// import { Search } from "lucide-react";
// import axios from "axios";
// import Cookies from "universal-cookie";
// import html2canvas from "html2canvas";

// // Utility function to process and return value from the object
// export const processValue = (value) => {
//   if (React.isValidElement(value)) {
//     return value.props?.children || "";
//   } else if (Array.isArray(value)) {
//     return value
//       .map((obj) => (typeof obj === "object" ? JSON.stringify(obj) : obj))
//       .join(", ");
//   } else if (value && typeof value === "object") {
//     if (value.hasOwnProperty("name")) return value.name;
//     return JSON.stringify(value);
//   }
//   return value || "";
// };

// // Utility function to extract value from object based on field
// export const getValue = (obj, field) => {
//   if (!obj || !field) return "";
//   const keys = field.split(".");
//   let value = obj;
//   keys.forEach((key) => {
//     value = value ? value[key] : "";
//   });
//   return processValue(value);
// };

// function DataGrid({
//   heading,
//   columns,
//   checkBoxSelection,  
//   rowClicked,
//   pdfOrientation = "landscape",
//   isBonusPayRegister,
//   row,
//   totalCounts,
//   apiUrl,
// }) {
//   const [filterBy, setFilterBy] = useState("");
//   const [searchValue, setSearchValue] = useState("");
//   const [tableData, setTableData] = useState([]);
//   const [paginatedData, setPaginatedData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const itemsPerPage = 10;
//   const tableRef = useRef(null);
//   const [accessToken, setAccessToken] = useState("");
//   const cookies = new Cookies();

//   // Get access token from cookies
//   useEffect(() => {
//     const token = cookies.get("access");
//     setAccessToken(token);
//   }, []);

//   // Initialize table data and pagination
//   useEffect(() => {

//     if (row?.length > 10) {
//       setTotalPages(Math.ceil(row?.length / itemsPerPage));
//       setPaginatedData(row.slice(0, itemsPerPage));
//       setTableData(row);
//     }
//     else {
//       setTotalPages(Math.ceil(totalCounts / itemsPerPage));
//       setPaginatedData(row.slice(0, itemsPerPage));
//       setTableData(row);
//     }

//   }, [row, totalCounts]);

//   // Handle direct URL search
//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const filterByParam = urlParams.keys().next().value;
//     const searchValueParam = urlParams.get(filterByParam);

//     if (filterByParam && searchValueParam) {
//       setFilterBy(filterByParam);
//       setSearchValue(searchValueParam);

//       const searchUrl = ${apiUrl}?${filterByParam}=${encodeURIComponent(searchValueParam)};
//       axios
//         .get(searchUrl, {
//           headers: {
//             Authorization: Bearer ${accessToken},
//           },
//         })
//         .then((response) => {
//           const { results, count } = response.data;
//           setTableData(results);
//           setPaginatedData(results.slice(0, itemsPerPage));
//           setTotalPages(Math.ceil(count / itemsPerPage));
//           setCurrentPage(1);
//         })
//         .catch((error) => console.error("Error fetching data from URL:", error));
//     }
//   }, [apiUrl, accessToken]);

//   console.log("currentPage")

//   // Handle search
//   const handleSearch = async () => {
//     const originalFilterBy = filterBy ? filterBy.toLowerCase() : "";
//     const originalSearchValue = searchValue.trim();

//     if (originalSearchValue.length > 0 || originalFilterBy) {
//       const data = row.filter((element) => {
//         return columns.find((col) => {

//           if (col.field === filterBy) {
//             let cellValue = col.renderCell ? col.renderCell(element) : getValue(element, col.field);
//             if (${cellValue}.toLowerCase().includes(${searchValue}.toLowerCase())) {
//               return element
//             }
//           }

//         })
//         // element[filterBy].toLowerCase().includes(searchValue.toLowerCase()) 

//       })
//       if (data.length > 0) {
//         setTableData(data)
//         setTotalPages(Math.ceil(data?.length / itemsPerPage));
//         setPaginatedData(tableData.slice(0, 10));
//       }
//       else {
//         try {
//           setLoading(true);
//           const searchUrl = ${apiUrl}?${originalFilterBy}=${encodeURIComponent(originalSearchValue)};
//           const response = await axios.get(searchUrl, {
//             headers: {
//               Authorization: Bearer ${accessToken},
//             },
//           });

//           const { results, count } = response.data;
//           setTableData(results);
//           setPaginatedData(results.slice(0, itemsPerPage));
//           setTotalPages(Math.ceil(count / itemsPerPage));
//           setCurrentPage(1);

//           const newUrl = new URL(window.location.href);
//           newUrl.searchParams.set(originalFilterBy, originalSearchValue);
//           window.history.pushState({}, "", newUrl.toString());
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         } finally {
//           setLoading(false);
//         }
//       }

//     } else {
//       setPaginatedData(tableData.slice(0, itemsPerPage));
//       setTotalPages(Math.ceil(tableData.length / itemsPerPage));
//       setCurrentPage(1);
//     }
//   };

//   // Fetch paginated data
//   const fetchData = async (page) => {
//     setLoading(true);
//     const originalFilterBy = filterBy ? filterBy.toLowerCase() : "";

//     const originalSearchValue = searchValue.trim();
//     if (row.length > 10) {
//       console.log("fetching offline data", paginatedData)

//       var pagefrom = (page - 1) * 10;
//       var pageto = (page - 1) * 10 + 10;
//       setPaginatedData(tableData.slice(pagefrom, pageto));
//       setCurrentPage(page);
//       setLoading(false);
//     }
//     else {
//       try {
//         const response = await axios.get(${apiUrl}?p=${page}&${originalFilterBy}=${encodeURIComponent(originalSearchValue)}, {
//           headers: {
//             Authorization: Bearer ${accessToken},
//           },
//         });
//         const { results, count } = response.data;
//         setTableData(results);
//         setPaginatedData(results.slice(0, itemsPerPage));
//         setTotalPages(Math.ceil(count / itemsPerPage));
//         setCurrentPage(page);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//   };
//   const flattenObject = (obj, parentKey = '') => {
//     let result = {};

//     for (let key in obj) {
//       if (obj.hasOwnProperty(key)) {
//         const newKey = parentKey ? ${parentKey}_${key} : key;

//         if (typeof obj[key] === 'object' && obj[key] !== null) {
//           // If the value is an object, recurse to flatten it
//           Object.assign(result, flattenObject(obj[key], newKey));
//         } else {
//           // Otherwise, just assign the value
//           result[newKey] = obj[key];
//         }
//       }
//     }

//     return result;
//   };
//   const handleGenerateExcel = () => {
//     const transformedArray = row.map(item => flattenObject(item));
//     const ws = XLSX.utils.json_to_sheet(transformedArray);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Data");
//     XLSX.writeFile(wb, ${heading}.xlsx);
//   };

//   const handleGeneratePDF = () => {
//     const doc = new jsPDF(pdfOrientation);
//     if (isBonusPayRegister) {
//       const bonusTableElement = document.getElementById("bonus-table");
//       if (!bonusTableElement) {
//         console.error("Bonus Table element not found!");
//         return;
//       }
//       html2canvas(bonusTableElement, { scale: 2 }).then((canvas) => {
//         const imgData = canvas.toDataURL("image/png");
//         const imgWidth = doc.internal.pageSize.getWidth() - 20;
//         const imgHeight = (canvas.height * imgWidth) / canvas.width;
//         doc.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
//         doc.save("bonus-pay-register.pdf");
//       });
//     } else {
//       const tableColumnHeaders = columns.map((col) => col.headerName);
//       const tableRows = paginatedData.map((item) =>
//         columns.map((col) =>
//           col.renderCell ? col.renderCell(item) : getValue(item, col.field)
//         )
//       );
//       doc.setFontSize(12);
//       doc.text(heading.toUpperCase(), 14, 15);
//       doc.autoTable({
//         startY: 25,
//         head: [tableColumnHeaders],
//         body: tableRows,
//       });
//       doc.save(${heading.toLowerCase().replace(/\s+/g, "-")}.pdf);
//     }
//   };

//   return (
//     <div className="flex flex-col overflow-x-hidden overflow-y-auto gap-4">
//       <div className="bg-white rounded-lg shadow p-2 border">
//         <div className="flex justify-between items-center pl-2">
//           <h3 className="font-bold text-sm">{heading.toUpperCase()}</h3>
//           <div className="flex gap-2 items-center">
//             <Select onValueChange={(value) => setFilterBy(value)}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Filter By" />
//               </SelectTrigger>
//               <SelectContent>
//                 {columns.map((key) => (
//                   <SelectItem value={key.field} key={key.field}>
//                     {key.headerName}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             <div className="flex gap-2 items-center">
//               <Input
//                 type="text"
//                 placeholder="Search..."
//                 onChange={(e) => setSearchValue(e.target.value)}
//                 className="pl-8 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <Search className="cursor-pointer" onClick={handleSearch} />
//             </div>
//             <Menubar>
//               <MenubarMenu>
//                 <MenubarTrigger>Export</MenubarTrigger>
//                 <MenubarContent>
//                   <MenubarItem onClick={handleGenerateExcel}>Excel</MenubarItem>
//                   <MenubarItem onClick={handleGeneratePDF}>PDF</MenubarItem>
//                 </MenubarContent>
//               </MenubarMenu>
//             </Menubar>
//           </div>
//         </div>
//       </div>
//       <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm h-[500px] scrollbar-thin">
//         <table className="w-full text-sm text-left text-gray-500" ref={tableRef}>
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//             <tr>
//               <th className="px-3 border-2 py-3">Sl</th>
//               {checkBoxSelection && <th><Input type="checkbox" /></th>}
//               {columns.map((col, index) => (
//                 <th key={col.field || index} className="px-3 border-2 py-3">{col.headerName}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan={columns.length + 1} className="text-center border-2 py-3">
//                   Loading data...
//                 </td>
//               </tr>
//             ) : paginatedData.length === 0 ? (
//               <tr>
//                 <td colSpan={columns.length + 1} className="text-center py-3">
//                   No data available
//                 </td>
//               </tr>
//             ) : (
//               paginatedData.map((item, index) => (
//                 <tr
//                   key={index}
//                   onClick={rowClicked ? () => rowClicked(item) : undefined}
//                 >
//                   <td className="border-2 p-1 text-nowrap">
//                     {(currentPage - 1) * itemsPerPage + index + 1}
//                   </td>
//                   {checkBoxSelection && (
//                     <td>
//                       <Input type="checkbox" />
//                     </td>
//                   )}
//                   {columns.map((col, colIndex) => (
//                     <td
//                       key={colIndex}
//                       className="border-2 p-1 text-nowrap"
//                     >
//                       {col.renderCell
//                         ? col.renderCell(item)
//                         : getValue(item, col.field)}
//                     </td>
//                   ))}
//                 </tr>
//               ))
//             )}
//           </tbody>


//         </table>
//       </div>
//       <Stack spacing={2} direction="row" justifyContent="center">
//         <Pagination
//           count={totalPages}
//           page={currentPage}
//           onChange={(event, page) => fetchData(page)}
//         />
//       </Stack>
//     </div>
//   );
// }

// export default DataGrid;


import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import * as XLSX from "xlsx";
import { Input } from "../ui/input";

// Utility function to process and return value from the object
export const processValue = (value) => {
  if (React.isValidElement(value)) {
    return value.props?.children || "";
  } else if (Array.isArray(value)) {
    return value
      .map((obj) => (typeof obj === "object" ? JSON.stringify(obj) : obj))
      .join(", ");
  } else if (value && typeof value === "object") {
    if (value.hasOwnProperty("name")) return value.name;
    return JSON.stringify(value);
  }
  return value || "";
};

// Utility function to extract value from object based on field
export const getValue = (obj, field) => {
  if (!obj || !field) return "";
  const keys = field.split(".");
  let value = obj;
  keys.forEach((key) => {
    value = value ? value[key] : "";
  });
  return processValue(value);
};

function DataGrid({
  heading,
  columns,
  checkBoxSelection,
  rowClicked,
  pdfOrientation = "landscape",
  isBonusPayRegister,
  row,
  isPayrollColumns
}) {
  const [filterBy, setFilterBy] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [tableData, setTableData] = useState([]);
  const tableRef = useRef(null);
  const [accessToken, setAccessToken] = useState("");
  const cookies = new Cookies();

  // Get access token from cookies
  useEffect(() => {
    const token = cookies.get("access");
    setAccessToken(token);
  }, []);

  // Initialize table data
  useEffect(() => {
    setTableData(row);
  }, [row]);
  console.log("tableData", tableData)
  // Handle search
  const handleSearch = async () => {
    const originalFilterBy = filterBy ? filterBy.toLowerCase() : "";
    const originalSearchValue = searchValue.trim();

    if (originalSearchValue.length > 0 || originalFilterBy) {
      const data = row.filter((element) => {
        return columns.find((col) => {
          if (col.field === filterBy) {
            let cellValue = col.renderCell
              ? col.renderCell(element)
              : getValue(element, col.field);
            if (`${cellValue}`.toLowerCase().includes(`${searchValue}`.toLowerCase())) {
              return element;
            }
          }
        });
      });
      setTableData(data);
    } else {
      setTableData(row);
    }
  };

  const flattenObject = (obj, parentKey = "") => {
    let result = {};

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = parentKey ? `${parentKey}_${key}` : key;

        if (typeof obj[key] === "object" && obj[key] !== null) {
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

  // const handleGenerateExcel = () => {
  //   const transformedArray = tableData.map((item) => flattenObject(item));
  //   const ws = XLSX.utils.json_to_sheet(transformedArray);
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, "Data");
  //   XLSX.writeFile(wb, `${heading}.xlsx`);
  // };

  const handleGenerateExcel = () => {
    // Transform tableData to include appropriate formatting
    const transformedArray = tableData.map((item) => {
      let rowData = {};

      columns.forEach((column) => {
        const field = column.field;

        // Handle fields with `renderCell`
        if (column.renderCell) {
          if (field === "EmpId") {
            rowData[field] = item.employeeData?.EmpId || item.employee?.EmpId || ""; // Custom logic for EmpId
          } else if (field === "Name") {
            rowData[field] = item.employeeData?.Name || item.employee?.Name || ""; // Custom logic for Name
          } else if (field === "day") {
            // Format Worked
            rowData[field] = `P:${item.tpresent || 0}, NH:${(item.tnh || 0) + (item.tpn || 0)}, L:${(item.tel || 0) + (item.tcl || 0) + (item.tfl || 0)}, Total:${item.tpayable || 0}`;
          } else if (field === "rate") {
            // Format Rate
            const basicRate = parseFloat(item.basicrate || 0);
            const daRate = parseFloat(item.darate || 0);
            rowData[field] = `Basic: ${basicRate}, DA: ${daRate}, Total: ${basicRate + daRate}`;
          } else {
            // Apply custom renderCell logic for other columns
            const renderedValue = column.renderCell(item);
            rowData[field] = typeof renderedValue === "object" && renderedValue !== null
              ? JSON.stringify(renderedValue) // Safeguard against unexpected objects
              : renderedValue || "";
          }
        } else {
          // For fields without `renderCell`, get the raw value
          let value = item[field] || "";


          rowData[field] = value;
        }
      });

      return rowData;
    });

    // Create worksheet from transformed data
    const ws = XLSX.utils.json_to_sheet(transformedArray);

    // Use column headers as the first row
    const tableColumnHeaders = columns.map((col) => col.headerName);
    XLSX.utils.sheet_add_aoa(ws, [tableColumnHeaders], { origin: "A1" });

    // Create a workbook and append the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Export the workbook as an Excel file
    XLSX.writeFile(wb, `${heading}.xlsx`);
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF(pdfOrientation);
  
    if (isBonusPayRegister) {
      const bonusTableElement = document.getElementById("bonus-table");
  
      if (!bonusTableElement) {
        console.error("Bonus Table element not found!");
        return;
      }
  
      // Generate PDF from the bonus table element
      html2canvas(bonusTableElement, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = doc.internal.pageSize.getWidth() - 20; // Adjust image width
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
  
        doc.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
        doc.save("bonus-pay-register.pdf");
      });
    } else {
      // Extract visible column headers
      const tableColumnHeaders = columns.map((col) => col.headerName);
  
      // Process table rows dynamically
      const tableRows = tableData.map((item) =>
        columns.map((col) => {
          const field = col.field;
  
          if (col.renderCell) {
            // Handle custom `renderCell` dynamically
            if (field === "EmpId") {
              return item.employeeData?.EmpId || item.employee?.EmpId || ""; // Custom logic for EmpId
            } else if (field === "Name") {
              return item.employeeData?.Name || item.employee?.Name || ""; // Custom logic for Name
            } else if (field === "day") {
              // Format Worked (day)
              return `P:${item.tpresent || 0}, NH:${(item.tnh || 0) + (item.tpn || 0)}, L:${(item.tel || 0) + (item.tcl || 0) + (item.tfl || 0)}, Total:${item.tpayable || 0}`;
            } else if (field === "rate") {
              // Format Rate
              const basicRate = parseFloat(item.basicrate || 0);
              const daRate = parseFloat(item.darate || 0);
              return `Basic: ${basicRate}, DA: ${daRate}, Total: ${basicRate + daRate}`;
            } else {
              // Apply custom renderCell logic for other columns
              const renderedValue = col.renderCell(item);
              return typeof renderedValue === "object" && renderedValue !== null
                ? JSON.stringify(renderedValue) // Convert objects to string
                : renderedValue || ""; // Fallback to an empty string
            }
          } else {
            // Handle regular fields
            const value = item[field];
            return value !== undefined && value !== null
              ? value.toString() // Convert non-null values to string
              : ""; // Default to an empty string
          }
        })
      );
  
      // Set the title of the PDF
      doc.setFontSize(12);
      doc.text(heading.toUpperCase(), 14, 15);
  
      // Generate the table in the PDF
      doc.autoTable({
        startY: 25, // Start position below the title
        head: [tableColumnHeaders], // Table headers
        body: tableRows, // Table rows
      });
  
      // Save the generated PDF
      doc.save(`${heading.toLowerCase().replace(/\s+/g, "-")}.pdf`);
    }
  };
  
  



  return (
    <div className="flex flex-col overflow-x-hidden overflow-y-auto gap-4">
      <div className="bg-white rounded-lg shadow p-2 border">
        <div className="flex justify-between items-center pl-2">
          <h3 className="font-bold text-sm">{heading.toUpperCase()}</h3>
          <div className="flex gap-2 items-center">
            <Select onValueChange={(value) => setFilterBy(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter By" />
              </SelectTrigger>
              <SelectContent>
                {columns.map((key) => (
                  <SelectItem value={key.field} key={key.field}>
                    {key.headerName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2 items-center">
              <Input
                type="text"
                placeholder="Search..."
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-8 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="cursor-pointer" onClick={handleSearch} />
            </div>
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>Export</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onClick={handleGenerateExcel}>Excel</MenubarItem>
                  <MenubarItem onClick={handleGeneratePDF}>PDF</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm h-auto scrollbar-thin">
        <table className="w-full text-sm text-left text-gray-500" ref={tableRef}>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-3 border-2 py-3">Sl</th>
              {checkBoxSelection && <th><Input type="checkbox" /></th>}
              {columns.map((col, index) => (
                <th key={col.field || index} className="px-3 border-2 py-3">{col.headerName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="text-center py-3">
                  No data available
                </td>
              </tr>
            ) : (
              tableData.map((item, index) => (
                <tr
                  key={index}
                  onClick={rowClicked ? () => rowClicked(item) : undefined}
                >
                  <td className="border-2 p-1 text-nowrap">
                    {index + 1}
                  </td>
                  {checkBoxSelection && (
                    <td>
                      <Input type="checkbox" />
                    </td>
                  )}
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className="border-2 p-1 text-nowrap"
                    >
                      {col.renderCell
                        ? col.renderCell(item)
                        : getValue(item, col.field)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataGrid;
