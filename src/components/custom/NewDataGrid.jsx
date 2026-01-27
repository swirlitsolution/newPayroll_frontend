import React, { useEffect, useState } from 'react'
import { DataGrid, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector } from '@mui/x-data-grid';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Plus, Upload, Download } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { useDispatch, useSelector } from 'react-redux';
import { setColumnVisibility, setFilterModel } from '../../Redux/Slices/FilterSlice';

function NewDataGrid({data,columns,columnVisibilityModel,handleRowClicked}) {
    const [rows, setRows] = useState([]);
    const dispatch = useDispatch();
    const {filterModel,columnVisibility} = useSelector(state => state.filter);
    const [paginationModel] = useState({
        page: 0, // Current page index
        pageSize: 5, // Default page size
    });
    const flattenObject = (obj, parentKey = '') => {
        let result = {};

        for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            const newKey = parentKey ? `${parentKey}_${key}` : key;

            if (typeof obj[key] === 'object' && obj[key] !== null) {
            Object.assign(result, flattenObject(obj[key], newKey));
            } else {
            result[newKey] = obj[key];
            }
        }
        }

        return result;
    };
    useEffect(() => {
        
        if (data) {
          const filteredRows = data?.map((row, index) => ({
            ...flattenObject(row),
            id: row.id || index,
          }));
          setRows(filteredRows);
        }
      }, [data]);
    const onFilter = (Allrows) => {
        if (!filterModel || !filterModel.items || filterModel.items.length === 0) {
        console.log("Allrows", Allrows)
        return Allrows;
        }
        else{
        console.log("Filtering")
        return Allrows.filter((row) => {
            return filterModel.items.every((filter) => {
            const value = row[filter.field];
            if (filter.operator === 'contains') {
                return String(value).toLowerCase().includes(String(filter.value).toLowerCase());
            }
            // Add more operator conditions as needed
            return true;
            });
        })
    }
    }
    const generatePDF = () => {
    const visibleColumns = columns.filter(
        (col) => columnVisibility[col.field] !== false
    );

    const headers = visibleColumns.map((col) => col.headerName);

    // Filter rows based on pagination
    // const startIndex = paginationModel.page * paginationModel.pageSize;
    // const endIndex = startIndex + paginationModel.pageSize;
    // const currentPageRows = rows.slice(startIndex, endIndex);
    const currentRows = onFilter(rows);
    const dataRows = currentRows.map((row) =>
        visibleColumns.map((col) => row[col.field] || "")
    );

    const doc = new jsPDF("landscape");
    doc.text("Employee List", 14, 10);

    const columnStyles = {};
    visibleColumns.forEach((col, index) => {
        columnStyles[index] = { cellWidth: "auto" };
    });

    doc.autoTable({
        startY: 25,
        head: [headers],
        body: dataRows,
        styles: {
        fontSize: 8,
        cellPadding: 3,
        },
        headStyles: {
        fillColor: [22, 160, 133],
        fontSize: 8,
        halign: "center",
        },
        columnStyles,
        theme: "grid",
        bodyStyles: {
        halign: "left",
        },
        tableWidth: "auto",
    });

    doc.save(`EmployeeList_Page_${paginationModel.page + 1}.pdf`);
    };

    const generateExcel = () => {
    
    const visibleColumns = columns.filter(
        (col) => columnVisibility[col.field] !== false
    );

    const headers = visibleColumns.map((col) => col.headerName);

    // Filter rows based on pagination
    // const startIndex = paginationModel.page * paginationModel.pageSize;
    // const endIndex = startIndex + paginationModel.pageSize;
    
    const currentRows = onFilter(rows);
    const dataRows = currentRows.map((row) =>
        visibleColumns.map((col) => row[col.field] || "")
    );

    const ws = XLSX.utils.aoa_to_sheet([headers, ...dataRows]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Employee List");

    XLSX.writeFile(wb, `EmployeeList_Page_${paginationModel.page + 1}.xlsx`);
    };

    const CustomToolbar = () => {
    
    return (
        <div style={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <Menubar>
            <MenubarMenu>
            <MenubarTrigger className="text-[#1976d2] cursor-pointer flex items-center gap-1">
                <Download size={16} strokeWidth={2.5} /> {/* Export icon */}
                EXPORT
            </MenubarTrigger>
            <MenubarContent>
                <MenubarItem className="cursor-pointer" onClick={generateExcel}>Excel</MenubarItem>
                <MenubarItem className="cursor-pointer" onClick={generatePDF}>PDF</MenubarItem>
            </MenubarContent>
            </MenubarMenu>
        </Menubar>
        </div>
    );
    };
    
  return (
    <div>
        <div style={{ height: 600, width: "100%" }}>
            <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection={true}
            filterModel={filterModel || undefined}
            onFilterModelChange={(newModel) => dispatch(setFilterModel(newModel))}
            columnVisibilityModel={columnVisibility || columnVisibilityModel}
            slots={{
                toolbar: CustomToolbar,
            }}
            onCellClick={handleRowClicked}
            onColumnVisibilityModelChange={(newModel) =>
                dispatch(setColumnVisibility(newModel))
            }
            />
        </div>
    </div>
  )
}

export default NewDataGrid