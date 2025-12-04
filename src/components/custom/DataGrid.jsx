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
const processChildArray = (children) => {
  if (Array.isArray(children)) {
    return children.map((child) => {
      return processChildArray(child);
    });
  }
  else{
    return children;
  }
    
};
const processChildren = (children) => {
  if (Array.isArray(children)) {
    return children.map((child) => {
      if (React.isValidElement(child)) {
        
        return processChildren(child.props.children);
      }
      else if(Array.isArray(child)){
        return processChildArray(child);
      }

      return child;
    });
  } else if (React.isValidElement(children)) {
    return processChildren(children.props.children);
  }
  return children;
};

export const processValue = (value) => {
  if (React.isValidElement(value)) {
    if(Array.isArray(value.props?.children)) {
      // If children is an array, process each child recursively
      return processChildren(value.props.children).join(" ");
    }
    else{
      console.log("Not array")
    }
    // If it's a React element, return its children or an empty string
    
    return value.props?.children || "";
  } else if (Array.isArray(value)) {
    return value
      .map((obj) => (typeof obj === "object" ? JSON.stringify(obj) : obj))
      .join(": ");
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
  isPayrollSummary,
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

  // Handle search
  const handleSearch = async () => {
    const originalFilterBy = filterBy ? filterBy.toLowerCase() : "";
    const originalSearchValue = searchValue.trim();

    if (originalSearchValue.length > 0 || originalFilterBy) {
      const data = row.filter((element) => {
        return columns.find((col) => {
          if (col.field === filterBy) {
            let cellValue = col.renderCell
              ? col.playgroundcol.renderCell(element)
              : getValue(element, col.field);
            cellValue = processValue(cellValue); // Convert to string for search
            return cellValue.toLowerCase().includes(originalSearchValue.toLowerCase());
          }
        });
      });
      setTableData(data);
    } else {
      setTableData(row);
    }
  };

  const handleGenerateExcel = () => {
    // Prepare data for Excel by mapping through tableData and columns
    const transformedArray = tableData.map((item) => {
      const rowData = {};

      columns.forEach((column) => {
        const field = column.field;
        let cellValue;

        if (column.renderCell) {
          // Handle custom renderCell logic
          const renderedValue = column.renderCell(item);
          cellValue = processValue(renderedValue); // Extract meaningful content
        } else {
          // Handle regular fields
          cellValue = getValue(item, field);
        }

        // Ensure the value is a string and matches the display format
        rowData[column.headerName] = cellValue !== undefined && cellValue !== null
          ? cellValue.toString()
          : "";
      });

      return rowData;
    });

    // Create worksheet with header names
    const ws = XLSX.utils.json_to_sheet(transformedArray, {
      header: columns.map((col) => col.headerName),
    });

    // Create workbook and export
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${heading}.xlsx`);
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF({ orientation: pdfOrientation });

    if (isBonusPayRegister) {
      const bonusTableElement = document.getElementById("bonus-table");

      if (!bonusTableElement) {
        console.error("Bonus Table element not found!");
        return;
      }

      // Generate PDF from the bonus table element
      html2canvas(bonusTableElement, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = doc.internal.pageSize.getWidth() - 20;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        doc.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
        doc.save("bonus-pay-register.pdf");
      });
    } else {
      // Extract visible column headers
      const tableColumnHeaders = columns.map((col) => col.headerName);

      // Process table rows dynamically
      const tableRows = tableData?.map((item) =>
        columns.map((col) => {
          let cellValue;

          if (col.renderCell) {
            // Handle custom renderCell logic
            const renderedValue = col.renderCell(item);
            cellValue = processValue(renderedValue); // Extract meaningful content
            console.log(cellValue)
          } else {
            // Handle regular fields
            cellValue = getValue(item, col.field);
          }

          return cellValue !== undefined && cellValue !== null
            ? cellValue.toString()
            : "";
        })
      );

      // Set the title of the PDF
      doc.setFontSize(12);
      doc.text(heading.toUpperCase(), 10, 10);

      // Define column styles to ensure proper width and alignment
      const columnStyles = columns.reduce((styles, col, index) => {
        let cellWidth;
        if (col.headerName.match(/^\d+$/)) {
          // Day columns (1 to 31) should be narrower
          cellWidth = 5; // Adjust width for day columns
        } else if (["EmpId", "S", "Present", "Payable", "OT"].includes(col.headerName)) {
          cellWidth = 10; // Smaller width for EmpId, S, Present, Payable, OT
        } else {
          cellWidth = 15; // Wider width for Name, Department, Designation, Gang
        }
        return {
          ...styles,
          [index]: { cellWidth, halign: "center" },
        };
      }, {});

      // Generate the table in the PDF
      doc.autoTable({
        startY: 20,
        head: [tableColumnHeaders],
        body: tableRows,
        theme: "grid",
        styles: {
          fontSize: 6, // Smaller font size to fit all columns
          cellPadding: 1, // Reduced padding for compact layout
          overflow: "linebreak", // Handle content overflow
          halign: "center", // Center-align all cells by default
          valign: "middle", // Vertically center content
        },
        columnStyles: columnStyles,
        headStyles: {
          fillColor: [200, 200, 200], // Light gray background for header
          textColor: [0, 0, 0], // Black text for header
          fontSize: 6,
          halign: "center",
        },
        bodyStyles: {
          fontSize: 6,
        },
        margin: { top: 20, left: 5, right: 5 }, // Adjust margins to fit more content
        didDrawPage: (data) => {
          // Add page numbers
          const pageCount = doc.internal.getNumberOfPages();
          const pageNumber = data.pageNumber;
          doc.setFontSize(8);
          doc.text(`Page ${pageNumber} of ${pageCount}`, 190, 287);
        },
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
            {tableData?.length === 0 ? (
              <tr>
                <td colSpan={columns?.length + (checkBoxSelection ? 2 : 1)} className="text-center py-3">
                  No data available
                </td>
              </tr>
            ) : (
              tableData?.map((item, index) => (
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