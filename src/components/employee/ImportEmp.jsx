import React, { useState } from 'react'
import ImportFile from './ImportFile';

function ImportEmp() {
    const [importFile, setImportFile] = useState(false);
  return (
    <div className="flex flex-col gap-2 p-1">
          <div className="mt-4 mr-2">
            <span className="flex gap-2 float-right">
              <div
                className="flex gap-2 bg-gray-50 rounded-lg shadow p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  setImportFile(true);
                  setRateImport(false);
                }}
              >
                <Upload /> Import
              </div>
            </span>
          </div>
    
          {importFile && (
            <ImportFile
              heading="import employee"
              closeModel={() => {
                setImportFile(!importFile);
              }}
              newItem={true}
              api="/master/employee/"
              filename="sample_employee_master.xlsx"
            />
          )}
    </div>  
    
  )
}

export default ImportEmp