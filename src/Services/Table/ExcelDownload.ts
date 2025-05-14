import { toast } from "sonner";
import TableColumns from "../../Interface/TableColumns";
import * as XLSX from "xlsx";
import getShortDate from "../Utils/GetShortDate";

export default function handleExcelDownload(data: TableColumns[]) {
  try {
    const date = getShortDate();
    const worksheet = XLSX.utils.json_to_sheet(data); // Convert data to a worksheet
    const workbook = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, `Report ${date}`); // Append the worksheet to the workbook
    XLSX.writeFile(workbook, "jobs.xlsx"); // Trigger the download
  } catch (error) {
    console.error("Error downloading Excel file:", error);
    toast.error("Failed to download Excel file. Please try again.");
  }
}
