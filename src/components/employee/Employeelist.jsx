import React, { useEffect, useState } from "react";
import { Box, Pen, Plus, Upload } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ImportFile from "./ImportFile";
import useRequest from "../../hooks/useRequest";
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport, GridToolbar } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';

function Employeelist() {
  const [importFile, setImportFile] = useState(false);
  const [rateImport, setRateImport] = useState(false);
  const { data, error, loading } = useRequest("/master/employee/");
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  // Define the columns you want to show on the UI
  // const columns = [
  //   { field: "id", headerName: "TrnId", width: 80 },
  //   { field: "EmpId", headerName: "EmpId", width: 80 },
  //   { field: "Name", headerName: "Name", width: 180 },
  //   { field: "Father", headerName: "Father", width: 180 },
  //   { field: "SiteDetails_name", headerName: "Site", width: 180 },
  //   { field: "DepartmentDetails_name", headerName: "Department", width: 180 },
  //   { field: "DesignationDetails_name", headerName: "Designation", width: 180 },
  //   { field: "GangDetails_name", headerName: "Gang", width: 180 },
  //   { field: "Email", headerName: "Email", width: 220 },
  //   { field: "Gender", headerName: "Gender", width: 150 },
  //   // Additional hidden columns
  //   { field: "Dob", headerName: "Date of Birth", width: 150 },
  //   { field: "Imageurl", headerName: "Image URL", width: 200 },
  //   { field: "Uan", headerName: "UAN", width: 150 },
  //   { field: "Esic", headerName: "ESIC", width: 150 },
  //   { field: "Mobile", headerName: "Mobile", width: 150 },
  //   { field: "EmpSafetyCard", headerName: "Safety Card", width: 150 },
  //   { field: "SafetyCardExpiry", headerName: "Safety Card Expiry", width: 150 },
  //   { field: "Aadhar", headerName: "Aadhar", width: 150 },
  //   { field: "Pan", headerName: "PAN", width: 150 },
  //   { field: "Address", headerName: "Address", width: 200 },
  //   { field: "Bank", headerName: "Bank", width: 150 },
  //   { field: "Branch", headerName: "Branch", width: 150 },
  //   { field: "Ifsc", headerName: "IFSC Code", width: 150 },
  //   { field: "Ac", headerName: "Account Number", width: 150 },
  //   { field: "PfApplicable", headerName: "PF Applicable", width: 150 },
  //   { field: "EsicApplicable", headerName: "ESIC Applicable", width: 150 },
  //   { field: "PRFTax", headerName: "Professional Tax", width: 150 },
  //   { field: "AttendAllow", headerName: "Attendance Allowance", width: 150 },
  //   { field: "AllowAsPer", headerName: "Allowance As Per", width: 150 },
  //   { field: "ReversePF", headerName: "Reverse PF", width: 150 },
  //   { field: "OtAppl", headerName: "OT Applicable", width: 150 },
  //   { field: "MrOtAppl", headerName: "MR OT Applicable", width: 150 },
  //   { field: "MaritalStatus", headerName: "Marital Status", width: 150 },
  //   { field: "Doj", headerName: "Date of Joining", width: 150 },
  //   { field: "Otslave", headerName: "OT Slave", width: 150 },
  //   { field: "Ottype", headerName: "OT Type", width: 150 },
  //   { field: "Paymentmode", headerName: "Payment Mode", width: 150 },
  //   { field: "Weekoff", headerName: "Week Off", width: 150 },
  //   { field: "Skill", headerName: "Skill", width: 150 },
  //   { field: "Status", headerName: "Status", width: 150 },
  // ];

  const columns = [
    {
      field: "id",
      headerName: "TrnId",
      width: 80,
    },
    {
      field: "EmpId",
      headerName: "EmpId",
      width: 80,
      renderHeader: () => (
        <span>
          EmpId <span style={{ color: "red" }}>*</span>
        </span>
      ),
    },
    {
      field: "Name",
      headerName: "Name",
      width: 180,
      renderHeader: () => (
        <span>
          Name <span style={{ color: "red" }}>*</span>
        </span>
      ),
    },
    {
      field: "Father",
      headerName: "Father",
      width: 180,
    },
    {
      field: "SiteDetails_name",
      headerName: "Site",
      width: 180,
      renderHeader: () => (
        <span>
          Site <span style={{ color: "red" }}>*</span>
        </span>
      ),
    },
    {
      field: "DepartmentDetails_name",
      headerName: "Department",
      width: 180,
      renderHeader: () => (
        <span>
          Department <span style={{ color: "red" }}>*</span>
        </span>
      ),
    },
    {
      field: "DesignationDetails_name",
      headerName: "Designation",
      width: 180,
      renderHeader: () => (
        <span>
          Designation <span style={{ color: "red" }}>*</span>
        </span>
      ),
    },
    {
      field: "GangDetails_name",
      headerName: "Gang",
      width: 180,
    },
    {
      field: "Email",
      headerName: "Email",
      width: 220,
    },
    {
      field: "Gender",
      headerName: "Gender",
      width: 150,
    },
    {
      field: "Dob",
      headerName: "Date of Birth",
      width: 150,
    },
    {
      field: "Imageurl",
      headerName: "Image URL",
      width: 200,
    },
    {
      field: "Uan",
      headerName: "UAN",
      width: 150,
    },
    {
      field: "Esic",
      headerName: "ESIC",
      width: 150,
    },
    {
      field: "Mobile",
      headerName: "Mobile",
      width: 150,
    },
    {
      field: "Aadhar",
      headerName: "Aadhar",
      width: 150,
      renderHeader: () => (
        <span>
          Aadhar <span style={{ color: "red" }}>*</span>
        </span>
      ),
    },
    {
      field: "Pan",
      headerName: "PAN",
      width: 150,
    },
    {
      field: "Address",
      headerName: "Address",
      width: 200,
    },
    {
      field: "Status",
      headerName: "Status",
      width: 150,
      renderHeader: () => (
        <span>
          Status <span style={{ color: "red" }}>*</span>
        </span>
      ),
    },
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
  });
  console.log("rows", rows)
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
      console.log("filteredRows, ", filteredRows)
    }
  }, [data]);

  const ids = rows?.map((row) => row?.id);
  console.log(ids)

  const handleRowClicked = (params) => {
    navigate(`/employee/${params.id}`, { id: params.id });
  };

  // const CustomToolbar = () => {
  //   const visibleFields = columns
  //     .filter((col) => columnVisibilityModel[col.field] !== false)
  //     .map((col) => col.field);

  //   return (
  //     // <GridToolbarContainer>
  //     //   <GridToolbarColumnsButton />
  //     //   <GridToolbarFilterButton />
  //     //   <GridToolbarDensitySelector />
  //     //   <GridToolbarExport
  //     //     printOptions={{
  //     //       allColumns: false, // Only visible columns
  //     //       fields: visibleFields, // Dynamically get visible columns
  //     //       rowIds: rows.map((row) => row.id), // Include all rows
  //     //     }}
  //     //   />
  //     // </GridToolbarContainer>
  //     <GridToolbarContainer>
  //       <GridToolbarColumnsButton />
  //       <GridToolbarFilterButton />
  //       <GridToolbarDensitySelector
  //         slotProps={{ tooltip: { title: 'Change density' } }}
  //       />
  //       <GridToolbarExport
  //         slotProps={{
  //           tooltip: { title: 'Export data' },
  //           button: { variant: 'outlined' },
  //         }}
  //         printOptions={{
  //           allColumns: false, // Export only visible columns
  //           fields: visibleFields, // Dynamically show visible columns
  //           rowIds: ids, // Export all rows
  //         }}
  //       />
  //     </GridToolbarContainer>
  //   );
  // };

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
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            columnVisibilityModel={columnVisibilityModel}
            pageSizeOptions={[5, 10, 50]}
            slots={{
              toolbar: GridToolbar,
            }}
            disableSelectionOnClick
            onRowClick={handleRowClicked}
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
