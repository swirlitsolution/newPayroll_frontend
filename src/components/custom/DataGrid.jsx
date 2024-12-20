import { useRef, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
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

const getValue = (item, field) => {
  const fields = field.split(".");
  return fields.reduce(
    (acc, key) => (acc && acc[key] !== undefined ? acc[key] : ""),
    item
  );
};

function DataGrid({
  heading,
  columns,
  row,
  checkBoxSelection,
  rowClicked,
  pdfOrientation = "portrait", // Default orientation is portrait
}) {
  const [filterBy, setFilterBy] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [tableData, setTableData] = useState(row);
  const tableRef = useRef(null);

  const handleGenerateExcel = () => {
    const table = tableRef.current;
    const wb = XLSX.utils.table_to_book(table, { sheet: "Sheet 1" });
    XLSX.writeFile(wb, "reportdocument.xlsx");
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF({
      orientation: pdfOrientation, // Use the pdfOrientation prop
    });
  
    let formattedHeading = heading || "Table Report";
    let tableColumnHeaders = [];
    let tableRows = [];
  
    if (formattedHeading.toLowerCase() === "bonuspayregister") {
      // Custom formatting for the BonusPayRegister tab
      formattedHeading = "Bonus Pay Register";
      tableColumnHeaders = ["Employee ID", "Name", "Department", "Designation", "Bonus Amount"];
  
      // Mapping table rows to match the BonusPayRegister format
      tableRows = tableData.map((item) => [
        item.EmpId || "N/A",
        item.Name || "N/A",
        item.Department || "N/A",
        item.Designation || "N/A",
        item.BonusAmount || "N/A",
      ]);
    } else {
      // Default formatting for other tabs
      tableColumnHeaders = columns.map((col) => col.headerName);
      tableRows = tableData.map((item) =>
        columns.map((col) =>
          col.renderCell ? col.renderCell(item) : getValue(item, col.field)
        )
      );
    }
  
    // Set title
    doc.setFontSize(12);
    doc.setTextColor(40);
    doc.text(formattedHeading.toUpperCase(), 14, 15);
  
    // Add table
    doc.autoTable({
      startY: 25,
      head: [tableColumnHeaders],
      body: tableRows,
      theme: "grid",
      headStyles: {
        fillColor: "#f5f6fa",
        textColor: "#000",
        fontSize: 7.5,
      },
      bodyStyles: { fontSize: 8 },
      styles: { font: "helvetica", overflow: "linebreak" },
      margin: { top: 10 },
    });
  
    // Save the PDF
    doc.save(`${formattedHeading.toLowerCase().replace(/\s+/g, "-")}.pdf`);
  };
  

  const handleSearch = () => {
    if (searchValue.length > 3) {
      const data = row.filter((element) => {
        return columns.find((col) => {
          if (col.field === filterBy) {
            let cellValue = col.renderCell
              ? col.renderCell(element)
              : getValue(element, col.field);
            if (
              `${cellValue}`.toLowerCase().includes(`${searchValue}`.toLowerCase())
            ) {
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

  return (
    <div className="flex flex-col overflow-x-hidden overflow-y-auto gap-2">
      <div className="bg-white rounded-lg shadow p-2 border-2">
        <div className="flex justify-between items-center pl-2">
          <h3 className="font-bold text-sm">{heading.toUpperCase()}</h3>
          <div className="relative flex justify-around gap-2">
            <Select onValueChange={(value) => setFilterBy(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter By" />
              </SelectTrigger>
              <SelectContent>
                {columns.map((key) => (
                  <SelectItem value={key.field} key={key.field}>
                    {key.headerName.charAt(0).toUpperCase() +
                      key.headerName.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2 items-center pr-2">
              <Input
                type="text"
                placeholder="Search..."
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-8 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search
                className="cursor-pointer hover:text-indigo-600"
                onClick={handleSearch}
              />
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
              {checkBoxSelection && (
                <th>
                  <Input type="checkbox" className="w-4 h-4 mx-2" />
                </th>
              )}
              {columns.map((row) => (
                <th key={row.field} className="px-3 py-3 border-r-2 border-b-2">
                  {row.headerName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((item) => (
              <tr
                key={item.id}
                className="bg-white border-b hover:bg-gray-50"
                onClick={rowClicked ? () => rowClicked(item) : undefined}
              >
                {checkBoxSelection && (
                  <td>
                    <Input type="checkbox" className="w-4 h-4 mx-2" />
                  </td>
                )}
                {columns.map((col) => {
                  let cellValue = col.renderCell
                    ? col.renderCell(item)
                    : getValue(item, col.field);
                  return (
                    <td key={col.field} className="px-3 py-2 border-r-2">
                      {cellValue}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataGrid;
