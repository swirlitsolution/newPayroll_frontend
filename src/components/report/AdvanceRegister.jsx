import React from 'react'
import { Button } from '../ui/button'
import jsPDF from 'jspdf';
import NewWindowPortal from './NewWindowPortal';
import OdishAdvanceRegister from './OdishAdvanceRegister';
import { set } from 'date-fns';

function AdvanceRegister(props) {
  const [showPreview, setShowPreview] = React.useState(false);
    const GeneratePDF = ()=>{
      if(props?.format == "odishaformat"){
        setShowPreview(true);
      }
      else{
        return generateAdvancePDF()
      }
    }
   
    const generateAdvancePDF = () => {
      console.log(props)
            const doc = new jsPDF('landscape', 'pt', 'A4');
        
            // Set title
            doc.setFontSize(12);
            doc.text('FOR XXII', 400, 30, { align: 'center' });
            doc.text('SEE RULE 78 (1) (d)', 400, 50, { align: 'center' });
            doc.text('REGISTER OF ADVANCE', 400, 70, { align: 'center' });
            doc.text('Month DEC / 2024', 400, 90, { align: 'center' });
        
            // Contractor and Employer Information
            doc.setFontSize(10);
            doc.text('Name & Address of Contractor:', 20, 30);
            doc.text(`${props.company?.name}`, 20, 45);
            doc.text(`${props.company?.address}`, 20, 60);
            doc.text('', 20, 75);
        
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
              { header: 'Wages Period & Wages Payable', dataKey: 'wages' },
              { header: 'Date & Amount of Advance Given', dataKey: 'advance_given' },
              { header: 'Purpose for which Advance Made', dataKey: 'purpose' },
              { header: 'No. of Installments by which Advance to be repaid', dataKey: 'installments' },
              { header: 'Date & Amount of each Installment repaid', dataKey: 'installment_repaid' },
              { header: 'Date on which last installment was repaid', dataKey: 'last_installment' },
              { header: 'Remarks', dataKey: 'remarks' },
            ];
        
            // Table Rows (sample data based on your image)
            const rows = []
            props?.employee?.forEach((emp,index)=>{
             const row = [ 
              index + 1,
              emp?.Name,
              emp.Father || '.',
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
        
            // Add the Table
            doc.autoTable({
              startY: 110,
              head: [columns.map(col => col.header)],
              body:rows,
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
        
            doc.save('register_of_advance.pdf');
          };
  return (
    <div>
    {
      showPreview &&(
        <NewWindowPortal closeWindowPortal={() => setShowPreview(false)}>
            {/* Ye poora component ab nayi window mein dikhega */}
          <div className="p-5 w-full">
              <OdishAdvanceRegister company={props.company} employee={props.employee} month={props.month} /> 
          </div>
          </NewWindowPortal>
      )
    }
    <Button type="submit" onClick={()=>GeneratePDF()} className='w-full bg-gray-200 outline-4 text-black hover:bg-black hover:text-white' disabled={props?.wait}>{props?.wait?"wait ...":"Advance Register"}</Button></div>
  )
} 

export default AdvanceRegister