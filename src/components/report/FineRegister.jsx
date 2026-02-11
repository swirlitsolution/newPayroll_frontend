import React from 'react'
import { Button } from '../ui/button'
import jsPDF from 'jspdf';

function FineRegister(props) {
  const generateFineRegister = () => {

    const doc = new jsPDF('landscape', 'pt', 'a4');

    doc.setFont('times', 'normal');
    doc.setFontSize(10);

    // Left Header
    doc.text('Name & Address of Contractor:', 20, 30);
    doc.setFont('times', 'bold');
    doc.text(`${props.company?.companydata?.name}`, 20, 45);
    doc.setFont('times', 'normal');
    doc.text(`${props.company?.companydata.address}`, 20, 60);
    // doc.text('Azadnagar Mango Jsr-832110', 20, 75);
    doc.text('Name & Location of Work', 20, 90);
    doc.text(`${props.company?.worknaturedata?.name || props.company?.workNature || 'N/A'}`, 20, 105);
    // Center Header
    doc.setFont('times', 'bold');
    doc.setFontSize(12);
    doc.text('FOR XXI', doc.internal.pageSize.getWidth() / 2, 30, { align: 'center' });
    doc.setFontSize(10);
    doc.text('SEE RULE 78 (2) (d)', doc.internal.pageSize.getWidth() / 2, 45, { align: 'center' });
    doc.text('REGISTER OF FINES', doc.internal.pageSize.getWidth() / 2, 60, { align: 'center' });
    doc.text('Month DEC / 2024', doc.internal.pageSize.getWidth() / 2, 75, { align: 'center' });

    // Right Header
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.setFont('times', 'normal');
    doc.text('Name & Address of the Establishment Under which Contract is carried on', pageWidth - 320, 30);
    doc.setFont('times', 'bold');
    doc.text(`${props.company?.contractdata?.name || props.company?.contractEstablishment || 'N/A'}`, pageWidth - 320, 45);
    doc.setFont('times', 'normal');
    doc.text('Name & Address of Principal Employer', pageWidth - 320, 60);
    doc.setFont('times', 'bold');
    doc.text(`${props.company?.principledata?.name || props.company?.principleEmployer || 'N/A'}`, pageWidth - 320, 75);

    // Table
    const tableColumn = [
      "No",
      "Name Of Workman",
      "Father's / Husband Name",
      "Designation / Name of Employment",
      "Act./omissions for which fine imposed",
      "Date Of Offence",
      "Whether Workman showed cause Against Fine",
      "Name of Person in Whose Presence Employee explanation was heard",
      "Wages Period and Wages Payable",
      "Amount of Fine Imposed",
      "Date on Which Fine Realised",
      "Remarks",
    ];

    const tableRows = [];

    if (props.employee && Array.isArray(props.employee)) {
      props.employee.forEach((emp, index) => {
        const row = [
          (index + 1).toString().padStart(2, '0'),
          emp.Name,
          emp?.Father || '---',
          emp?.Skill,
          '---',
          '---',
          '---',
          '---',
          '---',
          '---',
          '---',
          emp.remarks || '',
        ];
        tableRows.push(row);
      });
    }

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 110,
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
      },
      theme: 'grid',
    });

    doc.save('fine_register.pdf');
  };
  return (
    <div><Button type="submit" onClick={generateFineRegister} className='w-full bg-gray-200 outline-4 text-black hover:bg-black hover:text-white' disabled={props?.wait}>{props?.wait ? "wait ..." : "Fine Register"}</Button></div>
  )
}

export default FineRegister