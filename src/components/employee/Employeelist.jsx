import { DataGrid, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, useGridApiContext, gridExpandedSortedRowIdsSelector } from '@mui/x-data-grid';
import { Plus, Upload, Download } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useRequest from "../../hooks/useRequest";
import ImportFile from "./ImportFile";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

function Employeelist() {
  const [importFile, setImportFile] = useState(false);
  const [rateImport, setRateImport] = useState(false);
  const { data, error, loading } = useRequest("/master/employee/");
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0, // Current page index
    pageSize: 5, // Default page size
  });

  // Define the columns you want to show on the UI
  const columns = [
    { field: "id", headerName: "TrnId", width: 80 },
    { field: "EmpId", headerName: "EmpId", width: 80 },
    { field: "Name", headerName: "Name", width: 180 },
    { field: "Father", headerName: "Father", width: 180 },
    {
      field: "SiteDetails_name",
      headerName: "Site",
      width: 180,
    },
    {
      field: "DepartmentDetails_name",
      headerName: "Department",
      width: 180
    },
    {
      field: "DesignationDetails_name",
      headerName: "Designation",
      width: 180,
    },
    {
      field: "GangDetails_name",
      headerName: "Gang",
      width: 180,
    },
    { field: "Email", headerName: "Email", width: 220 },
    { field: "Gender", headerName: "Gender", width: 220 },
    { field: "MaritalStatus", headerName: "Married", width: 220 },
    { field: "PfApplicable", headerName: "PfApplicable", width: 220 },
    { field: "Uan", headerName: "Uan", width: 220 },
    { field: "EsicApplicable", headerName: "EsicApplicable", width: 220 },
    { field: "Esic", headerName: "Esic", width: 220 },
    { field: "PRFTax", headerName: "PRFTax", width: 220 },
    { field: "Mobile", headerName: "Mobile", width: 220 },
    { field: "EmpSafetyCard", headerName: "EmpSafetyCard", width: 220 },
    { field: "SafetyCardExpiry", headerName: "SafetyCardExpiry", width: 220 },
    { field: "Address", headerName: "Gender", width: 220 },
    { field: "AttendAllow", headerName: "AttendAllow", width: 220 },
    { field: "OtAppl", headerName: "OtAppl", width: 220 },
    { field: "MrOtAppl", headerName: "MrOtAppl", width: 220 },
    { field: "ReversePF", headerName: "ReversePF", width: 220 },
    { field: "Bank", headerName: "Bank", width: 220 },
    { field: "Branch", headerName: "Branch", width: 220 },
    { field: "Ifsc", headerName: "Ifsc", width: 220 },
    { field: "Ac", headerName: "Ac", width: 220 },
    { field: "Aadhar", headerName: "Aadhar", width: 220 },
    { field: "Pan", headerName: "Pan", width: 220 },
    { field: "Otslave", headerName: "Otslave", width: 220 },
    { field: "Ottype", headerName: "Ottype", width: 220 },
    { field: "Paymentmode", headerName: "Paymentmode", width: 220 },
    { field: "Weekoff", headerName: "Weekoff", width: 220 },
    { field: "Skill", headerName: "Skill", width: 220 },
    { field: "Status", headerName: "Status", width: 220 },
    { field: "Doe", headerName: "Doe", width: 220 },
    { field: "rate_basic", headerName: "basic", width: 220 },
    { field: "rate_da", headerName: "da", width: 220 },
    { field: "rate_arate", headerName: "arate", width: 220 },
    { field: "rate_otrate", headerName: "otrate", width: 220 },
    { field: "rate_hra", headerName: "hra", width: 220 },
    { field: "rate_madical", headerName: "madical", width: 220 },
    { field: "rate_ExgratiaRetention", headerName: "ExgratiaRetention", width: 220 },
    { field: "rate_LTARetention", headerName: "LTARetention", width: 220 },
    { field: "rate_LTA", headerName: "LTA", width: 220 },
    { field: "rate_CA", headerName: "CA", width: 220 },
    { field: "rate_Fooding", headerName: "Fooding", width: 220 },
    { field: "rate_Misc", headerName: "Misc", width: 220 },
    { field: "rate_CEA", headerName: "CEA", width: 220 },
    { field: "rate_WashingAllowance", headerName: "WashingAllowance", width: 220 },
    { field: "rate_ProfessionalPursuits", headerName: "ProfessionalPursuits", width: 220 },
    { field: "rate_SpecialAllowance", headerName: "SpecialAllowance", width: 220 },
    { field: "rate_IncomeTax", headerName: "IncomeTax", width: 220 },
    { field: "rate_personalpay", headerName: "personalpay", width: 220 },
    { field: "rate_petrol", headerName: "petrol", width: 220 },
    { field: "rate_mobile", headerName: "mobile", width: 220 },
    { field: "rate_incentive", headerName: "incentive", width: 220 },
    { field: "rate_fixedamt", headerName: "fixedamt", width: 220 },

  ];

  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    Dob: false,
    Imageurl: false,
    Uan: false,
    Esic: false,
    Mobile: false,
    EmpSafetyCard: false,
    SafetyCardExpiry: false,
    Aadhar: false,
    Pan: false,
    Address: false,
    Bank: false,
    Branch: false,
    Ifsc: false,
    Ac: false,
    PfApplicable: false,
    EsicApplicable: false,
    PRFTax: false,
    AttendAllow: false,
    AllowAsPer: false,
    ReversePF: false,
    OtAppl: false,
    MrOtAppl: false,
    Gender: false,
    MaritalStatus: false,
    Doj: false,
    Otslave: false,
    Ottype: false,
    Paymentmode: false,
    Weekoff: false,
    Skill: false,
    Status: false,
    Doe: false,
    rate_basic: false,
    rate_da: false,
    rate_arate: false,
    rate_otrate: false,
    rate_hra: false,
    rate_madical: false,
    rate_ExgratiaRetention: false,
    rate_LTARetention: false,
    rate_LTA: false,
    rate_CA: false,
    rate_Fooding: false,
    rate_Misc: false,
    rate_CEA: false,
    rate_WashingAllowance: false,
    rate_ProfessionalPursuits: false,
    rate_SpecialAllowance: false,
    rate_IncomeTax: false,
    rate_personalpay: false,
    rate_petrol: false,
    rate_mobile: false,
    rate_incentive: false,
    rate_fixedamt: false
  })


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
    if (data?.length > 0) {
      const filteredRows = data.map((row) => flattenObject(row));
      setRows(filteredRows);
    }
  }, [data]);


  const handleRowClicked = (params) => {
    if(params.field == "Name"){
    navigate(`/employee/${params.id}`, { id: params.id });
    }
    
  };

  // const handlePaginationModelChange = (model) => {
  //   setPaginationModel(model);

  //   // Calculate the current page data
  //   const startIndex = model.page * model.pageSize;
  //   const endIndex = startIndex + model.pageSize;
  //   const currentPageData = rows.slice(startIndex, endIndex);

  //   console.log("Current Page Data:", currentPageData);
  // };


  // const generatePDF = () => {
  //   // Initialize jsPDF with landscape orientation
  //   const doc = new jsPDF("landscape");

  //   // Get the visible columns
  //   const visibleColumns = columns.filter(
  //     (col) => columnVisibilityModel[col.field] !== false
  //   );

  //   // Prepare headers and rows
  //   const headers = visibleColumns.map((col) => col.headerName);
  //   const dataRows = rows.map((row) =>
  //     visibleColumns.map((col) => row[col.field] || "")
  //   );

  //   // Add title
  //   doc.text("Employee List", 14, 10);

  //   // Calculate dynamic column widths
  //   const columnStyles = {};
  //   visibleColumns.forEach((col, index) => {
  //     columnStyles[index] = { cellWidth: 'auto' }; // Automatically adjust the width
  //   });

  //   // Add the table
  //   doc.autoTable({
  //     startY: 25,
  //     head: [headers],
  //     body: dataRows,
  //     styles: {
  //       fontSize: 8, // Font size for table content
  //       cellPadding: 3, // Padding for cells
  //     },
  //     headStyles: {
  //       fillColor: [22, 160, 133], // Custom header color
  //       fontSize: 8,
  //       halign: "center", // Center align header text
  //     },
  //     columnStyles, // Dynamic column width
  //     theme: "grid", // Table theme
  //     bodyStyles: {
  //       halign: "left", // Align text in data cells
  //     },
  //     tableWidth: "auto", // Automatically adjust table width
  //   });

  //   // Save the PDF
  //   doc.save("EmployeeList.pdf");
  // };

  // const generateExcel = () => {
  //   // Get the visible columns
  //   const visibleColumns = columns.filter(
  //     (col) => columnVisibilityModel[col.field] !== false
  //   );

  //   // Prepare headers and rows
  //   const headers = visibleColumns.map((col) => col.headerName);
  //   const dataRows = rows.map((row) =>
  //     visibleColumns.map((col) => row[col.field] || "")
  //   );

  //   // Create a worksheet from data
  //   const ws = XLSX.utils.aoa_to_sheet([headers, ...dataRows]);

  //   // Create a workbook
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, "Employee List");

  //   // Set custom styles (this is optional, Excel styling capabilities are limited in comparison to PDF)
  //   const wscols = visibleColumns.map(() => ({ wpx: 100 })); // Set default column width

  //   ws["!cols"] = wscols; // Apply column width
  //   ws["!rows"] = dataRows.length; // Set the number of rows

  //   // Export to Excel (download the file)
  //   XLSX.writeFile(wb, "EmployeeList.xlsx");
  // };


  const generatePDF = () => {
    const visibleColumns = columns.filter(
      (col) => columnVisibilityModel[col.field] !== false
    );
  
    const headers = visibleColumns.map((col) => col.headerName);
  
    // Filter rows based on pagination
    // const startIndex = paginationModel.page * paginationModel.pageSize;
    // const endIndex = startIndex + paginationModel.pageSize;
    // const currentPageRows = rows.slice(startIndex, endIndex);
  
    const dataRows = rows.map((row) =>
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
      (col) => columnVisibilityModel[col.field] !== false
    );
  
    const headers = visibleColumns.map((col) => col.headerName);
  
    // Filter rows based on pagination
    // const startIndex = paginationModel.page * paginationModel.pageSize;
    // const endIndex = startIndex + paginationModel.pageSize;

    const dataRows = rows.map((row) =>
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
    <div className="flex flex-col gap-2 p-1">
      <div className="mt-4 mr-2">
        <span className="flex gap-2 float-right">
          <NavLink to="/newemployee" className="bg-gray-50 rounded-lg shadow p-2 hover:bg-gray-200">
            <div className="flex gap-2">
              <Plus /> Add
            </div>
          </NavLink>

          <div
            className="flex gap-2 bg-gray-50 rounded-lg shadow p-2 hover:bg-gray-200 cursor-pointer"
            onClick={() => {
              setImportFile(true);
              setRateImport(false);
            }}
          >
            <Upload /> Import
          </div>
          <div
            className="flex gap-2 bg-gray-50 rounded-lg shadow p-2 hover:bg-gray-200 cursor-pointer"
            onClick={() => {
              setImportFile(false);
              setRateImport(true);
            }}
          >
            <Upload /> Rate Import
          </div>

          <div
            className="flex gap-2 bg-gray-50 rounded-lg shadow p-2 hover:bg-gray-200 cursor-pointer"
            onClick={() => {
              navigate("/sync");
            }}
          >
            Sync
          </div>
        </span>
      </div>

      {importFile && (
        <ImportFile
          heading="import employee"
          closeModel={() => {
            setImportFile(false);
            setRateImport(false);
          }}
          newItem={true}
          api="/master/employee/"
        />
      )}
      {rateImport && (
        <ImportFile
          heading="import rate"
          closeModel={() => {
            setImportFile(false);
            setRateImport(false);
          }}
          newItem={false}
          api="/master/rate/"
        />
      )}

      {loading ? (
        <div className="flex justify-center items-center">
          Loading...
        </div>
      ) : rows.length ? (
        <div style={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection={true}
            columnVisibilityModel={columnVisibilityModel}
            slots={{
              toolbar: CustomToolbar,
            }}
            onCellClick={handleRowClicked}
            onColumnVisibilityModelChange={(newModel) =>
              setColumnVisibilityModel(newModel)
            }
          />
        </div>

      ) : (
        <div>No data available</div>
      )}
    </div>
  );
}

export default Employeelist;
