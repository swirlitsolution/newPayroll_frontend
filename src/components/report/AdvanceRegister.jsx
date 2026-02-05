import React from 'react'
import { Button } from '../ui/button'
import jsPDF from 'jspdf';
import NewWindowPortal from './NewWindowPortal';
import OdishAdvanceRegister from './OdishAdvanceRegister';
import { set } from 'date-fns';

function AdvanceRegister(props) {
  const [showPreview, setShowPreview] = React.useState(false);
  const [pdfUrl, setPdfUrl] = React.useState(null);
  const [stampImg, setStampImg] = React.useState(null);

  React.useEffect(() => {
    const getBase64ImageFromURL = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.setAttribute("crossOrigin", "anonymous");
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          const dataURL = canvas.toDataURL("image/png");
          resolve(dataURL);
        };
        img.onerror = error => reject(error);
        img.src = url;
      });
    };

    getBase64ImageFromURL("https://backend.stcassociates.co.in/static/img/stamp.png")
      .then(base64 => setStampImg(base64))
      .catch(err => console.error("Error loading stamp image:", err));
  }, []);

    const GeneratePDF = ()=>{
      if(props?.format == "odishaformat"){
        setShowPreview(true);
      }
      else{
        generateAdvancePDF()
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
              emp.Father || 'NIL',
              emp?.DesignationDetails?.name || 'NIL',
              'NIL',
              'NIL',
              'NIL',
              'NIL',
              'NIL',
              'NIL',
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

            // Add Stamp and Signature
            const pageHeight = doc.internal.pageSize.getHeight();
            const pageWidth = doc.internal.pageSize.getWidth();
            let finalY = doc.lastAutoTable.finalY || 150;
            
            // Calculate Signature Position to align with Remarks column (Table Right Edge)
            doc.setFontSize(10);
            const signText = "Stamp & Signature of the Contractor";
            const textWidth = doc.getTextWidth(signText);
            const tableMarginRight = 15; // Reduced margin to move signature more to the right
            const tableEndX = pageWidth - tableMarginRight;
            
            // Start X for the signature block so it ends exactly at tableEndX
            const signatureX = tableEndX - textWidth;
            
            // Check if we have space on current page
            // Signature block needs approx 80-100pt height
            if (finalY + 100 > pageHeight - 20) {
              doc.addPage();
              finalY = 40; // Top margin on new page
            }

            // Position signature starting just below the table (plus padding)
            const signatureStartY = finalY + 30;

            if (stampImg) {
              // Image width 100, Text width ~175. Center image over text.
              const imgWidth = 100;
              const imgX = signatureX + (textWidth - imgWidth) / 2;
              doc.addImage(stampImg, 'PNG', imgX, signatureStartY, imgWidth, 60);
            }
            // Text below image
            doc.text(signText, signatureX, signatureStartY + 75);
        
            const url = doc.output('bloburl');
            setPdfUrl(url);
            setShowPreview(true);
          };
  return (
    <div>
    {
      showPreview &&(
        <NewWindowPortal closeWindowPortal={() => setShowPreview(false)}>
            {/* Ye poora component ab nayi window mein dikhega */}
          <div className="p-5 w-full h-screen">
              {props?.format === "odishaformat" ? (
                <OdishAdvanceRegister company={props.company} employee={props.employee} month={props.month} /> 
              ) : (
                <iframe src={pdfUrl} className="w-full h-full" title="Advance Register Preview"></iframe>
              )}
          </div>
          </NewWindowPortal>
      )
    }
    <Button type="submit" onClick={()=>GeneratePDF()} className='w-full bg-gray-200 outline-4 text-black hover:bg-black hover:text-white' disabled={props?.wait}>{props?.wait?"wait ...":"Advance Register"}</Button></div>
  )
} 

export default AdvanceRegister