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
// import axios from "axios"; // Import axios for API calls
// import Cookies from "universal-cookie";
// import html2canvas from 'html2canvas'

// // Utility function to process and return value from the object
// export const processValue = (value) => {
//   if (React.isValidElement(value)) {
//     return value.props?.children || ""; // Extract text content or return empty
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
//   pdfOrientation = "landscape", // Default to landscape
//   isBonusPayRegister,
//   row,
//   totalCounts,
//   apiUrl, // URL for API calls
// }) {
//   const [filterBy, setFilterBy] = useState("");
//   const [searchValue, setSearchValue] = useState("");
//   const [tableData, setTableData] = useState([]); // Complete data
//   const [paginatedData, setPaginatedData] = useState([]); // Data for the current page
//   const [currentPage, setCurrentPage] = useState(1); // Current active page
//   const [totalPages, setTotalPages] = useState(1); // Total number of pages
//   const [loading, setLoading] = useState(false); // Loading state
//   const itemsPerPage = 10; // Number of rows per page
//   const tableRef = useRef(null);
//   const [accessToken, setAccessToken] = useState("");
//   const cookies = new Cookies();

//   // Get the access token from cookies
//   useEffect(() => {
//     const token = cookies.get("access");
//     setAccessToken(token);
//   }, []);

//   // Update table data and total pages when new data is loaded
//   useEffect(() => {
//     setTotalPages(Math.ceil(totalCounts / itemsPerPage));
//     setPaginatedData(row); // Use the row data as paginated data
//   }, [row, totalCounts]);

//   // Function to fetch data from API
//   const fetchData = async (page) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${apiUrl}?p=${page}`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`, // Authorization header
//         },
//       });
//       const { results, count } = response.data;
//       setTableData(results); // Update the complete table data
//       setPaginatedData(results); // Directly update the paginated data for the current page
//       setTotalPages(Math.ceil(count / itemsPerPage));
//       setCurrentPage(page);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

// console.log("columns", columns)
//   // Handle search functionality
//   const handleSearch = () => {
//     if (searchValue.trim().length > 0) {
//       const filteredData = tableData.filter((element) =>
//         columns.some((col) => {
//           const isFilterMatched = !filterBy || col.field === filterBy; // Match selected filter or all
//           if (isFilterMatched) {
//             const cellValue = col.renderCell
//               ? col.renderCell(element)
//               : getValue(element, col.field);
//             return `${cellValue}`.toLowerCase().includes(searchValue.toLowerCase());
//           }
//           return false;
//         })
//       );
//       setPaginatedData(filteredData.slice(0, itemsPerPage));
//       setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
//       setCurrentPage(1);
//     } else {
//       setPaginatedData(tableData.slice(0, itemsPerPage));
//       setTotalPages(Math.ceil(tableData.length / itemsPerPage));
//       setCurrentPage(1);
//     }
//   };


//   // Export data to Excel
//   const handleGenerateExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(paginatedData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Data");
//     XLSX.writeFile(wb, `${heading}.xlsx`);
//   };

//   // Export data to PDF
//   const handleGeneratePDF = () => {
//     const doc = new jsPDF(pdfOrientation); // Ensure landscape orientation

//     if (isBonusPayRegister) {
//       const bonusTableElement = document.getElementById("bonus-table");
//       if (!bonusTableElement) {
//         console.error("Bonus Table element not found!");
//         return;
//       }

//       html2canvas(bonusTableElement, { scale: 2 }).then((canvas) => {
//         const imgData = canvas.toDataURL("image/png");
//         const imgWidth = doc.internal.pageSize.getWidth() - 20; // Set image width to fit the page
//         const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

//         doc.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
//         doc.save("bonus-pay-register1.pdf");
//       });
//     } else {
//       const tableColumnHeaders = columns.map((col) => col.headerName);

//       const tableRows = paginatedData.map((item) =>
//         columns.map((col) => {
//           const cellValue = col.renderCell
//             ? col.renderCell(item)
//             : getValue(item, col.field); // Use getValue function

//           if (React.isValidElement(cellValue)) {
//             return cellValue.props?.children || "";
//           }
//           return typeof cellValue === "object" ? JSON.stringify(cellValue) : cellValue;
//         })
//       );

//       doc.setFontSize(12);
//       doc.setTextColor(40);
//       doc.text(heading.toUpperCase(), 14, 15);

//       doc.autoTable({
//         startY: 25,
//         head: [tableColumnHeaders],
//         body: tableRows,
//         theme: "grid",
//         headStyles: {
//           fillColor: "#f5f6fa",
//           textColor: "#000",
//           fontSize: 7.5,
//         },
//         bodyStyles: { fontSize: 7.5 },
//         styles: { font: "helvetica", overflow: "linebreak" },
//         margin: { top: 10 },
//         pageBreak: "auto", // Automatically handle page breaks
//         showHead: "everyPage", // Show header on every new page
//       });

//       doc.save(`${heading.toLowerCase().replace(/\s+/g, "-")}.pdf`);
//     }
//   }

//   return (
//     <div className="flex flex-col overflow-x-hidden overflow-y-auto gap-4">
//       {/* Header Section */}
//       <div className="bg-white rounded-lg shadow p-2 border">
//         <div className="flex justify-between items-center pl-2">
//           <h3 className="font-bold text-sm">{heading.toUpperCase()}</h3>
//           <div className="flex gap-2 items-center">
//             {/* Filter Dropdown */}
//             <Select onValueChange={(value) => setFilterBy(value)}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Filter By" />
//               </SelectTrigger>
//               <SelectContent>
//                 {columns.map((key) => (
//                   <SelectItem value={key.field} key={key.field}>
//                     {key.headerName.charAt(0).toUpperCase() + key.headerName.slice(1)}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             {/* Search Input */}
//             <div className="flex gap-2 items-center">
//               <Input
//                 type="text"
//                 placeholder="Search..."
//                 onChange={(e) => setSearchValue(e.target.value)}
//                 className="pl-8 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <Search className="cursor-pointer" onClick={handleSearch} />

//             </div>

//             {/* Export Options */}
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

//       {/* Table Section */}
//       <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm h-[500px] scrollbar-thin">
//         <table className="w-full text-sm text-left text-gray-500" ref={tableRef}>
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//             <tr>
//               {checkBoxSelection && (
//                 <th>
//                   <Input type="checkbox" className="w-4 h-4 mx-2" />
//                 </th>
//               )}
//               {columns.map((row, colIndex) => (
//                 <th
//                   key={row.field || `col-${colIndex}`}
//                   className="px-3 py-3 border-r-2 border-b-2"
//                 >
//                   {row.headerName}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan={columns.length + 1} className="text-center py-3">
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
//                   key={item.id || `row-${index}`}
//                   className="bg-white border-b hover:bg-gray-50"
//                   onClick={rowClicked ? () => rowClicked(item) : undefined}
//                 >
//                   {checkBoxSelection && (
//                     <td>
//                       <Input type="checkbox" className="w-4 h-4 mx-2" />
//                     </td>
//                   )}
//                   {columns.map((col, colIndex) => {
//                     const cellValue = col.renderCell
//                       ? col.renderCell(item)
//                       : getValue(item, col.field);
//                     return (
//                       <td key={`${col.field}-${colIndex}`} className="px-3 py-2 border-b">
//                         {cellValue || "-"}
//                       </td>
//                     );
//                   })}
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Bonus Table Section */}
//       {isBonusPayRegister && (
//         <BonusTable row={paginatedData} heading={heading} pdfOrientation={pdfOrientation} />
//       )}

//       {/* Pagination Section */}
//       <Stack spacing={2} direction={"row"} className="mb-5" justifyContent="center">
//         <Pagination
//           count={totalPages} // Total pages
//           page={currentPage} // Current page
//           onChange={(e, page) => {
//             setCurrentPage(page);
//             fetchData(page); // Fetch data for the selected page
//           }}
//           variant="outlined"
//         />
//       </Stack>
//     </div>
//   );
// }

// export default DataGrid;


import React, { useState, useEffect, useRef } from "react";
import { Pagination, Stack } from "@mui/material";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import BonusTable from "./BonusTable";
import { Search } from "lucide-react";
import axios from "axios";
import Cookies from "universal-cookie";
import html2canvas from "html2canvas";

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
  totalCounts,
  apiUrl,
}) {
  const [filterBy, setFilterBy] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [tableData, setTableData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;
  const tableRef = useRef(null);
  const [accessToken, setAccessToken] = useState("");
  const cookies = new Cookies();

  // Get access token from cookies
  useEffect(() => {
    const token = cookies.get("access");
    setAccessToken(token);
  }, []);

  // Initialize table data and pagination
  useEffect(() => {

    if (row?.length > 10) {
      setTotalPages(Math.ceil(row?.length / itemsPerPage));
      setPaginatedData(row.slice(0, itemsPerPage));
      setTableData(row);
    }
    else {
      setTotalPages(Math.ceil(totalCounts / itemsPerPage));
      setPaginatedData(row.slice(0, itemsPerPage));
      setTableData(row);
    }

  }, [row, totalCounts]);

  // Handle direct URL search
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const filterByParam = urlParams.keys().next().value;
    const searchValueParam = urlParams.get(filterByParam);

    if (filterByParam && searchValueParam) {
      setFilterBy(filterByParam);
      setSearchValue(searchValueParam);

      const searchUrl = `${apiUrl}?${filterByParam}=${encodeURIComponent(searchValueParam)}`;
      axios
        .get(searchUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          const { results, count } = response.data;
          setTableData(results);
          setPaginatedData(results.slice(0, itemsPerPage));
          setTotalPages(Math.ceil(count / itemsPerPage));
          setCurrentPage(1);
        })
        .catch((error) => console.error("Error fetching data from URL:", error));
    }
  }, [apiUrl, accessToken]);

  console.log("currentPage")

  // Handle search
  const handleSearch = async () => {
    const originalFilterBy = filterBy ? filterBy.toLowerCase() : "";
    const originalSearchValue = searchValue.trim();

    if (originalSearchValue.length > 0 || originalFilterBy) {
      const data = row.filter((element) => {
        return columns.find((col) => {

          if (col.field === filterBy) {
            let cellValue = col.renderCell ? col.renderCell(element) : getValue(element, col.field);
            if (`${cellValue}`.toLowerCase().includes(`${searchValue}`.toLowerCase())) {
              return element
            }
          }

        })
        // element[filterBy].toLowerCase().includes(searchValue.toLowerCase()) 

      })
      if (data.length > 0) {
        setTableData(data)
        setTotalPages(Math.ceil(data?.length / itemsPerPage));
        setPaginatedData(tableData.slice(0, 10));
      }
      else {
        try {
          setLoading(true);
          const searchUrl = `${apiUrl}?${originalFilterBy}=${encodeURIComponent(originalSearchValue)}`;
          const response = await axios.get(searchUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          const { results, count } = response.data;
          setTableData(results);
          setPaginatedData(results.slice(0, itemsPerPage));
          setTotalPages(Math.ceil(count / itemsPerPage));
          setCurrentPage(1);

          const newUrl = new URL(window.location.href);
          newUrl.searchParams.set(originalFilterBy, originalSearchValue);
          window.history.pushState({}, "", newUrl.toString());
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }

    } else {
      setPaginatedData(tableData.slice(0, itemsPerPage));
      setTotalPages(Math.ceil(tableData.length / itemsPerPage));
      setCurrentPage(1);
    }
  };

  // Fetch paginated data
  const fetchData = async (page) => {
    setLoading(true);
    const originalFilterBy = filterBy ? filterBy.toLowerCase() : "";

    const originalSearchValue = searchValue.trim();
    if (row.length > 10) {
      console.log("fetching offline data", paginatedData)

      var pagefrom = (page - 1) * 10;
      var pageto = (page - 1) * 10 + 10;
      setPaginatedData(tableData.slice(pagefrom, pageto));
      setCurrentPage(page);
      setLoading(false);
    }
    else {
      try {
        const response = await axios.get(`${apiUrl}?p=${page}&${originalFilterBy}=${encodeURIComponent(originalSearchValue)}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const { results, count } = response.data;
        setTableData(results);
        setPaginatedData(results.slice(0, itemsPerPage));
        setTotalPages(Math.ceil(count / itemsPerPage));
        setCurrentPage(page);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

  };
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
  const handleGenerateExcel = () => {
    const transformedArray = row.map(item => flattenObject(item));
    const ws = XLSX.utils.json_to_sheet(transformedArray);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
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
      html2canvas(bonusTableElement, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = doc.internal.pageSize.getWidth() - 20;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        doc.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
        doc.save("bonus-pay-register.pdf");
      });
    } else {
      const tableColumnHeaders = columns.map((col) => col.headerName);
      const tableRows = paginatedData.map((item) =>
        columns.map((col) =>
          col.renderCell ? col.renderCell(item) : getValue(item, col.field)
        )
      );
      doc.setFontSize(12);
      doc.text(heading.toUpperCase(), 14, 15);
      doc.autoTable({
        startY: 25,
        head: [tableColumnHeaders],
        body: tableRows,
      });
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
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm h-[500px] scrollbar-thin">
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
            {loading ? (
              <tr>
                <td colSpan={columns.length + 1} className="text-center border-2 py-3">
                  Loading data...
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="text-center py-3">
                  No data available
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => (
                <tr
                  key={index}
                  onClick={rowClicked ? () => rowClicked(item) : undefined}
                >
                  <td className="border-2 p-1 text-nowrap">
                    {(currentPage - 1) * itemsPerPage + index + 1}
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
      <Stack spacing={2} direction="row" justifyContent="center">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => fetchData(page)}
        />
      </Stack>
    </div>
  );
}

export default DataGrid;