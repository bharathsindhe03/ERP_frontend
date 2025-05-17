import { toast } from "sonner";
import TableColumns from "../../Interface/TableColumns";
import * as XLSX from "xlsx";
import getShortDate from "../Utils/GetShortDate";
import fullColumnConfig from "../../Helpers/ColumnMapping";
import columnOrder from "../../Helpers/ColumnOdering";

export default function handleExcelDownload(data: TableColumns[]) {
  try {
    const date = getShortDate();

    // 1. Prepare columns in the correct order and with correct headers
    const orderedColumns = columnOrder
      .filter((field) => field !== "jobControls")
      .map((field) => fullColumnConfig.find((col) => col.field === field))
      .filter((col): col is NonNullable<typeof col> => !!col);

    // 2. Prepare header row using headerName
    const headers = orderedColumns.map((col) => col.headerName);

    // 3. Map data to match the column order
    const exportData = data.map((row) =>
      orderedColumns.reduce((acc, col) => {
        acc[col.headerName] = row[col.field as keyof TableColumns];
        return acc;
      }, {} as Record<string, unknown>)
    );

    // 4. Insert headers as the first row (XLSX will use object keys as headers)
    const worksheet = XLSX.utils.json_to_sheet(exportData, { header: headers });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `Report ${date}`);
    XLSX.writeFile(workbook, `Report ${date}.xlsx`);
  } catch (error) {
    console.error("Error downloading Excel file:", error);
    toast.error("Failed to download Excel file. Please try again.");
  }
}
