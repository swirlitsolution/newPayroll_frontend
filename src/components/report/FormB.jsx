import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print';

const monthdata = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December",
}

// Helper function to group employees by skill level
const groupBySkill = (employees) => {
  const skills = {
    'UN-SKILLED': [],
    'SKILLED': [],
    'SEMI-SKILLED': [],
    'HIGH-SKILLED': []
  };

  employees?.forEach(emp => {
    const skillLevel = emp.Skill?.toUpperCase() || 'UN-SKILLED';
    if (skills[skillLevel]) {
      skills[skillLevel].push(emp);
    } else {
      skills['UN-SKILLED'].push(emp);
    }
  });

  return skills;
};

// Helper function to format numbers to 2 decimal places
const formatNumber = (value) => {
  if (value === null || value === undefined) return '0.00';
  return (parseFloat(value) || 0).toFixed(2);
};

function FormB(props) {
  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({ contentRef });

  const groupedEmployees = groupBySkill(props.employee);
  
  // Get first employee of each skill to extract wage rates
  const getWageRate = (skillLevel) => {
    const employee = groupedEmployees[skillLevel]?.[0];
    return {
      basicrate: formatNumber(employee?.basicrate || 0),
      darate: formatNumber(employee?.darate || 0)
    };
  };

  const highSkilledRate = getWageRate('HIGH-SKILLED');
  const skilledRate = getWageRate('SKILLED');
  const semiSkilledRate = getWageRate('SEMI-SKILLED');
  const unSkilledRate = getWageRate('UN-SKILLED');

  // Extract month and year
  const monthParts = props.month?.split("-") || [];
  const year = monthParts[0];
  const monthNum = monthParts[1];
  const monthName = monthdata[monthNum] || 'N/A';

  // Extract wages from and to dates
  const wagesFrom = props.company?.WagesFrom || 'N/A';
  const wagesTo = props.company?.WagesTo || 'N/A';

  // Calculate totals
  const calculateTotals = () => {
    if (!props.employee || props.employee.length === 0) {
      return {
        totalDaysWorked: 0,
        totalBasic: 0,
        totalDA: 0,
        totalOT: 0,
        totalAllowance: 0,
        totalGross: 0,
        totalPF: 0,
        totalESI: 0,
        totalIncomeTax: 0,
        totalDeduction: 0,
        totalNetPay: 0
      };
    }

    return {
      totalDaysWorked: formatNumber(
        props.employee.reduce((sum, emp) => sum + (parseFloat(emp.tpayable) || 0), 0)
      ),
      totalBasic: formatNumber(
        props.employee.reduce((sum, emp) => sum + (parseFloat(emp.basic) || 0), 0)
      ),
      totalDA: formatNumber(
        props.employee.reduce((sum, emp) => sum + (parseFloat(emp.da) || 0), 0)
      ),
      totalOT: formatNumber(
        props.employee.reduce((sum, emp) => sum + (parseFloat(emp.mrpotamt) || 0), 0)
      ),
      totalAllowance: formatNumber(
        props.employee.reduce((sum, emp) => sum + (parseFloat(emp.mrpallownetamt) || 0), 0)
      ),
      totalGross: formatNumber(
        props.employee.reduce((sum, emp) => sum + (parseFloat(emp.mrpgross) || 0), 0)
      ),
      totalPF: formatNumber(
        props.employee.reduce((sum, emp) => sum + (parseFloat(emp.pf) || 0), 0)
      ),
      totalESI: formatNumber(
        props.employee.reduce((sum, emp) => sum + (parseFloat(emp.esic) || 0), 0)
      ),
      totalIncomeTax: formatNumber(
        props.employee.reduce((sum, emp) => sum + (parseFloat(emp.prftax) || 0), 0)
      ),
      totalDeduction: formatNumber(
        props.employee.reduce((sum, emp) => sum + (parseFloat(emp.pf) || 0) + (parseFloat(emp.esic) || 0) + (parseFloat(emp.prftax) || 0) + (parseFloat(emp.deduction) || 0), 0)
      ),
      totalNetPay: formatNumber(
        props.employee.reduce((sum, emp) => sum + (parseFloat(emp.mrpnetamt) || 0), 0)
      )
    };
  };

  const totals = calculateTotals();

  return (
    <div>
      {props.company && (
        <div className='w-full flex flex-col bg-white'>
          <button className='mr-5 bg-black p-2 self-end w-24 text-white mb-4' onClick={reactToPrintFn}>
            Print
          </button>

          <div ref={contentRef} className='p-8 bg-white'>
            {/* WAGE RATES TABLE */}
            <div className='mb-6'>
              <p className='text-center font-bold text-sm mb-3'>Rate of Minimum Wages and Gross Sls Data</p>
              <table className='w-1/2 mx-auto border-collapse border border-black'>
                <thead>
                  <tr className='bg-gray-100'>
                    <th className='border border-black p-2 text-center font-semibold text-xs'>Highly Skilled</th>
                    <th className='border border-black p-2 text-center font-semibold text-xs'>Skilled</th>
                    <th className='border border-black p-2 text-center font-semibold text-xs'>Semi-Skilled</th>
                    <th className='border border-black p-2 text-center font-semibold text-xs'>Un-Skilled</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='border border-black p-2 text-center text-xs font-semibold'>Minimum Basic</td>
                    <td className='border border-black p-2 text-center text-xs'>{highSkilledRate.basicrate}</td>
                    <td className='border border-black p-2 text-center text-xs'>{skilledRate.basicrate}</td>
                    <td className='border border-black p-2 text-center text-xs'>{semiSkilledRate.basicrate}</td>
                    <td className='border border-black p-2 text-center text-xs'>{unSkilledRate.basicrate}</td>
                  </tr>
                  <tr>
                    <td className='border border-black p-2 text-center text-xs font-semibold'>DA</td>
                    <td className='border border-black p-2 text-center text-xs'>{highSkilledRate.darate}</td>
                    <td className='border border-black p-2 text-center text-xs'>{skilledRate.darate}</td>
                    <td className='border border-black p-2 text-center text-xs'>{semiSkilledRate.darate}</td>
                    <td className='border border-black p-2 text-center text-xs'>{unSkilledRate.darate}</td>
                  </tr>
                  <tr>
                    <td className='border border-black p-2 text-center text-xs font-semibold'>Over Time</td>
                    <td className='border border-black p-2 text-center text-xs'>0.00</td>
                    <td className='border border-black p-2 text-center text-xs'>0.00</td>
                    <td className='border border-black p-2 text-center text-xs'>0.00</td>
                    <td className='border border-black p-2 text-center text-xs'>0.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* ESTABLISHMENT DETAILS SECTION */}
            <div className='mb-6 grid grid-cols-2 gap-8'>
              <div className='text-xs'>
                <p className='mb-2'><span className='font-semibold'>Wages From:</span> {wagesFrom}</p>
                <p className='mb-2'><span className='font-semibold'>Wages To:</span> {wagesTo}</p>
                <p><span className='font-semibold'>Name of Establishment:</span> {props.company?.establishmentName || 'N/A'}</p>
              </div>
              <div className='text-xs text-right'>
                <p className='mb-2'><span className='font-semibold'>Name of Owner:</span> {props.company?.ownerName || 'N/A'}</p>
                <p className='mb-2 font-bold'>GLOBAL AC SYSTEM FOR PVT LT</p>
                <p><span className='font-semibold'>LIN:</span> {props.company?.LIN || 'N/A'}</p>
                <p className='mt-4 text-xs'>Month & Year: {monthName} {year}</p>
              </div>
            </div>

            {/* MAIN PAYROLL TABLE */}
            <div className='overflow-x-auto mb-6'>
              <table className='w-full border-collapse border border-black text-xs'>
                <thead>
                  <tr className='bg-gray-100'>
                    <th className='border border-black p-1 text-center font-semibold'>Sl.No.</th>
                    <th className='border border-black p-1 text-center font-semibold min-w-32'>Name of Workman / Father / Husband's Name</th>
                    <th className='border border-black p-1 text-center font-semibold'>Rate Of Wages Per Day</th>
                    <th className='border border-black p-1 text-center font-semibold'>No. of Days Worked</th>
                    <th className='border border-black p-1 text-center font-semibold'>No. of OT Days / Hours</th>
                    <th className='border border-black p-1 text-center font-semibold'>Basics</th>
                    <th className='border border-black p-1 text-center font-semibold'>Skill Level</th>
                    <th className='border border-black p-1 text-center font-semibold'>D.A.</th>
                    <th className='border border-black p-1 text-center font-semibold'>OT Amount</th>
                    <th className='border border-black p-1 text-center font-semibold'>Other Allowances</th>
                    <th className='border border-black p-1 text-center font-semibold'>Total Wages (Gross)</th>
                    <th className='border border-black p-1 text-center font-semibold'>PF</th>
                    <th className='border border-black p-1 text-center font-semibold'>ESI</th>
                    <th className='border border-black p-1 text-center font-semibold'>Income Tax</th>
                    <th className='border border-black p-1 text-center font-semibold'>Gross Tax</th>
                    <th className='border border-black p-1 text-center font-semibold'>Insurance</th>
                    <th className='border border-black p-1 text-center font-semibold'>Other Deductions</th>
                    <th className='border border-black p-1 text-center font-semibold'>Total Deductions</th>
                    <th className='border border-black p-1 text-center font-semibold'>Net Pay</th>
                    <th className='border border-black p-1 text-center font-semibold'>Employee Bank Details</th>
                    <th className='border border-black p-1 text-center font-semibold'>Employee AC/No.</th>
                    <th className='border border-black p-1 text-center font-semibold'>Date</th>
                    <th className='border border-black p-1 text-center font-semibold'>Remarks</th>
                    <th className='border border-black p-1 text-center font-semibold'></th>
                    <th className='border border-black p-1 text-center font-semibold'></th>
                  </tr>
                </thead>
                <tbody>
                  {props.employee && props.employee.length > 0 ? (
                    props.employee.map((emp, index) => {
                      const ratePerDay = formatNumber(parseFloat(emp.basicrate || 0) + parseFloat(emp.darate || 0));
                      const totalDed = parseFloat(emp.pf || 0) + parseFloat(emp.esic || 0) + parseFloat(emp.prftax || 0) + parseFloat(emp.deduction || 0);

                      return (
                        <tr key={index}>
                          <td className='border border-black p-1 text-center'>{index + 1}</td>
                          <td className='border border-black p-1 text-left'>{emp.Name || 'N/A'}</td>
                          <td className='border border-black p-1 text-center'>{ratePerDay}</td>
                          <td className='border border-black p-1 text-center'>{formatNumber(emp.tpayable)}</td>
                          <td className='border border-black p-1 text-center'>{formatNumber(emp.tiscoothr)}</td>
                          <td className='border border-black p-1 text-center'>{formatNumber(emp.basic)}</td>
                          <td className='border border-black p-1 text-center'>{emp.Skill || 'N/A'}</td>
                          <td className='border border-black p-1 text-center'>{formatNumber(emp.da)}</td>
                          <td className='border border-black p-1 text-center'>{formatNumber(emp.mrpotamt)}</td>
                          <td className='border border-black p-1 text-center'>{formatNumber(emp.mrpallownetamt)}</td>
                          <td className='border border-black p-1 text-center'>{formatNumber(emp.mrpgross)}</td>
                          <td className='border border-black p-1 text-center'>{formatNumber(emp.pf)}</td>
                          <td className='border border-black p-1 text-center'>{formatNumber(emp.esic)}</td>
                          <td className='border border-black p-1 text-center'>{formatNumber(emp.prftax)}</td>
                          <td className='border border-black p-1 text-center'>0.00</td>
                          <td className='border border-black p-1 text-center'>0.00</td>
                          <td className='border border-black p-1 text-center'>{formatNumber(emp.deduction)}</td>
                          <td className='border border-black p-1 text-center'>{formatNumber(totalDed)}</td>
                          <td className='border border-black p-1 text-center'>{formatNumber(emp.mrpnetamt)}</td>
                          <td className='border border-black p-1 text-center text-xs'>{emp.Bank || 'N/A'}</td>
                          <td className='border border-black p-1 text-center text-xs'>{emp.Ac || 'N/A'}</td>
                          <td className='border border-black p-1 text-center'></td>
                          <td className='border border-black p-1 text-center'></td>
                          <td className='border border-black p-1 text-center'></td>
                          <td className='border border-black p-1 text-center'></td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan='25' className='border border-black p-2 text-center'>
                        No employees selected
                      </td>
                    </tr>
                  )}
                  
                  {/* TOTALS ROW */}
                  <tr className='bg-gray-100 font-semibold'>
                    <td colSpan='3' className='border border-black p-1 text-center'>TOTAL</td>
                    <td className='border border-black p-1 text-center'>{totals.totalDaysWorked}</td>
                    <td className='border border-black p-1 text-center'>-</td>
                    <td className='border border-black p-1 text-center'>{totals.totalBasic}</td>
                    <td className='border border-black p-1 text-center'>-</td>
                    <td className='border border-black p-1 text-center'>{totals.totalDA}</td>
                    <td className='border border-black p-1 text-center'>{totals.totalOT}</td>
                    <td className='border border-black p-1 text-center'>{totals.totalAllowance}</td>
                    <td className='border border-black p-1 text-center'>{totals.totalGross}</td>
                    <td className='border border-black p-1 text-center'>{totals.totalPF}</td>
                    <td className='border border-black p-1 text-center'>{totals.totalESI}</td>
                    <td className='border border-black p-1 text-center'>{totals.totalIncomeTax}</td>
                    <td className='border border-black p-1 text-center'>0.00</td>
                    <td className='border border-black p-1 text-center'>0.00</td>
                    <td className='border border-black p-1 text-center'>-</td>
                    <td className='border border-black p-1 text-center'>{totals.totalDeduction}</td>
                    <td className='border border-black p-1 text-center'>{totals.totalNetPay}</td>
                    <td colSpan='7' className='border border-black p-1'></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* STAMP & SEAL SECTION */}
            <div className='flex justify-between items-end mt-12'>
              <div></div>
              <div className='flex flex-col items-center gap-2'>
                <div className='w-32 h-24 border border-gray-400 rounded-md flex items-center justify-center bg-gray-50'>
                  <img 
                    src="https://backend.stcassociates.co.in/static/img/stamp.png" 
                    alt="Stamp"
                    className='w-28 h-20 object-contain'
                  />
                </div>
                <p className='text-xs text-center font-semibold'>Stamp & Seal of the Contractor</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormB;