import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "../ui/button";
import NewWindowPortal from "./NewWindowPortal";

function Summary(props) {
  const [showPreview, setShowPreview] = useState(false);
  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({ contentRef });

  const getMonthYear = () => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    if (props.month) {
      const [year, month] = props.month.split("-");
      return { month: monthNames[parseInt(month) - 1], year };
    }
    return { month: "", year: "" };
  };

  const { month, year } = getMonthYear();

  // Calculate totals
  const calculateTotals = () => {
    if (!props.employee || props.employee.length === 0) {
      return {
        taamt: "0.00",
        tothergrosstotal: "0.00",
        tmrpgross: "0.00",
        tbalance: "0.00",
      };
    }

    const totals = {
      taamt: 0,
      tothergrosstotal: 0,
      tmrpgross: 0,
      tbalance: 0,
    };

    props.employee.forEach((emp) => {
      totals.taamt += Number(emp.aamt) || 0;
      totals.tothergrosstotal += Number(emp.othergrosstotal) || 0;
      totals.tmrpgross += Number(emp.mrpgross) || 0;
      totals.tbalance += Number(emp.balance) || 0;
      totals.tnetamt += Number(emp.mrpnetamt) || 0;
    });

    return {
      taamt: totals?.taamt?.toFixed(2),
      tothergrosstotal: totals?.tothergrosstotal?.toFixed(2),
      tmrpgross: totals?.tmrpgross?.toFixed(2),
      tbalance: totals?.tbalance?.toFixed(2),
      tesic: totals?.tesic?.toFixed(2),
      tnetamt: totals?.tnetamt?.toFixed(2),
    };
  };

  const totals = calculateTotals();

  return (
    <div>
      {showPreview && (
        <NewWindowPortal closeWindowPortal={() => setShowPreview(false)}>
          <div className="p-5 w-full h-full overflow-auto bg-white">
            {props.company && (
              <div className="w-full flex flex-col">
                <Button
                  onClick={reactToPrintFn}
                  className=" w-10 mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Print
                </Button>
                <div ref={contentRef} className="p-2">
                  {/* Header Section */}
                  <div className="mb-4">
                    <table className="w-full text-xs font-semibold">
                      <tbody className="border border-black">
                        <tr>
                          <td className="p-2 align-top">
                            <div className="font-bold">
                              Name and address of Contractor
                            </div>
                          </td>
                          <td className="p-2 align-top">
                            <div className="text-sm">
                              {props.company?.companydata?.name || ""}
                            </div>
                            <div className="text-xs">
                              {props.company?.companydata?.address || ""}
                            </div>
                          </td>
                          <td className="p-2 text-center align-top">
                            <div className="text-lg font-bold">FORM XVII</div>
                            <div className="text-xs">[See Rule 78(2)(B)]</div>
                            <div className="text-xs font-bold">
                              Register For Wages
                            </div>
                          </td>
                          <td className="p-2 align-top">
                            <div className="font-bold">
                              Name and Address of Establishment
                            </div>
                          </td>
                          <td className="p-2 align-top">
                            <div className="text-sm">
                              {props.company?.contractdata?.name || ""}
                            </div>
                            <div className="text-xs">
                              {props.company?.contractdata?.address || ""}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 align-top">
                            <div className="font-bold">
                              Nature of Work / Work Order No
                            </div>
                          </td>
                          <td className="p-2 align-top">
                            <div className="text-sm">
                              {props.company?.worknaturedata?.name || ""}
                            </div>
                          </td>
                          <td className="p-2 text-center align-top">
                            <div className="font-semibold">
                              Month:{" "}
                              <span className="uppercase">{month || ""} </span>{" "}
                              &emsp; &emsp; &emsp; Year:{" "}
                              <span>{year || ""}</span>
                            </div>
                          </td>
                          <td className="p-2 align-top">
                            <div className="font-bold">
                              Name and address of Principle Employer
                            </div>
                          </td>
                          <td className="p-2 align-top">
                            <div className="text-sm">
                              {props.company?.principledata?.name || ""}
                            </div>
                            <div className="text-xs">
                              {props.company?.principledata?.address || ""}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Main Data Table */}
                  <table className="w-full border-collapse border border-gray-400 text-[10px]">
                    <thead>
                      <tr className="bg-gray-200 text-center">
                        <th className="border border-gray-400 p-1 text-wrap w-10">
                          Sl. No.
                        </th>
                        <th className="border border-gray-400 p-1 w-10">
                          EmpId
                        </th>
                        <th className="border border-gray-400 p-1 text-wrap w-40">
                          Employee
                        </th>
                       
                        <th className="border border-gray-400 p-1 text-wrap w-10">
                          Day
                        </th>
                        <th className="border border-gray-400 w-10 p-1">
                          ARate
                        </th>
                        <th className="border border-gray-400 p-1  text-wrap w-10">
                          Actual Amt
                        </th>
                        
                        <th className="border border-gray-400 p-1  text-wrap w-10">
                          Ot hrs
                        </th>
                        <th className="border border-gray-400 p-1 text-wrap w-10">
                          Ot amt
                        </th>
                        <th className="border border-gray-400 p-1 text-wrap w-10">
                          Allow
                        </th>
                     
                        <th className="border border-gray-400 p-1 text-wrap w-10">
                          Total
                        </th>
                      </tr>
                      <tr className="bg-gray-200 text-center"></tr>
                    </thead>
                    <tbody>
                      {props.employee && props.employee.length > 0 ? (
                        props.employee.map((emp, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="border border-gray-400 p-1 text-center">
                              {index + 1}
                            </td>
                            <td className="border border-gray-400 p-1 text-center">
                              {emp.employeeData_id || emp.EmpId || ""}
                            </td>
                            <td className="border border-gray-400 p-1 font-semibold ">
                              {emp.employeeData_Name || emp.Name || ""}
                            </td>
                       
                            <td className="border border-gray-400 p-1 text-center">
                            
                              <div className=" text-[9px] font-bold">
                                {emp.tpayable || "0.00"}
                              </div>
                            </td>
                            <td className="border border-gray-400 p-1">
                              <div className="text-right">
                                {emp.arate || "0.00"}
                              </div>
                             
                            </td>
                            <td className="border border-gray-400 p-1 text-right">
                              {emp.aamt || "0.00"}
                            </td>
                            <td className="border border-gray-400 p-1 text-right">
                              {emp.restothr || "0.00"}
                            </td>
                            <td className="border border-gray-400 p-1 text-right">
                              {emp.restotamt || "0.00"}
                            </td>

                            <td className="border border-gray-400 p-1 text-right">
                              {emp.allownetamt || "0.00"}
                            </td>
                            <td className="border border-gray-400 p-1 text-right">
                              {emp.othergrosstotal || "0.00"}
                            </td>

                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="19"
                            className="border border-gray-400 p-2 text-center"
                          >
                            No employees selected
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  {/* Totals Section */}
                  <div className="my-3">
                    <table className="w-full text-xs font-semibold">
                      <tbody className="border border-gray-300">
                        <tr>
                          <td className="p-2">
                            Actual Amt:{" "}
                            <span className="font-bold">{totals.taamt}</span>
                          </td>
                          <td className="p-2">
                            Act + Allow: <span className="font-bold">{totals.tothergrosstotal}</span>
                          </td>
                          <td className="p-2">
                            MRP:{" "}
                            <span className="font-bold">
                              {totals.tmrpgross}
                            </span>
                          </td>
                          <td className="p-2">
                            Balance:{" "}
                            <span className="font-bold">{totals.tbalance}</span>
                          </td>
                          
                        </tr>
                       
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </NewWindowPortal>
      )}
      <Button
        onClick={() => {
          setShowPreview(true);
        }}
        className="bg-black text-white hover:bg-slate-200 hover:text-black"
        disabled={props?.wait}
      >
        {props?.wait ? "wait ..." : "Summary"}
      </Button>
    </div>
  );
}

export default Summary;
