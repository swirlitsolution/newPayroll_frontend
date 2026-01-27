import React from 'react'
import { Button } from '../ui/button'
import jsPDF from 'jspdf';

function EmployeeMentCard(props) {
    const generateEmployeementCardPDF = () => {
            const doc = new jsPDF('landscape', 'pt', 'A4');
        
            
              const pageWidth = doc.internal.pageSize.getWidth();
              const pageHeight = doc.internal.pageSize.getHeight();
          
              const cardHeight = pageHeight / 2 - 20; // Adjust 20px margin
              const cardWidth = pageWidth - 40; // 20px margin on each side
           
    
            props.employee?.forEach((employee, index) => {
                if (index !== 0 && index % 2 === 0) {
                  doc.addPage();
                }
          
                const positionY = 20 + (index % 2) * (cardHeight + 10); // 10px gap between cards
          
                // 🖍️ Draw Border for each card
                doc.setLineWidth(1.2);
                doc.rect(20, positionY, cardWidth, cardHeight);
          
                // Header Section
                doc.setFontSize(10);
                doc.setFont('times', 'normal');
                doc.text('FOR XIV', 30, positionY + 20);
                doc.text('RULE 76', 200, positionY + 20);
          
                doc.setFont('times', 'bold');
                doc.text('EMPLOYMENT CARD', 650, positionY + 20, { align: 'left' });
          
                // Contractor Details
                doc.setFont('times', 'normal');
                doc.text('Name & Address of Contractor:', 30, positionY + 40);
                doc.setFont('times', 'bold');
                doc.text(`${props.company?.name}`, 30, positionY + 60);
                doc.setFont('times', 'normal');
                doc.text(`${props.company?.address}`, 30, positionY + 80);
                // doc.text('Azadnagar Mango Jsr-832110', 30, positionY + 100);
          
                // Employer Details
                doc.setFont('times', 'normal');
                doc.text('Name & Address of the Establishment ', 650, positionY + 40, { align: 'left' });
                doc.text('Under which contract is carried on:', 650, positionY + 50, { align: 'left' });
                doc.setFont('times', 'bold');
                doc.text(`${props.company?.contractEstablishment}`, 650, positionY + 60, { align: 'left' });
                doc.setFont('times', 'normal');
                doc.text('Name & Address of Principal Employer', 650, positionY + 80, { align: 'left' });
                doc.setFont('times', 'bold');
                doc.text(`${props.company?.principleEmployer}`, 650, positionY + 100, { align: 'left' });
          
                // Middle Line Separator
                doc.setLineWidth(0.5);
                doc.line(30, positionY + 120, 790, positionY + 120);
          
                // Body Section
                doc.setFont('times', 'normal');
                const bodyStartY = positionY + 150;
                const lines = [
                  "1. Name of the Work Man",
                  "2. Sl. No. of Register of Work Man Employed",
                  "3. Nature of Employment / Designation",
                  "4. Wages Rate (With Particular of Unit in case of Piece Work)",
                  "5. Wages Period",
                  "6. Tenure Employment",
                  "7. Remarks"
                ];
          
                const values = [
                  employee.Name,
                  employee.EmpId,
                  employee?.Skill,
                  employee?.rate?.arate || "",
                  "monthly",
                  "",
                  ""
                ];
          
                lines.forEach((line, idx) => {
                  doc.setFont('times', 'normal');
                  doc.text(line, 40, bodyStartY + (idx * 15));
                });
          
                values.forEach((val, idx) => {
                  doc.setFont('times', 'bold');
               
                  doc.text(String(val) || '', 500, bodyStartY + (idx * 15));
                });
              });
          
              doc.save('employment_cards.pdf');
          };
  return (
    <div><Button type="submit" onClick={generateEmployeementCardPDF} className='w-full bg-gray-200 outline-4 text-black hover:bg-black hover:text-white' disabled={props?.wait}>{props?.wait?"wait ...":"Employeement Card"}</Button></div>
  )
}

export default EmployeeMentCard