import React, { useEffect, useState } from 'react'
import { useForm,Controller  } from "react-hook-form";
import usePost from '../../hooks/usePost';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import Master from '../master/Master';
import { X } from 'lucide-react';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function Misc() {
    const {control,watch, register,handleSubmit, formState: { errors } } = useForm()
    const { data, error, loading,postRequest,getRequest } = usePost('/leave/')
    const [disabled,setDisabled] = useState(false)
    const [close,setClose] = useState(false)
    const [employees,setEmployees] = useState([])
    const [selectedEmployee,setSelectedEmployee] = useState([])
    
    const handleCard = ()=>{
        setClose(!close)
    }
    const generateAdvancePDF = () => {
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
        doc.text('GLOBAL AC SYSTEM JSR PVT LTD', 20, 45);
        doc.text('502/A Jawaharnagar Road-17', 20, 60);
        doc.text('Adityapur Mango Jsr-831010', 20, 75);
    
        doc.text('Name & Address of the Establishment ', 650, 30);
        doc.text('Under which Contract is carried on:', 650, 40);
        doc.text('HINDALCO INDUSTRIES LTD', 650, 50);
    
        doc.text('Name & Address of Principal Employer:', 650, 60);
        doc.text('VOLTAS LIMITED', 650, 75);
    
        doc.text('Name & Location of Work:', 20, 95);
    
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
        const rows = [
          {
            slno: '1',
            name: 'SK ARIF',
            father: '.',
            employer: 'SUPERVIS',
            wages: '- - -',
            advance_given: '- - -',
            purpose: '- - -',
            installments: '- - -',
            installment_repaid: '- - -',
            last_installment: '- - -',
            remarks: 'NIL'
          },
          {
            slno: '2',
            name: 'SK SAIDUL ISLAM',
            father: '.',
            employer: 'FITTER-I',
            wages: '- - -',
            advance_given: '- - -',
            purpose: '- - -',
            installments: '- - -',
            installment_repaid: '- - -',
            last_installment: '- - -',
            remarks: 'NIL'
          },
          {
            slno: '3',
            name: 'HIMANSHU DULARURU',
            father: '.',
            employer: 'SKILLED',
            wages: '- - -',
            advance_given: '- - -',
            purpose: '- - -',
            installments: '- - -',
            installment_repaid: '- - -',
            last_installment: '- - -',
            remarks: 'NIL'
          },
          {
            slno: '4',
            name: 'SK NAZRUL ISLAM',
            father: '.',
            employer: 'HIGH SKIL',
            wages: '- - -',
            advance_given: '- - -',
            purpose: '- - -',
            installments: '- - -',
            installment_repaid: '- - -',
            last_installment: '- - -',
            remarks: 'NIL'
          },
        ];
    
        // Add the Table
        doc.autoTable({
          startY: 110,
          head: [columns.map(col => col.header)],
          body: rows.map(row => columns.map(col => row[col.dataKey])),
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
    const generateDamagePDF = () => {
        const doc = new jsPDF('landscape', 'pt', 'A4');
    
        // Set title
        doc.setFontSize(12);
        doc.text('FOR XXII', 400, 30, { align: 'center' });
        doc.text('SEE RULE 78 (1) (d)', 400, 50, { align: 'center' });
        doc.text('REGISTER OF DEDUCTION FOR DAMAGE OR LOSS', 400, 70, { align: 'center' });
        doc.text('Month DEC / 2024', 400, 90, { align: 'center' });
    
        // Contractor and Employer Information
        doc.setFontSize(10);
        doc.text('Name & Address of Contractor:', 20, 30);
        doc.text('GLOBAL AC SYSTEM JSR PVT LTD', 20, 45);
        doc.text('502/A Jawaharnagar Road-17', 20, 60);
        doc.text('Adityapur Mango Jsr-831010', 20, 75);
    
        doc.text('Name & Address of the Establishment ', 650, 30);
        doc.text('Under which Contract is carried on:', 650, 40);
        doc.text('HINDALCO INDUSTRIES LTD', 650, 50);
    
        doc.text('Name & Address of Principal Employer:', 650, 60);
        doc.text('VOLTAS LIMITED', 650, 75);
    
        doc.text('Name & Location of Work:', 20, 95);
    
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
        const rows = [
          {
            slno: '1',
            name: 'SK ARIF',
            father: '.',
            employer: 'SUPERVIS',
            wages: '- - -',
            advance_given: '- - -',
            purpose: '- - -',
            installments: '- - -',
            installment_repaid: '- - -',
            total_installment: '- - -',
            first_installment: '- - -',
            lasst_installment: '- - -',
            remarks: 'NIL'
          },
          {
            slno: '2',
            name: 'SK SAIDUL ISLAM',
            father: '.',
            employer: 'FITTER-I',
            wages: '- - -',
            advance_given: '- - -',
            purpose: '- - -',
            installments: '- - -',
            installment_repaid: '- - -',
            total_installment: '- - -',
            first_installment: '- - -',
            lasst_installment: '- - -',
            remarks: 'NIL'
          },
          {
            slno: '3',
            name: 'HIMANSHU DULARURU',
            father: '.',
            employer: 'SKILLED',
            wages: '- - -',
            advance_given: '- - -',
            purpose: '- - -',
            installments: '- - -',
            installment_repaid: '- - -',
            total_installment: '- - -',
            first_installment: '- - -',
            lasst_installment: '- - -',
            remarks: 'NIL'
          },
          {
            slno: '4',
            name: 'SK NAZRUL ISLAM',
            father: '.',
            employer: 'HIGH SKIL',
            wages: '- - -',
            advance_given: '- - -',
            purpose: '- - -',
            installments: '- - -',
            installment_repaid: '- - -',
            total_installment: '- - -',
            first_installment: '- - -',
            lasst_installment: '- - -',
            remarks: 'NIL'
          },
        ];
    
        // Add the Table
        doc.autoTable({
          startY: 110,
          head: [columns.map(col => col.header)],
          body: rows.map(row => columns.map(col => row[col.dataKey])),
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
    const generateEmployeementCardPDF = () => {
        const doc = new jsPDF('landscape', 'pt', 'A4');
        const employees = [
            {
              name: "AAMIL HASSAN",
              registerNo: "2375",
              designation: "HELPER",
              wageRate: "513.48",
              wagePeriod: "Monthly",
              tenure: "06/10/2023",
              remarks: ""
            },
            {
              name: "SAIF ALI",
              registerNo: "2376",
              designation: "SUPERVISOR",
              wageRate: "650.00",
              wagePeriod: "Monthly",
              tenure: "07/10/2023",
              remarks: ""
            },
            {
              name: "ANAS KHAN",
              registerNo: "2377",
              designation: "TECHNICIAN",
              wageRate: "720.00",
              wagePeriod: "Monthly",
              tenure: "08/10/2023",
              remarks: ""
            },
            {
              name: "MOHAMMAD ZUBAIR",
              registerNo: "2378",
              designation: "HELPER",
              wageRate: "500.00",
              wagePeriod: "Monthly",
              tenure: "09/10/2023",
              remarks: ""
            },
            {
              name: "FAIZAN ALI",
              registerNo: "2379",
              designation: "ELECTRICIAN",
              wageRate: "750.00",
              wagePeriod: "Monthly",
              tenure: "10/10/2023",
              remarks: ""
            },
            {
              name: "SHOAIB AKHTAR",
              registerNo: "2380",
              designation: "SUPERVISOR",
              wageRate: "800.00",
              wagePeriod: "Monthly",
              tenure: "11/10/2023",
              remarks: ""
            },
            // 👉 Add more employees if you want
          ];
        
          const pageWidth = doc.internal.pageSize.getWidth();
          const pageHeight = doc.internal.pageSize.getHeight();
      
          const cardHeight = pageHeight / 2 - 20; // Adjust 20px margin
          const cardWidth = pageWidth - 40; // 20px margin on each side
      
        employees.forEach((employee, index) => {
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
            doc.text('GLOBAL AC SYSTEM JSR PVT LTD', 30, positionY + 60);
            doc.setFont('times', 'normal');
            doc.text('502/A Jawaharnagar Road-17', 30, positionY + 80);
            doc.text('Azadnagar Mango Jsr-832110', 30, positionY + 100);
      
            // Employer Details
            doc.setFont('times', 'normal');
            doc.text('Name & Address of the Establishment ', 650, positionY + 40, { align: 'left' });
            doc.text('Under which contract is carried on:', 650, positionY + 50, { align: 'left' });
            doc.setFont('times', 'bold');
            doc.text('HINDALCO INDUSTRIES LTD', 650, positionY + 60, { align: 'left' });
            doc.setFont('times', 'normal');
            doc.text('Name & Address of Principal Employer', 650, positionY + 80, { align: 'left' });
            doc.setFont('times', 'bold');
            doc.text('VOLTAS LIMITED', 650, positionY + 100, { align: 'left' });
      
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
              employee.name,
              employee.registerNo,
              employee.designation,
              employee.wageRate,
              employee.wagePeriod,
              employee.tenure,
              employee.remarks
            ];
      
            lines.forEach((line, idx) => {
              doc.setFont('times', 'normal');
              doc.text(line, 40, bodyStartY + (idx * 15));
            });
      
            values.forEach((val, idx) => {
              doc.setFont('times', 'bold');
              doc.text(val || '', 500, bodyStartY + (idx * 15));
            });
          });
      
          doc.save('employment_cards.pdf');
      };
    
    const generateWorkManRegister = () => {
        const employees = [
          { name: 'AAMIL HASSAN', fatherName: '', natureOfWork: '', groupLetter: '', relayNo: '', certificateDate: '', tokenRef: '', remarks: '' },
          { name: 'ABHIMANYU PRASAD SINGH', fatherName: '', natureOfWork: '', groupLetter: '', relayNo: '', certificateDate: '', tokenRef: '', remarks: '' },
          { name: 'ABHISHEK RAJAK', fatherName: '', natureOfWork: '', groupLetter: '', relayNo: '', certificateDate: '', tokenRef: '', remarks: '' },
          { name: 'ABUDARDA', fatherName: '', natureOfWork: '', groupLetter: '', relayNo: '', certificateDate: '', tokenRef: '', remarks: '' },
          { name: 'ADITYA KUMAR MAHTO', fatherName: '', natureOfWork: '', groupLetter: '', relayNo: '', certificateDate: '', tokenRef: '', remarks: '' },
          { name: 'AGUSTI DEO', fatherName: '', natureOfWork: '', groupLetter: '', relayNo: '', certificateDate: '', tokenRef: '', remarks: '' },
          { name: 'AJAY KUMAR DAS', fatherName: 'SBN0006444', natureOfWork: '', groupLetter: '', relayNo: '', certificateDate: '', tokenRef: '', remarks: '' },
          { name: 'AJAY KUMAR DUBEY', fatherName: '', natureOfWork: '', groupLetter: '', relayNo: '', certificateDate: '', tokenRef: '', remarks: '' },
          { name: 'AJAYA BEHERA', fatherName: '', natureOfWork: '', groupLetter: '', relayNo: '', certificateDate: '', tokenRef: '', remarks: '' },
          { name: 'AJFAR ALI SK.', fatherName: '', natureOfWork: '', groupLetter: '', relayNo: '', certificateDate: '', tokenRef: '', remarks: '' },
          // ➡️ Add more employee objects as needed
        ];
        const doc = new jsPDF('landscape', 'pt', 'a4');
    
        // Contractor Info
        doc.setFont('times', 'normal');
        doc.setFontSize(11);
        doc.text('Name and Address', 20, 30);
        doc.text('Of Contractor:', 20, 45);
    
        doc.setFont('times', 'bold');
        doc.text('GLOBAL AC SYSTEM JSR PVT LTD', 120, 30);
        doc.setFont('times', 'normal');
        doc.text('502/A Jawaharnagar Road-17', 120, 45);
        doc.text('Azadnagar Mango Jsr-832110', 120, 60);
    
        // Title Centered
        doc.setFont('times', 'bold');
        doc.setFontSize(14);
        doc.text('REGISTER OF ADULT WORKERS', doc.internal.pageSize.getWidth() / 2, 30, { align: 'center' });
    
        // Table Headers
        const tableColumn = [
          "Sl. No.",
          "Name & Address",
          "Father's Name",
          "Nature of Work",
          "Letter of Group\nAs in Form 11",
          "No. of Relay\nif Working in Shift",
          "No. & Date of Certificate if an Adolescent",
          "Token No. given Ref.\nto the Certificate",
          "Remarks",
        ];
    
        // Table Rows
        const tableRows = [];
    
        employees.forEach((emp, index) => {
          const row = [
            index + 1,
            emp.name,
            emp.fatherName || '.',
            emp.natureOfWork || '.',
            emp.groupLetter || '.',
            emp.relayNo || '.',
            emp.certificateDate || '.',
            emp.tokenRef || '.',
            emp.remarks || '.',
          ];
          tableRows.push(row);
        });
    
        // Draw Table
        doc.autoTable({
          head: [tableColumn],
          body: tableRows,
          startY: 80,
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
            fontStyle: "bold",
          },
          theme: 'grid',
        });
    
        doc.save('register_of_adult_workers.pdf');
      };
    const generateFineRegister = () => {
      const employees = [
        { name: 'SK ARIF', designation: 'SUPERVIS', remarks: 'NIL' },
        { name: 'SK SAIDUL ISLAM', designation: 'FITTER-I', remarks: 'NIL' },
        { name: 'HIMANSHU DURABUKU', designation: 'SKILLED', remarks: 'NIL' },
        { name: 'SK NAZRUL ISLAM', designation: 'HIGH SKIL', remarks: 'NIL' },
        { name: 'RAM KINKAR MANDAL', designation: 'HIGH SKIL', remarks: 'NIL' },
        { name: 'MD MADHU', designation: 'WELDER-I', remarks: 'NIL' },
        { name: 'SEKH NASIRUDDIN', designation: 'SKILLED', remarks: 'NIL' },
        { name: 'MANOJ KUMAR MANDAL', designation: 'SKILLED', remarks: 'NIL' },
        { name: 'NIRAJ KUMAR', designation: 'SKILLED', remarks: 'NIL' },
        { name: 'SK MADUL ISLAM-2', designation: 'SEMISKILL', remarks: 'NIL' },
        { name: 'MIRZA AIM ALI', designation: 'FITTER-I', remarks: 'NIL' },
        { name: 'NASIMUL HAQUE.', designation: 'UNSKILLE', remarks: 'NIL' },
        { name: 'MD HASAN SK.', designation: 'SKILLED', remarks: 'NIL' },
        { name: 'SK SABUR ALI', designation: 'UNSKILLE', remarks: 'NIL' },
      ];
        const doc = new jsPDF('landscape', 'pt', 'a4');
    
        doc.setFont('times', 'normal');
        doc.setFontSize(10);
    
        // Left Header
        doc.text('Name & Address of Contractor:', 20, 30);
        doc.setFont('times', 'bold');
        doc.text('GLOBAL AC SYSTEM JSR PVT LTD', 20, 45);
        doc.setFont('times', 'normal');
        doc.text('502/A Jawaharnagar Road-17', 20, 60);
        doc.text('Azadnagar Mango Jsr-832110', 20, 75);
        doc.text('Name & Location of Work', 20, 90);
    
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
        doc.text('HINDALCO INDUSTRIES LTD', pageWidth - 320, 45);
        doc.setFont('times', 'normal');
        doc.text('Name & Address of Principal Employer', pageWidth - 320, 60);
        doc.setFont('times', 'bold');
        doc.text('VOLTAS LIMITED', pageWidth - 320, 75);
    
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
    
        employees.forEach((emp, index) => {
          const row = [
            (index + 1).toString().padStart(2, '0'),
            emp.name,
            '.',
            emp.designation,
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
      const generateServiceCertificate = () => {
        const employees = [
          {
            name: "AAMIL HASSAN",
            registerNo: "2375",
            designation: "HELPER",
            wageRate: "513.48",
            wagePeriod: "Monthly",
            tenure: "06/10/2023",
            remarks: ""
          },
          {
            name: "SAIF ALI",
            registerNo: "2376",
            designation: "SUPERVISOR",
            wageRate: "650.00",
            wagePeriod: "Monthly",
            tenure: "07/10/2023",
            remarks: ""
          },
          {
            name: "ANAS KHAN",
            registerNo: "2377",
            designation: "TECHNICIAN",
            wageRate: "720.00",
            wagePeriod: "Monthly",
            tenure: "08/10/2023",
            remarks: ""
          },
          {
            name: "MOHAMMAD ZUBAIR",
            registerNo: "2378",
            designation: "HELPER",
            wageRate: "500.00",
            wagePeriod: "Monthly",
            tenure: "09/10/2023",
            remarks: ""
          },
          {
            name: "FAIZAN ALI",
            registerNo: "2379",
            designation: "ELECTRICIAN",
            wageRate: "750.00",
            wagePeriod: "Monthly",
            tenure: "10/10/2023",
            remarks: ""
          },
          {
            name: "SHOAIB AKHTAR",
            registerNo: "2380",
            designation: "SUPERVISOR",
            wageRate: "800.00",
            wagePeriod: "Monthly",
            tenure: "11/10/2023",
            remarks: ""
          },
          // 👉 Add more employees if you want
        ];
        const doc = new jsPDF('portrait', 'pt', 'a4');
        
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
    
        const cardHeight = pageHeight / 2 - 20; // Adjust 20px margin
        const cardWidth = pageWidth - 40; // 20px margin on each side
    
        employees.forEach((employee, index) => {
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
          ['Name and Address of Contractor', 'GLOBAL AC SYSTEM JSR PVT LTD\n502/A Jawaharnagar Road-17\nAzadnagar Mango Jsr-832110'],
          ['Name and Address of Establishment in/under which contract is carried on', 'HINDALCO INDUSTRIES LTD'],
          ['Nature and Location of Work', 'HVAC AMC'],
          ['Name and address of Principal Employer', 'VOLTAS LIMITED'],
          ['Name and Address of the Workman', 'SK ARIF.'],
          ['Age or Date of Birth', '15/10/2024'],
          ['Identification Marks', '.'],
          ['Father\'s / Husband\'s Name', '.'],
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
          ["01", "01/09/2024 - 15/10/2024", "SUPERVISOR (N.D)", "676.44", ""],
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
        doc.text('Signature of Contractor', doc.internal.pageSize.getWidth() - 150, startY + 80);
      });
        doc.save('service_certificate.pdf');
      };
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
          ['Name & Address of Contractor', 'GLOBAL AC SYSTEM JSR PVT LTD\n502/A Jawaharnagar Road-17\nAzadnagar Mango Jsr-832110'],
          ['Name & Location of Work', ''],
        ];
        const rightDetails = [
          ['Name & Address of the Establishment', 'HINDALCO INDUSTRIES LTD'],
          ['Name & Address of Principal Employer', 'VOLTAS LIMITED'],
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
    
        const tableRows = [
          ["01", "SK ARIF.", ".", "Male", "SUPERVIS", "---", "---", "---", "---", "---", "---", "NIL"],
          ["02", "SK.SAIDUL ISLAM", ".", "Male", "FITTER-I", "---", "---", "---", "---", "---", "---", "NIL"],
          ["03", "HIMANSHU DURABURU", ".", "Male", "SKILLED", "---", "---", "---", "---", "---", "---", "NIL"],
          ["04", "SK.NAZRUL ISLAM", ".", "Male", "HIGH SKIL", "---", "---", "---", "---", "---", "---", "NIL"],
          ["05", "RAM KINKAR MANDAL", ".", "Male", "HIGH SKIL", "---", "---", "---", "---", "---", "---", "NIL"],
          ["06", "MD. MADHU", ".", "Male", "WELDER-I", "---", "---", "---", "---", "---", "---", "NIL"],
          ["07", "SEKH NASRUDDIN", ".", "Male", "SKILLED", "---", "---", "---", "---", "---", "---", "NIL"],
          ["08", "MANOJ KUMAR MANDAL", ".", "Male", "SKILLED", "---", "---", "---", "---", "---", "---", "NIL"],
          ["09", "NIRAJ KUMAR", ".", "Male", "SKILLED", "---", "---", "---", "---", "---", "---", "NIL"],
          ["10", "SK MADUL ISLAM-2", ".", "Male", "SEMISKILL", "---", "---", "---", "---", "---", "---", "NIL"],
          ["11", "MIRZA AJIM ALI", ".", "Male", "FITTER-I", "---", "---", "---", "---", "---", "---", "NIL"],
          ["12", "NASMUL HAQUE", ".", "Male", "UNSKILLE", "---", "---", "---", "---", "---", "---", "NIL"],
          ["13", "MD.HASAN SK", ".", "Male", "SKILLED", "---", "---", "---", "---", "---", "---", "NIL"],
          ["14", "SK SABUR ALI", ".", "Male", "UNSKILLE", "---", "---", "---", "---", "---", "---", "NIL"],
        ];
    
        doc.autoTable({
          head: [tableColumn],
          body: tableRows,
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
    const onSubmit = (data)=>{
            console.log(data)
            const month = data.month.split('-')[1]
            const year = data.month.split('-')[0]
            if(data.type === 'sitewise'){
                if(data.Site){
                    const site = data.Site
                    if(data.register === "advanceRegister"){
                        getRequest(`/getattendancereport/${month}/${year}/${site}/`).then((res)=>{
                            console.log(data)
                            generateAdvancePDF()
                        })
                    }
                    if(data.register === "damageRegister"){
                        getRequest(`/getattendancereport/${month}/${year}/${site}/`).then((res)=>{
                            console.log(data)
                            generateDamagePDF()
                        })
                    }
                    if(data.register === "employeementCard"){
                        getRequest(`/getattendancereport/${month}/${year}/${site}/`).then((res)=>{
                            console.log(data)
                            generateEmployeementCardPDF()
                        })
                    }
                    if(data.register === "workmanregister"){
                        getRequest(`/getattendancereport/${month}/${year}/${site}/`).then((res)=>{
                            console.log(data)
                            generateWorkManRegister()
                        })
                    }
                    if(data.register === "fineRegister"){
                        getRequest(`/getattendancereport/${month}/${year}/${site}/`).then((res)=>{
                            console.log(data)
                            generateFineRegister()
                        })
                    }
                    if(data.register === "serviceCertificate"){
                      generateServiceCertificate()
                    }
                   if(data.register === "overTimeRegister"){
                      generateOverTimePDF()
                    }
                    
                }
                else
                {
                    toast.error("Please select site")
                }
                
            }
            
            // getRequest(`/getattendancereport/${month}/${year}/`)
            
            // postRequest(formattedData)
        }
    useEffect(()=>{
        getRequest('/master/employee/')
        setEmployees(data)
    },[])
    const SelectEmployee = ({heading,showMaster})=>{
        const handleOnChange = ()=>{
            const table = document.querySelector('table')
            const checkboxes = table.querySelectorAll('input[type="checkbox"]')
            const selected = []
            checkboxes.forEach((checkbox) => {
                const id = checkbox.id
                if (checkbox.checked) {
                    const row = checkbox.closest('tr')
                    const empId = row.querySelector('td:nth-child(2)').textContent
                    const name = row.querySelector('td:nth-child(3)').textContent
                    selected.push({id,empId,name})
                }
            })
            setSelectedEmployee(selected)
            showMaster()
    }
        
        return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full " id="my-modal">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white h-[500px] ">
                <div className="mt-3 text-left">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-900">CREATE {heading.toUpperCase()}</h3>
                        <button className="text-gray-400 hover:text-gray-500" onClick={()=>showMaster()}>
                        <X className="h-6 w-6" />
                        </button>
                    </div>
                    <div className='w-full h-[350px] overflow-y-auto'>
                    <table className="w-full h-full  text-sm text-left text-gray-500 ">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th><Input type="checkbox" /></th>
                                <th  className="px-3 border-2 py-3">EmpId</th>
                                <th  className="px-3 border-2 py-3">Name</th>
                            </tr>
                          </thead>
                          <tbody className='h-[350px]' >
                           {employees?.length>0?employees.map((item)=>(
                            <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                                <td><Input type="checkbox" id={item.id} /></td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.EmpId}</td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.Name}</td>
                            </tr>
                            
                           ))
                           :<tr className="bg-white border-b hover:bg-gray-50">
                                <td colSpan={3} className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">No Data</td>
                            </tr>
                           }
                            
                          </tbody>
                        </table>
                    </div>
                    
                             
                    <div className='flex gap-2 mt-2'>
                
                   
                    <Button  onClick={handleOnChange} >Done</Button>
                       
                
                    </div>
            
                </div>
            
            </div>
    </div>
    }
  return (
    <div>
    {close?<SelectEmployee heading="Misc" showMaster={handleCard} />:""}
       <form onSubmit={handleSubmit(onSubmit)} className='mt-2'>
           
        
            <div className='w-full flex justify-center mt-2'>
                <div className='w-[500px] border-2 grid [grid-template-columns:50px_150px_50px_150px] p-2 text-start '>
                <div className='w-full grid grid-cols-4 col-span-4'>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">Date Range</label>
                <Input type="month" id="month" {...register("month")} className=' w-42 col-span-3' />
                
            
                
                <Input type="radio" onClick={()=>setDisabled(true)} value="all" id="all"  {...register("type")}  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                
                 <label htmlFor='all' className="block mb-2 col-span-3 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">All</label>
                 
                
                 <Input type="radio" onClick={()=>setDisabled(false)}  value="sitewise"  {...register("type")}  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                                    
                <Controller
                    
                    name="Site"
                    defaultValue="" // Initial value can be set here
                    control={control}
                    
                    render={({ field, fieldState: { error } }) => {
                        const { onChange, value, ref } = field;
                    return (
                        <Master 
                        disabled={disabled}
                        api = "/master/site/"
                        className="w-full col-span-3"
                        onValueChange={(newValue) => {onChange(newValue || null)
                  
                        }} 
                        value={value} name='Site' />
                    );
                    }}
                />
                <Input type="radio" onClick={handleCard}  value="selected" id="selected"  {...register("type")}  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                <label htmlFor='selected' className="block col-span-3 mb-2 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">Selected</label>
                 
            </div>
                        <Input type="radio" id="advanceRegister" {...register("register")} value="advanceRegister"  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                        <label htmlFor='advanceRegister' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">Advance Register</label>
                        
                        <Input type="radio" id="damageRegister" {...register("register")} value="damageRegister"   className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                        <label htmlFor='damageRegister' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">Damage Register</label>
                        <Input type="radio" id="workmanregister" {...register("register")} value="workmanregister"   className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                        <label htmlFor='workmanregister' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">Work Man Register</label>
                        <Input type="radio" id="employementCard" {...register("register")} value="employeementCard"   className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                        <label htmlFor='employementCard' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">Employement Card</label>
                        
                        <Input type="radio" id="fineRegister" {...register("register")} value="fineRegister"   className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                        <label htmlFor='fineRegister' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">Fine Register</label>
                        <Input type="radio" id="serviceCertificate" {...register("register")} value="serviceCertificate"   className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                        <label htmlFor='serviceCertificate' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">Service Certificate</label>
                        <Input type="radio" id="overTimeRegister" {...register("register")} value="overTimeRegister"   className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                        <label htmlFor='overTimeRegister' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">Over Time Register</label>
                        
                        <Button type="submit" className='col-span-2'>Submit</Button>
                        
            
                </div>
            </div>
        </form>
    </div>
  )
}

export default Misc