import { DataGrid, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, useGridApiRef } from '@mui/x-data-grid';
import { Plus, Upload, Download } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import  { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ImportFile from "./ImportFile";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { useQuery } from '@tanstack/react-query';
import { fetchEmployees } from '../../Redux/api/Employee';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterModel } from '../../Redux/Slices/FilterSlice';
const columns = [
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

function Employeelist() {
  const [importFile, setImportFile] = useState(false);
  const [rateImport, setRateImport] = useState(false);
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
   const dispatch = useDispatch();
  const filterModel = useSelector(state => state.filter.filterModel);
  const [paginationModel] = useState({
    page: 0, // Current page index
    pageSize: 5, // Default page size
  });

  // Define the columns you want to show on the UI


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

  const { data, isLoading, error } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
    staleTime: 1000 * 60 * 5, // cache 5 minutes
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
    if (!isLoading && data) {
      const filteredRows = data.map((row, index) => ({
        ...flattenObject(row),
        id: row.id || index,
      }));
      setRows(filteredRows);
    }
  }, [data]);

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  const handleRowClicked = (params) => {
    if(params.field == "Name"){
      console.log("params", params)
    navigate(`/employee/${params.id}`, { id: params.id });
    }
    
  };
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
      (col) => columnVisibilityModel[col.field] !== false
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
      (col) => columnVisibilityModel[col.field] !== false
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

          {/* <div
            className="flex gap-2 bg-gray-50 rounded-lg shadow p-2 hover:bg-gray-200 cursor-pointer"
            onClick={() => {
              navigate("/sync");
            }}
          >
            Sync
          </div> */}
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
          filename="sample_employee_master.xlsx"
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
          filename="rate.xlsx"
          api="/master/rate/"
        />
      )}


        <div style={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection={true}
            filterModel={filterModel || undefined}
            onFilterModelChange={(newModel) => dispatch(setFilterModel(newModel))}
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

    </div>
  );
}

export default Employeelist;
