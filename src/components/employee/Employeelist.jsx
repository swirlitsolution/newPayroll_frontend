import { Plus, Upload,  } from "lucide-react";
import  { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ImportFile from "./ImportFile";
import "jspdf-autotable";
import NewDataGrid from '../custom/NewDataGrid';
import { useEmployee } from '../../hooks/useEmployee';
import { useDispatch } from "react-redux";
import {setSelectedEmployee,setShow} from '../../Redux/Slices/EmpSlice'
import EmpModel from "./EmpModel";
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
  
  const dispatch = useDispatch()
  // Define the columns you want to show on the UI

  const columnVisibilityModel = {
    Gang:false,
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
  }

  const { data, isLoading, error } = useEmployee()
  console.log("employees",data)
  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  const handleRowClicked = (params) => {
    if(params.field == "Name"){
      console.log("params", params.row)
    navigate(`/employee/${params.id}`, { id: params.id });
    // dispatch(setSelectedEmployee(params.row))
    // dispatch(setShow(true))
    }
    
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

      <EmpModel />
      <NewDataGrid
        data={data}
        columns={columns}
        columnVisibilityModel={columnVisibilityModel}
        handleRowClicked={handleRowClicked}


      />
    </div>
  );
}

export default Employeelist;
