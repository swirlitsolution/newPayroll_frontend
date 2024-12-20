import React, { useState } from 'react'
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import FontFaceObserver from "fontfaceobserver";
import { toast } from 'react-toastify';
const columns = [
    {field:'id',headerName:'TrnId',width:'80px'},
    {field:'EmpId',headerName:'EmpId',width:'80px'},
    {field:'Name',headerName:'Name'},
    {field:'Department',headerName:'Department'},
    {field:'Designation',headerName:'Designation'},
   ] 

function useImportExport(orientation) {
    const [isExporting, setIsExporting] = useState(false);


    const exportToExcel = (columns, rows ) => {
        console.log("exporting to excel",columns,rows)
        setIsExporting(true);
        const headers = columns.map(col => col.headerName);
        const data = rows.map(row => 
          columns.map(col => {
            if (col.renderCell) {
              return col.renderCell(row);
            }
            return row[col.field];
          })
        );
    
        const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, 'export.xlsx');
        setIsExporting(false);
      };
    
      const exportToPDF = (columns, rows, isBonusPayRegister = false) => {
        console.log("exporting to pdf", columns, rows);
        setIsExporting(true);
        
        const doc = new jsPDF({
          orientation: orientation,
          unit: 'mm',
          format: 'a4',
          putOnlyUsedFonts: true,
        });
      console.log("bonus register",isBonusPayRegister)
        if (isBonusPayRegister) {
          // Custom Bonus Pay Register formatting
          const pageFormat = { orientation: 'landscape', unit: 'mm', format: [279.4, 215.9] };
          doc.setFontSize(12);
          doc.text("Bonus Pay Register", 14, 15);
      
          let y = 25;
          rows.forEach((row, index) => {
            doc.setFontSize(10);
            doc.text(`Bonus for Employee ${index + 1}`, 14, y);
            y += 10;
      
            columns.forEach((col) => {
              const value = col.renderCell ? col.renderCell(row) : row[col.field];
              doc.text(`${col.headerName}: ${value}`, 14, y);
              y += 7;
            });
      
            y += 5; // Add space between employees
            if (y > 270) {
              doc.addPage();
              y = 25;
            }
          });
        } else {
          // Default table format
          const headers = columns.map((col) => col.headerName);
          const data = rows.map((row) =>
            columns.map((col) => {
              if (col.renderCell) {
                return col.renderCell(row);
              }
              return row[col.field];
            })
          );
      
          doc.autoTable({
            head: [headers],
            body: data,
            theme: "grid",
          });
        }
      
        doc.save("export.pdf");
        setIsExporting(false);
      };
      
      const LeavePaySlip = (data)=>{
        if (data) {
      
          const pageformate = {
            orientation: 'p', // landscape
            unit: 'mm',
            format: [279.4, 215.9]
        };
      
        // var fontLoader = new FontFaceObserver('PT Serif', {
        //     timeout: 10000 // increase timeout to 10 seconds
        // });
        // fontLoader.load().then(function () {
                    
          var doc = new jsPDF(pageformate);
          // doc.addFont('PTSerif-Regular.ttf', 'PT Serif', 'normal');
          // doc.setFont('PT Serif', 'regular');
          var xMargin = 10;
          var yMargin = 10;
          let currentY = yMargin;
          data.map((curElem)=>{

         
            // Add the code to create the payslip using payslipData
                  
  
            doc.rect(xMargin, currentY, doc.internal.pageSize.width - 20,110, 'S');
                  
            doc.setFontSize(12);
            currentY+=5
            doc.text("XXXXX COMPANY PVT", 80, currentY);
            currentY += 5;
            doc.setFontSize(10);
            doc.text("103, Purilia Highway", 90, currentY);
            currentY += 5;
            doc.text("Sakchi, Jamshedpur", 91, currentY);
            currentY += 8;
            doc.line(xMargin, currentY, doc.internal.pageSize.width - xMargin, currentY); // horizontal line
            currentY += 5;
            doc.setFontSize(9);
            doc.setFont('PT Serif', 'bold');
            doc.text(`LEAVE PAYSLIP`, xMargin+5, currentY);
            currentY += 5;
            doc.line(xMargin, currentY, doc.internal.pageSize.width - xMargin, currentY); // horizontal line
            currentY += 5;
            doc.setFont('PT Serif', 'normal');
            doc.text(`EMP NO.: ${curElem.employee.EmpId}                     NAME: ${curElem.employee.Name}`, xMargin+5, currentY);
            currentY += 5;
            doc.line(xMargin, currentY, doc.internal.pageSize.width - xMargin, currentY); // horizontal line
            currentY += 5;
            doc.setLineWidth(0);
          
            doc.setFont('PT Serif', 'normal');
            doc.text('1. No of days worked', xMargin+5, currentY);
            doc.text('2. No. of Units Worked in Case of Piece Rate of Work', xMargin+5, currentY + 5);
            doc.text('3. Rate of Daily Wages @ Piece Rate', xMargin+5, currentY + 10);
            doc.text('4. Amount of Wages', xMargin+5, currentY + 15);
            doc.text('5. Amount of Overtime Wages', xMargin+5, currentY + 20);
            doc.text('6. Gross Wages Payable', xMargin+5, currentY + 25);
            doc.text('7. Deduction if Any Advance', xMargin+5, currentY + 30);
            doc.text('8. Net Amount of Wages Paid', xMargin+5, currentY + 35);
            
            doc.text(`${curElem.leave}`, 170, currentY);
            doc.text('', 170, currentY + 5);
            doc.text(`${curElem.rate.basic} + ${curElem.rate.da}  =  ${curElem.rate.basic + curElem.rate.da}`, 170, currentY + 10);
            doc.text(`${curElem.rate.basic * curElem.leave}  +  ${curElem.rate.da * curElem.leave}`, 170, currentY + 15);
            doc.text('', 170, currentY + 20);
            doc.text(`${curElem.rate.basic * curElem.leave + curElem.rate.basic * curElem.leave}`, 170, currentY + 25);
            doc.text('', 170, currentY + 30);
            doc.text(`${curElem.rate.basic * curElem.leave + curElem.rate.da * curElem.leave}`, 170, currentY + 35);
            
            doc.rect(xMargin, currentY + 40, doc.internal.pageSize.width - xMargin * 2, 10, 'S');
            doc.text('Initial of Contractor or his Representative', xMargin + 5, currentY + 45);
            
            console.log(currentY)
            if(currentY==181){
                currentY=10;
                doc.addPage();
            }
            else{
    
                currentY = currentY+75;
            }
        
        
          });// closing map
          // var filename = 'payslip.pdf';
          // doc.save(filename);
          doc.setProperties({
              title: "PaySlip"
          });
          doc.output('dataurlnewwindow');
        // })
        }
      else {
      toast.warning('You are missing some data to fill.');
    }
  }
   
    
    
  return { exportToExcel, exportToPDF, isExporting,LeavePaySlip }
}

export default useImportExport