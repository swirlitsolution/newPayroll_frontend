import React from 'react'
import { Button } from '../ui/button'
import jsPDF from 'jspdf';

function DamageRegister(props) {
      const monthdata = {
    "01":"Jan",
    "02":"Feb",
    "03":"Mar",
    "04":"Apr",
    "05":"May",
    "06":"Jun",
    "07":"Jul",
    "08":"Aug",
    "09":"Sept",
    "10":"Oct",
    "11":"Nov",
    "12":"Dec",
  }
  console.log(props.month)
    const generateDamagePDF = () => {
        const doc = new jsPDF('landscape', 'pt', 'A4');
    
        // Set title
        doc.setFontSize(12);
        doc.text('FOR XXII', 400, 30, { align: 'center' });
        doc.text('SEE RULE 78 (1) (d)', 400, 50, { align: 'center' });
        doc.text('REGISTER OF DEDUCTION FOR DAMAGE OR LOSS', 400, 70, { align: 'center' });
        doc.text(`Month ${monthdata[props.month?.split('-')[1]]} / ${props.month?.split('-')[0]}`, 400, 90, { align: 'center' });
    
        // Contractor and Employer Information
        doc.setFontSize(10);
        doc.text('Name & Address of Contractor:', 20, 30);
        doc.text(`${props.company?.name}`, 20, 45);
        doc.text(`${props.company?.address}`, 20, 60);
    
        doc.text('Name & Address of the Establishment ', 650, 30);
        doc.text('Under which Contract is carried on:', 650, 40);
        doc.text(`${props.company?.contractEstablishment}`, 650, 50);
    
        doc.text('Name & Address of Principal Employer:', 650, 60);
        doc.text(`${props.company?.principleEmployer}`, 650, 75);
    
        doc.text('Name & Location of Work:', 20, 90);
        doc.text(`${props.company?.workNature}`,20,100);
        // Table Columns
        const columns = [
            { header: 'Sl.No.', dataKey: 'slno' },
            { header: 'Name', dataKey: 'name' },
            { header: "Father's / Husband Name", dataKey: 'father' },
            { header: 'Name of Employer', dataKey: 'employer' },
            { header: 'Particular of Damage or Loss', dataKey: 'wages' },
            { header: 'Date of Damage or Loss', dataKey: 'advance_given' },
            { header: 'Whether Workman showed cause Against Deduction', dataKey: 'purpose' },
            { header: 'Name of Person in Whos Presence Employees explanation was heared', dataKey: 'installments' },
            { header: 'Amount Of Deduction Imposed', dataKey: 'installment_repaid' },
            { header: 'No. of Installment', dataKey: 'total_installment' },
            { header: '1st Installment', dataKey: 'first_installment' },
            { header: 'last Installment', dataKey: 'last_installment' },
            { header: 'Remarks', dataKey: 'remarks' },
        ];
    
        // Table Rows (sample data based on your image)
        const rows = [];
        if(props.employee && Array.isArray(props.employee)){
        props.employee.forEach((emp,index)=>{
            const row = [
            index + 1,
            emp.Name,
            emp.Father || '.',
            emp?.DesignationDetails?.name || '.',
            '- - -',
            '- - -',
                '- - -',
            '- - -',
                '- - -',
            '- - -',
                '- - -',
            '- - -',
                'NIL'
            ]
            rows.push(row)
        })
      }

        // Add the Table
        doc.autoTable({
            startY: 110,
            head: [columns.map(col => col.header)],
            body: rows,
            styles: {
            fontSize: 8,
            cellPadding: 3,
            halign: 'center',
            valign: 'middle',
            },
            headStyles: {
            fillColor: [220, 220, 220],
            textColor: 0,
            fontStyle: 'bold',
            halign: 'center'
            },
            theme: 'grid',
        });
    
        doc.save('register_of_damage.pdf');
        };
  return (
    <div><Button type="submit" onClick={generateDamagePDF} className='w-full bg-gray-200 outline-4 text-black hover:bg-black hover:text-white' disabled={props?.wait}>{props?.wait?"wait ...":"Damage Register"}</Button></div>
  )
}

export default DamageRegister