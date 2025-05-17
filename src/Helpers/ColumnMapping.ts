import ColumnConfig from "../Interface/ColumnConfig";

const fullColumnConfig: ColumnConfig[] = [
  { field: "slNo", headerName: "Sl No", width: "100px" },
  { field: "jobId", headerName: "Job ID", width: "200px" },
  { field: "isTemp", headerName: "Is Temp", width: "" },
  { field: "jobDate", headerName: "Job Date", width: "200px" },
  { field: "category", headerName: "Category", width: "200px" },
  { field: "customerName", headerName: "Customer Name", width: "200px" },
  { field: "jobParticulars", headerName: "Job Particulars", width: "300px" },
  { field: "jobReference", headerName: "Job Reference", width: "200px" },
  { field: "boeSbNo", headerName: "BOE/SB No", width: "150px" },
  { field: "boeSbDate", headerName: "BOE/SB Date", width: "200px" },
  { field: "arrivalDate", headerName: "Arrival Date", width: "200px" },
  {
    field: "tentativeClosureDate",
    headerName: "Tentative Closure Date",
    width: "200px",
  },
  { field: "closedDate", headerName: "Closed Date", width: "200px" },
  { field: "sellingPrice", headerName: "Selling Price", width: "150px" },
  { field: "costPrice", headerName: "Cost Price", width: "150px" },
  { field: "billingStatus", headerName: "Billing Status", width: "200px" },
  { field: "invoiceDate", headerName: "Invoice Date", width: "200px" },
  {
    field: "courierTrackingNo",
    headerName: "Courier Tracking No",
    width: "200px",
  },
  { field: "dutyPaidDate", headerName: "Duty Paid Date", width: "200px" },
  { field: "clearanceDate", headerName: "Clearance Date", width: "200px" },
  { field: "paymentStatus", headerName: "Payment Status", width: "150px" },
  { field: "remarks", headerName: "Remarks", width: "300px" },
  {
    field: "apekshaInvoiceNo",
    headerName: "Apeksha Invoice No",
    width: "200px",
  },
  { field: "dateOfCourier", headerName: "Date Of Courier", width: "200px" },
  { field: "updatedBy", headerName: "Updated By", width: "150px" },
  { field: "updatedAt", headerName: "Updated At", width: "200px" },
  { field: "action", headerName: "Actions", width: "150px" },
  { field: "jobControls", headerName: "Job Controls", width: "320px" },
  { field: "tat", headerName: "TAT", width: "100px" },
];

export default fullColumnConfig;
