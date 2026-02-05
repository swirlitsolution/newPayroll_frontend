import React from 'react'
import { Button } from '../ui/button'
import jsPDF from 'jspdf';

function ServiceCertificate(props) {
    const generateServiceCertificate = () => {
          
            const doc = new jsPDF('portrait', 'pt', 'a4');
            
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
        
            const cardHeight = pageHeight / 2 - 20; // Adjust 20px margin
            const cardWidth = pageWidth - 40; // 20px margin on each side
        
            if(props.employee && Array.isArray(props.employee)){
            props.employee.forEach((emp, index) => {
              if (index !== 0 && index % 2 === 0) {
                doc.addPage();
              }
              const positionY = 20 + (index % 2) * (cardHeight + 10); // 10px gap between cards
          
              // 🖍️ Draw Border for each card
              doc.setLineWidth(1.2);
              doc.rect(20, positionY, cardWidth, cardHeight);
              doc.setFont('times', 'normal');
              doc.setFontSize(10);
        
              // Top Header Center
              doc.setFont('times', 'bold');
              doc.setFontSize(12);
              doc.text('FORM XV', doc.internal.pageSize.getWidth() / 2,positionY + 40, { align: 'center' });
              doc.setFont('times', 'normal');
              doc.setFontSize(10);
              doc.text('(See Rule 77)', doc.internal.pageSize.getWidth() / 2, positionY + 55, { align: 'center' });
              doc.setFont('times', 'bold');
              doc.text('Service Certificate', doc.internal.pageSize.getWidth() / 2, positionY + 70, { align: 'center' });
          
           
            // Contractor and Employee Details
            const details = [
              ['Name and Address of Contractor', `${props.company?.name}\n ${props.company?.address}`],
              ['Name and Address of Establishment in/under which contract is carried on', `${props.company?.contractEstablishment}`],
              ['Nature and Location of Work', emp?.SiteDetails?.name || ''],
              ['Name and address of Principal Employer', 'VOLTAS LIMITED'],
              ['Name and Address of the Workman', emp.Name],
              ['Age or Date of Birth', emp?.Dob.split("-").reverse().join("/") || '.'],
              ['Identification Marks', '.'],
              ['Father\'s / Husband\'s Name', emp.Father || '.'],
            ];
        
            let startY = positionY + 100;
        
            details.forEach(([label, value]) => {
              doc.setFont('times', 'normal');
              doc.text(label, 30, startY);
              doc.setFont('times', 'bold');
              doc.text(value, 350, startY);
              startY += (value.includes('\n') ? 30 : 20);
            });
        
            // Table Data
            const tableColumn = [
              "SL. No.",
              "Total Period for Which employed\nFrom    |    To",
              "Nature of Work Done",
              "Rate of Wages (with Particulars of Unit in case of Piece Work)",
              "Remarks",
            ];
            
            const tableRows = [
              ["01", emp?.Doj.split("-").reverse().join("-"), emp?.DesignationDetails?.name,emp?.rate?.arate, ""],
            ];
        
            doc.autoTable({
              head: [tableColumn],
              body: tableRows,
              startY: startY + 10,
              styles: {
                font: 'times',
                fontSize: 8,
                halign: 'center',
                valign: 'middle',
                cellPadding: 2,
              },
              headStyles: {
                fillColor: [220, 220, 220],
                textColor: 0,
                fontStyle: 'bold',
                halign: 'center'
              },
              theme: 'grid',
            });
        
            // Signature Line
            doc.setFont('times', 'normal');
            doc.addImage("https://backend.stcassociates.co.in/static/img/stamp.png", "PNG",  doc.internal.pageSize.getWidth() - 150, startY + 50, 100, 50);
            doc.text('Signature of Contractor', doc.internal.pageSize.getWidth() - 150, startY + 110);
            });
          }
            doc.save('service_certificate.pdf');
          };
  return (
    <div><Button type="submit" onClick={generateServiceCertificate} className='w-full bg-gray-200 outline-4 text-black hover:bg-black hover:text-white' disabled={props?.wait}>{props?.wait?"wait ...":"Service Certificate"}</Button></div>
  )
}

export default ServiceCertificate