import React from 'react'
import { Button } from '../ui/button'
import jsPDF from 'jspdf';

function WorkManRegister(props) {
    const generateWorkManRegister = () => {
          
     
            const doc = new jsPDF('landscape', 'pt', 'a4');
            // set Margin of page
          
            // Contractor Info
            doc.setFont('times', 'normal');
            doc.setFontSize(11);
            doc.text("FORM IX",doc.internal.pageSize.getWidth() / 2,10,{ align: 'center' });
            doc.text("(see rule 74)",doc.internal.pageSize.getWidth() / 2,20,{ align: 'center' });
            doc.text('Name and Address', 20, 45);
            doc.text('Of Contractor:', 20, 55);
        
            doc.setFont('times', 'bold');
            doc.text(`${props.company?.name}`, 120, 45);
            doc.setFont('times', 'normal');
            doc.text(`${props.company?.address}`, 120, 55);
            // doc.text('Azadnagar Mango Jsr-832110', 120, 70);
        
            // Title Centered
            doc.setFont('times', 'bold');
            doc.setFontSize(14);
            doc.text('Register of workmen employed by Contractor', doc.internal.pageSize.getWidth() / 2, 30, { align: 'center' });
        
            // Table Headers
            const tableColumn = [
              "Sl. No.",
              "Name & Surname of Workman",
              "Age and Sex",
              "Father's Name",
              "Nature of Employement / Designation",
              "Permanent Address of Workman \n (Village and Tahsil/Taluka and District)",
              "Local Address",
              "Date of Commencement of Work",
              "Signature \n or \n Thumb Impression ",
              "Date of Termination ",
              "Reason for Termination",
              "Remarks"
            ];
        
            // Table Rows
            const tableRows = [];
        
            props.employee.forEach((emp, index) => {
              const row = [
                index + 1,
                emp?.Name,
                emp.Gender || '.',
                emp.Father || '.',
                emp?.DesignationDetails?.name || '.',
                emp?.Address || '.',
                emp?.Address || '.',
                `${emp?.Doj?.split("-").reverse().join("/")}` || '.',
                '.',
               '.',
                '.',
                 '.',
              ];
              tableRows.push(row);
            });
        
            // Draw Table
            doc.autoTable({
              head: [tableColumn],
              body: tableRows,
              startY: 80,
              theme: 'grid',
              styles: {
                font: "times",
                fontSize: 10,
                halign: "left",
                valign: "middle",
                overflow: "linebreak",
                cellPadding: 3,
              },
              headStyles: {
                fillColor: [255, 255, 255],
                textColor: [0, 0, 0],
                lineWidth: 0.1,
                lineColor:[200,200,200],
                fontStyle: "bold",
              },
              
            });
        
            doc.save('register_of_adult_workers.pdf');
          };
  return (
    <div><Button type="submit" onClick={generateWorkManRegister} className='w-full bg-gray-200 outline-4 text-black hover:bg-black hover:text-white' disabled={props?.wait}>{props?.wait?"wait ...":"WorkMan Register"}</Button></div>
  )
}

export default WorkManRegister