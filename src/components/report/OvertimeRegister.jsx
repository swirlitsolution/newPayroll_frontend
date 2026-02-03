import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import NewWindowPortal from './NewWindowPortal';
import jsPDF from 'jspdf';
import { Button } from '../ui/button';
import OdishaOverTimeRegister from './OdishaOverTimeRegister';
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

function OvertimeRegister(props) {
    const contentRef = useRef();
    const reactToPrintFn = useReactToPrint({ contentRef });
     const [showPreview, setShowPreview] = React.useState(false);
     console.log(props)
        const GeneratePDF = ()=>{
          if(props?.format == "odishaformat"){
            setShowPreview(true);
          }
          else{
            return generateOverTimePDF()
          }
        }
         const generateOverTimePDF = () => {
            const doc = new jsPDF('portrait', 'pt', 'a4');
        
            doc.setFont('times', 'normal');
            doc.setFontSize(10);
        
            // Top Header Center
            doc.setFont('times', 'bold');
            doc.setFontSize(12);
            doc.text('FOR XXII', doc.internal.pageSize.getWidth() / 2, 40, { align: 'center' });
            doc.setFont('times', 'normal');
            doc.setFontSize(10);
            doc.text('SEE RULE 78 (2) (e)', doc.internal.pageSize.getWidth() / 2, 55, { align: 'center' });
            doc.setFont('times', 'bold');
            doc.text('REGISTER OF OVER TIME', doc.internal.pageSize.getWidth() / 2, 70, { align: 'center' });
        
            doc.setFont('times', 'normal');
            doc.text('Month: DEC / 2024', doc.internal.pageSize.getWidth() / 2, 85, { align: 'center' });
        
            doc.setLineWidth(1);
            doc.rect(20, 20, doc.internal.pageSize.getWidth() - 40, doc.internal.pageSize.getHeight() - 60);
        
            // Contractor & Establishment Details
            const leftDetails = [
              ['Name & Address of Contractor', `${props.company?.name}\n${props.company?.address}`],
              ['Name & Location of Work', ''],
            ];
            const rightDetails = [
              ['Name & Address of the Establishment', `${props.company?.contractEstablishment}`],
              ['Name & Address of Principal Employer', `${props.company?.principleEmployer}`],
            ];
        
            let startY = 100;
        
            leftDetails.forEach(([label, value]) => {
              doc.setFont('times', 'normal');
              doc.text(label, 30, startY);
              doc.setFont('times', 'bold');
              doc.text(value, 200, startY);
              startY += (value.includes('\n') ? 30 : 20);
            });
        
            startY = 100;
            rightDetails.forEach(([label, value]) => {
              doc.setFont('times', 'normal');
              doc.text(label, 400, startY);
              doc.setFont('times', 'bold');
              doc.text(value, 400, startY+10);
              startY += 20;
            });
        
            // Table Data
            const tableColumn = [
              "Sl. No",
              "Name Of Workman",
              "Father's / Husband's Name",
              "Sex",
              "Name of Employment",
              "Date on which Over Time Worked",
              "Total Over Time Worked or Production",
              "Normal Rate of Wages",
              "Over Time Rate of Wages",
              "Over Time Earnings",
              "Date on which Over Time Wages Paid",
              "Remarks"
            ];
        
           
        const rows = []
            props?.employee?.forEach((emp,index)=>{
              const row = [
                index + 1,
                emp.Name,
                emp?.Father || '.',
                emp?.Gender || '.',
                emp?.DesignationDetails?.name || '.',
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
            doc.autoTable({
              head: [tableColumn],
              body: rows,
              startY: 150,
              styles: {
                font: 'times',
                fontSize: 7,
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
        
            doc.save('overtime_register.pdf');
          };
  return (
    <div>
       {
        showPreview &&(
          <NewWindowPortal closeWindowPortal={() => setShowPreview(false)}>
              {/* Ye poora component ab nayi window mein dikhega */}
            <div className="p-5 w-full">
                <OdishaOverTimeRegister company={props.company} employee={props.employee} month={props.month} /> 
            </div>
            </NewWindowPortal>
        )
      }
        {
      props.company && (
        <div className='w-full flex flex-col'>
            <Button type="submit" onClick={GeneratePDF} className='w-full bg-gray-200 outline-4 text-black hover:bg-black hover:text-white' disabled={props?.wait}>{props?.wait?"wait ...":"Overtime"}</Button>
        </div>
      )
    }
    </div>
  )
}

export default OvertimeRegister