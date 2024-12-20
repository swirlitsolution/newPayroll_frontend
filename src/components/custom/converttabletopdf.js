import { jsPDF } from "jspdf";

// Function to convert HTML table to PDF and download
const convertTableToPDF = (tableId, pdfTitle = 'Document') => {
  const doc = new jsPDF();

  // Get the HTML table element by its id
  const tableElement = document.getElementById(tableId);

  if (tableElement) {
    // Use jsPDF to autoTable plugin for converting table to PDF format
    doc.autoTable({
      html: tableElement, // automatically converts the HTML table
      startY: 20, // starting position from top
    });

    // Title of the PDF
    doc.text(pdfTitle, 20, 10);

    // Save or download the PDF
    doc.save(`${pdfTitle}.pdf`);
  } else {
    console.error('Table element not found!');
  }
};

export default convertTableToPDF;
