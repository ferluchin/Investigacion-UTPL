//import { saveAs } from 'file-saver';
import { saveAs } from './node_modules/file-saver/dist/FileSaver.min.js';
//import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const fileExtension = '.xlsx';

export const downloadCSV = (csvContent, fileName) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, fileName);
};

export const downloadPDF = (tableId, fileName) => {
    const doc = new jsPDF();
    doc.autoTable({ html: tableId });
    doc.save(fileName);
};

export const downloadExcel = (dataSource, fileName) => {
    const ws = XLSX.utils.json_to_sheet(dataSource);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    saveAs(data, fileName + fileExtension);
};
