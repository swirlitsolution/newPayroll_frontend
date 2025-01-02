import React, { useEffect, useState } from "react";
import { Pen, Plus, Upload } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ImportFile from "./ImportFile";
import useRequest from "../../hooks/useRequest";
import { DataGrid, GridToolbar,  } from '@mui/x-data-grid';
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
function Employeelist() {
  const [importFile, setImportFile] = useState(false);
  const [rateImport, setRateImport] = useState(false);
  const { data, error, loading } = useRequest("/master/employee/");
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  
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
    Doe:false,
    rate_basic:false,
    rate_da:false,
    rate_arate:false,
    rate_otrate:false,
    rate_hra:false,
    rate_madical:false,
    rate_ExgratiaRetention:false,
    rate_LTARetention:false,
    rate_LTA:false,
    rate_CA:false,
    rate_Fooding:false,
    rate_Misc:false,
    rate_CEA:false,
    rate_WashingAllowance:false,
    rate_ProfessionalPursuits:false,
    rate_SpecialAllowance:false,
    rate_IncomeTax:false,
    rate_personalpay:false,
    rate_petrol:false,
    rate_mobile:false,
    rate_incentive:false,
    rate_fixedamt:false
  })

  // Define the columns you want to show on the UI
  

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
    console.log("Data request started");
    if (data?.length > 0) {
      const filteredRows = data.map((row) => flattenObject(row));
      setRows(filteredRows);
    }
    console.log("Data fetched:", data);
  }, [data]);

  const handleRowClicked = (params) => {
    navigate(`/employee/${params.id}`, { id: params.id });
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
          filename="sample_employee_master.xlsx"
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
          filename="rate.xlsx"
          newItem={false}
          api="/master/rate/"
        />
      )}

      {loading ? (
        // Show a loader while data is loading
        <div className="flex justify-center items-center">
          Loading...
        </div>
      ) : rows.length ? (
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
      
            columnVisibilityModel={columnVisibilityModel}
            pageSizeOptions={[5, 10, 50,100,801]}
            components={{ Toolbar: GridToolbar }}
            disableSelectionOnClick
            onRowClick={handleRowClicked}
            slots={{ toolbar: GridToolbar }}
            onColumnVisibilityModelChange={(newModel) =>
              setColumnVisibilityModel(newModel)
            } 
          />
        </div>
      ) : (
        // Display no data message if no rows are available
        <div>No data available</div>
      )}
    </div>
  );
}

export default Employeelist;
