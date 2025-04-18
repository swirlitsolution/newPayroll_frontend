import React, { useEffect, useState } from "react";
import { Pen, Plus, Upload } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ImportFile from "./ImportFile";
import useRequest from "../../hooks/useRequest";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

function Employeelist() {
  const [importFile, setImportFile] = useState(false);
  const [rateImport, setRateImport] = useState(false);
  const { data, error, loading } = useRequest("/master/employee/");
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);

  // Define the columns you want to show on the UI
  const columns = [
    {  field: 'Sl',
      headerName: 'Sl',
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id)+1},
    { field: "EmpId", headerName: "EmpId" },
    { field: "Name", headerName: "Name"},
    { field: "Father", headerName: "Father" },
    {
      field: "SiteDetails_name",
      headerName: "Site",
    },
    {
      field: "DepartmentDetails_name",
      headerName: "Department"
    },
    {
      field: "DesignationDetails_name",
      headerName: "Designation"
    },
    {
      field: "GangDetails_name",
      headerName: "Gang"
    },
    { field: "Email", headerName: "Email" },
  ];

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
  const getemplist = async ()=>{
    const empurl = "https://global.swirlapps.in/api/payroll/master/employee/"
    try {
      const response = await axios.get(empurl,
        {
            auth: {
            username: "global",
            password: "Kumar@123"
          },
            withCredentials: false
        }
      );
      console.log("get response",response)
      if(response?.data){
        console.log(response.data)
        const rate = []
        response.data.map((item)=>{
          onlypatchRequest(`/importrate/${item.Aadhar}/`,item.rate)
          setTimeout(()=>{
            console.log("waiting for response")
          },1000)
          rate.push(item.rate)
        })
        console.log(rate)
        setemployeedata(rate)
      }
    } catch (err) {
      console.error(err)
      
    } finally {
      console.log("fetched successed")
    }
  }
  useEffect(() => {
    if (data?.length > 0) {
      // Filter rows to match the required fields
      const filteredRows = data.map((row) => flattenObject(row));

      setRows(filteredRows); // Update the rows state with the filtered data
    }
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
      ) : rows.length ? (
        <div style={{ height: 600, width: '100%' }}>          
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          components={{ Toolbar: GridToolbar }}
          disableSelectionOnClick
          onRowClick={handleRowClicked}
        />
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
}

export default Employeelist;
