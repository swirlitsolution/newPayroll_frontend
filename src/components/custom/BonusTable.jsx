import React from 'react';
import { bonusRegistercolumns } from "../report/BonusRegister"; // Assuming the column definition is imported here

const BonusTable = ({ row = [], heading, pdfOrientation }) => {
  console.log("row", row);  // For debugging purposes


  return (
    <div id="bonus-table" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h6 style={{ textAlign: 'center' }}><b>FORM C</b></h6>
      <p style={{ textAlign: 'center', fontSize: "13px" }}><b>See Rule 4(c)</b></p>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", textAlign: "center" }}>
        <h3 style={{ textAlign: 'center', fontFamily: "serif", margin: "0" }}>
          BONUS PAID TO EMPLOYEES FOR THE ACCOUNTING YEAR ENDING ON THE
        </h3>
        <p style={{ margin: "0" }}>December/2024</p>
      </div>

      <div>
        <p style={{ textAlign: "left", display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: "13px", marginRight: "20px" }}>Name of the Establishment:</span>
          <span style={{ marginLeft: "20px" }}>ADITYAPUR COMPLEX CLUB</span>
        </p>
        <p style={{ textAlign: "left", display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: "20px" }}>No. of Working days in the year:</span>
          <span style={{ marginLeft: "20px" }}><b>0</b></span>
        </p>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            {bonusRegistercolumns.map((col, index) => (
              <th key={index} className="font-normal text-[9px] text-center px-2 py-1 border border-gray-400 align-bottom">
                {col.headerName}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {row.map((data, index) => (
            <tr key={index}>
              {bonusRegistercolumns.map((col, colIndex) => (
                <td key={colIndex} style={styles.td}>
                  {col.renderCell ? col.renderCell({ ...data }) : data[col.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  td: {
    border: '1px solid #000',
    padding: '8px',
    textAlign: 'center',
  },
};

export default BonusTable;
