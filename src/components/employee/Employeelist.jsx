import React, { useEffect, useState } from "react";
import DataGrid from "../custom/DataGrid";
import { Pen, Plus, Upload } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ImportFile from "./ImportFile";
import useRequest from "../../hooks/useRequest";

const columns = [
  { field: "id", headerName: "TrnId", width: "80px" },
  { field: "EmpId", headerName: "EmpId", width: "80px" },
  { field: "Name", headerName: "Name" },
  { field: "Father", headerName: "Father" },
  { field: "Site", headerName: "Site", renderCell: (params) => params.SiteDetails.name },
  { field: "Department", headerName: "Department", renderCell: (params) => params.DepartmentDetails.name },
  { field: "Designation", headerName: "Designation", renderCell: (params) => params.DesignationDetails.name },
  { field: "Gang", headerName: "Gang", renderCell: (params) => params.GangDetails.name },
  { field: "Email", headerName: "Email" },
];

function Employeelist() {
  const [importFile, setImportFile] = useState(false);
  const [rateImport, setRateImport] = useState(false);
  const { data, error, loading } = useRequest("/master/employee/");
  const navigate = useNavigate();

  console.log("count", data?.count);

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
        "Loading......"
      ) : data?.results?.length ? (
        <DataGrid
          heading="Employees"
          columns={columns}
          row={data?.results} // Pass all the data to the DataGrid
          rowClicked={handleRowClicked}
          pageInfo={true} // Enable pagination controls
          totalCounts={data?.count || 0}
          apiUrl="/master/employee/" // Pass the API URL for dynamic fetching
        />
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
}

export default Employeelist;
