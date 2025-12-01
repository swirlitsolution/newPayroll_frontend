import React from "react";
import { jsPDF } from "jspdf";
import useRequest from "../../hooks/useRequest";

const WageSlipPDF = ({ employees,odisha,data }) => {
    const monthname = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
    }
  const generatePDF = () => {
    const doc = new jsPDF("p", "pt", "a4");

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const slipHeight = 380;
    const topMargin = 20;

    let slipCount = 0;
    let yStart = topMargin;
    console.log("pdf",employees);
    employees?.forEach((emp) => {
      if (slipCount === 2) {
        doc.addPage();
        yStart = topMargin;
        slipCount = 0;
      }
      console.log("odisha",odisha);
      if(odisha){
         console.log("odisha format");
        drawOdishaSlip(doc, emp, yStart);
      }
      else{
         console.log("Jharkhand formate");
        drawJharkhandSlip(doc, emp, yStart);
      }
      yStart += slipHeight + 20;
      slipCount++;
    });

    doc.save("Wage_Slips.pdf");
  };

  const drawJharkhandSlip = (doc, emp, y,) => {
    doc.setFont("helvetica", "normal");
    const boxWidth = 555;
    const headerHeight = 50;

    // Outer border
    doc.rect(20, y, boxWidth, 320);

    // HEADER
    doc.setFontSize(12).setFont("helvetica", "bold");
    doc.text("FOR XIX", 30, y + 20);
    doc.text("WAGES SLIP", 250, y + 20);
    doc.text("[See Rule 78(2)(B)]", 230, y + 35);
    doc.text("For the Month", 420, y + 35);
    doc.text(monthname[emp.month] + " - " || "", 510, y + 35);
    doc.text(emp.year || "",540,y + 35)

    // Contractor Row
    doc.rect(20, y + 50, boxWidth, 25);
    doc.setFontSize(11).setFont("helvetica", "bold");
    doc.text("Name & Address of Contractor", 30, y + 67);
    doc.text(data?.name|| "GLOBAL AC SYSTEM", 250, y + 67);

    // Leave Box Section
    doc.setFontSize(10).setFont("helvetica", "normal");

    // Row 1
    doc.rect(20, y + 75, 185, 40);
    doc.rect(205, y + 75, 185, 40);
    doc.rect(390, y + 75, 185, 40);

    doc.text(`EARNED CL ${emp?.leavedetails[0]?.cl}`, 30, y + 95);
    doc.text(`TAKEN CL ${emp?.leavedetails[0]?.cltaken}`, 215, y + 95);
    doc.text(`BAL CL ${emp?.leavedetails[0]?.clbalance}`, 400, y + 95);

    // Row 2
    doc.rect(20, y + 115, 185, 40);
    doc.rect(205, y + 115, 185, 40);
    doc.rect(390, y + 115, 185, 40);

    doc.text(`EARNED FL ${0}`, 30, y + 135);
    doc.text(`TAKEN FL ${0}`, 215, y + 135);
    doc.text(`BAL FL ${0}`, 400, y + 135);

    // Details Section
    let detailY = y + 175;
    doc.setFontSize(10);

    doc.text(`1. Name of work man:-   `, 30, detailY);
    doc.text(`${emp.employeeData_Name}`, 150, detailY);
    detailY += 15;
    doc.text(`2. No. of Units Worked :`, 30, detailY);
    doc.text(`${emp.tpayable}`, 150, detailY);
    detailY += 15;
    doc.text(`3. Rate of Daily Wages :`, 30, detailY);
    doc.text(`Rs. ${emp.basicrate + emp.darate}`, 150, detailY);
    detailY += 15;
    doc.text(`4. Amount of wages :- `, 30, detailY);
    doc.text(`Rs. ${emp.basic + emp.da}`, 150, detailY);
    detailY += 15;
    doc.text(`5. Overtime Wages :- `, 30, detailY);
    doc.text(`Rs. ${0}`, 150, detailY);
    detailY += 15;
    doc.text(`6. Gross wages payable :- Rs. `, 30, detailY);
    doc.text(`${emp.mrpgross}`, 200, detailY);
    detailY += 15;
    doc.text(
      `7. Deduction : `,
      30,
      detailY
    );
    doc.text(`PF - Rs. ${emp.pf}  ESIC - Rs. ${emp.esic}  PRF - Rs. ${emp.prftax}`, 150, detailY);
    detailY += 15;
    doc.text(`8. Net amount paid :-`, 30, detailY);
    doc.text(`Rs. ${emp.mrpnetamt}`, 150, detailY);

    // Signature and Stamp Section
    const stampImg = "https://backend.stcassociates.co.in/static/img/stamp.png";

    // Stamp
    if (stampImg) {
      doc.addImage(stampImg, "PNG", 390, y + 200, 120, 80);
    }
    doc.text("Signature of the contractor", 400, y + 290);
    doc.text("or his representative", 420, y + 305);
  };

  // Draw slip
  const drawOdishaSlip = (doc, emp, y) => {
    doc.rect(20, y, 555, 360);

    doc.setFontSize(12).setFont("helvetica", "bold");
    doc.text("FOR XV", 30, y + 20);
    doc.text("WAGES SLIP", 260, y + 20);
    doc.text("[See Rule 78(2)(B)]", 450, y + 20);

    doc.setFontSize(10).setFont("helvetica", "normal");

    doc.text("Name & Address of Contractor", 30, y + 45);
    doc.text(`${data?.name}`, 30, y + 60);
    doc.text(`${data?.address || ""}`, 30, y + 75);

    doc.text("Name and Address of Establishment in/under which", 300, y + 45);
    doc.text("Contract is Carried On", 300, y + 58);
    doc.text(`${data?.contractEstablishment}`, 300, y + 73);
    doc.text("Name & Address of the Principal Employer", 300, y + 88);
    doc.text(`${data?.principleEmployer}`, 300, y + 103);

    let lineY = y + 135;

    doc.text(`Nature & Location of Work: `, 30, lineY);
    lineY += 15;
    doc.text(`Name of the work man:`, 30, lineY);
    doc.text(`${emp?.employeeData_Name}`,180,lineY)
    doc.text(`UAN No.:`, 300, lineY);
    doc.text(`${emp.employeeData_Uan}`,350,lineY)

    lineY += 15;
    doc.text(`Father Name:`, 30, lineY);
       doc.text(`${emp.employeeData_Father}`,180,lineY)
    doc.text(`ESIC No.:`, 300, lineY);
    doc.text(` ${emp.employeeData_Esic}`,350,lineY)

    lineY += 15;
    doc.text(`Payment Month:`, 30, lineY);
    doc.text(`${emp.month}`,180,lineY)
    doc.text(`A/C No.:`, 300, lineY);
    doc.text(` ${emp.employeeData_Ac}`,182,lineY)

    lineY += 15;
    doc.text(`Workman No.:`, 30, lineY);
    doc.text(`${emp.employeeData_EmpId}`,180,lineY)
    lineY += 35;
    doc.text(`1. No. of Days Worked :`, 30, lineY);
    doc.text(`${emp.tpayable}`,180,lineY)
    lineY += 15;
    doc.text(`2. Rate of Daily Wages :`, 30, lineY);
    doc.text(`${emp.basicrate + emp.darate}`,180,lineY)
    lineY += 15;
    doc.text(`3. Other Pay :`, 30, lineY);
    doc.text(`${0}`,180,lineY)
    lineY += 15;
    doc.text(`4. Overtime :`, 30, lineY);
    doc.text(`Hrs - ${0}  Amt - ${0}`,180,lineY)
    lineY += 15;
    doc.text(`5. Amount of Wages :`, 30, lineY);
    doc.text(`${emp.basic + emp.da}`,180,lineY)
    lineY += 15;
    doc.text(`6. Gross Wages Payable :`, 30, lineY);
    doc.text(`${emp.mrpgross}`,180,lineY)
    lineY += 15;
    doc.text(`7. Deductions :`, 30, lineY);
    doc.text(`PF - ${emp.pf}  ESIC - ${emp.esic}  PRF - ${emp.prftax}`,180,lineY)
    lineY += 15;
    doc.text(`8. Net Amount Paid :`, 30, lineY);
    doc.text(` ${emp.mrpnetamt}`,180,lineY)
    // add stamp image here
    doc.addImage("https://backend.stcassociates.co.in/static/img/stamp.png", "PNG", 380, y + 230, 150, 80);
    doc.text("Signature of the contractor", 400, y + 330);
    doc.text("or his representative", 420, y + 345);
  };


  return (
    <button
      onClick={generatePDF}
       className=" p-1 bg-orange-600 m-2 text-white"
    >
      View Slip
    </button>
  );
};

export default WageSlipPDF;
