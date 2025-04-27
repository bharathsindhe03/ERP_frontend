import { Typography } from "@mui/material";
import TableColumns from "../Interface/TableColumns";
import TableComponent from "./TableComponent";

interface MyRoleBasedTableProps {
  jobs: TableColumns[];
  loading: boolean;
  error: string | null;
  isCollapsed: boolean;
  initialBillingFilter: string | null;
  userRole: string | null;
}

interface ColumnConfig {
  field: keyof TableColumns | "Action";
  headerName: string;
  width: string;
}

const fullColumnConfig: ColumnConfig[] = [
  { field: "slNo", headerName: "Sl No", width: "100px" },
  { field: "jobId", headerName: "Job ID", width: "150px" },
  { field: "jobDate", headerName: "Job Date", width: "160px" },
  { field: "category", headerName: "Category", width: "150px" },
  { field: "customerName", headerName: "Customer Name", width: "200px" },
  { field: "jobParticulars", headerName: "Job Particulars", width: "300px" },
  { field: "jobReference", headerName: "Job Reference", width: "200px" },
  { field: "boeSbNo", headerName: "BOE/SB No", width: "150px" },
  { field: "boeSbDate", headerName: "BOE/SB Date", width: "150px" },
  { field: "arrivalDate", headerName: "Arrival Date", width: "150px" },
  {
    field: "tentativeClosureDate",
    headerName: "Tentative Closure Date",
    width: "200px",
  },
  { field: "closedDate", headerName: "Closed Date", width: "150px" },
  { field: "sellingPrice", headerName: "Selling Price", width: "150px" },
  { field: "costPrice", headerName: "Cost Price", width: "150px" },
  { field: "billingStatus", headerName: "Billing Status", width: "200px" },
  { field: "invoiceNo", headerName: "Invoice No", width: "150px" },
  { field: "invoiceDate", headerName: "Invoice Date", width: "150px" },
  {
    field: "courierTrackingNo",
    headerName: "Courier Tracking No",
    width: "200px",
  },
  { field: "paymentStatus", headerName: "Payment Status", width: "150px" },
  { field: "remarks", headerName: "Remarks", width: "300px" },
  {
    field: "apekshaInvoiceNo",
    headerName: "Apeksha Invoice No",
    width: "200px",
  },
  { field: "dateOfCourier", headerName: "Date Of Courier", width: "150px" },
  { field: "updatedBy", headerName: "Updated By", width: "150px" },
  { field: "updatedAt", headerName: "Updated At", width: "200px" },
  { field: "Action", headerName: "Action", width: "220px" },
];

const roleBasedFields: Record<string, string[]> = {
  CRM: [
    "slNo",
    "jobId",
    "jobDate",
    "category",
    "customerName",
    "jobParticulars",
    "jobReference",
    "boeSbNo",
    "boeSbDate",
    "arrivalDate",
    "tentativeClosureDate",
    "closedDate",
    "sellingPrice",
    "billingStatus",
    "invoiceNo",
    "invoiceDate",
    "courierTrackingNo",
    "paymentStatus",
    "remarks",
    "apekshaInvoiceNo",
    "dateOfCourier",
    "updatedBy",
    "updatedAt",
    "Action",
  ],
  ADMIN: [
    "slNo",
    "jobId",
    "jobDate",
    "category",
    "customerName",
    "jobParticulars",
    "jobReference",
    "boeSbNo",
    "boeSbDate",
    "arrivalDate",
    "tentativeClosureDate",
    "closedDate",
    "sellingPrice",
    "costPrice",
    "billingStatus",
    "invoiceNo",
    "invoiceDate",
    "courierTrackingNo",
    "paymentStatus",
    "remarks",
    "apekshaInvoiceNo",
    "dateOfCourier",
    "updatedBy",
    "updatedAt",
    "Action",
  ],
  OPERATIONS: [
    "slNo",
    "jobId",
    "jobDate",
    "category",
    "customerName",
    "jobParticulars",
    "jobReference",
    "boeSbNo",
    "boeSbDate",
    "arrivalDate",
    "tentativeClosureDate",
    "closedDate",
    "sellingPrice",
    "billingStatus",
    "invoiceNo",
    "invoiceDate",
    "courierTrackingNo",
    "paymentStatus",
    "remarks",
    "apekshaInvoiceNo",
    "dateOfCourier",
    "updatedBy",
    "updatedAt",
    "Action",
  ],
  BILLING: [
    "slNo",
    "jobId",
    "jobDate",
    "category",
    "customerName",
    "jobParticulars",
    "jobReference",
    "boeSbNo",
    "boeSbDate",
    "arrivalDate",
    "tentativeClosureDate",
    "closedDate",
    "sellingPrice",
    "costPrice",
    "billingStatus",
    "invoiceNo",
    "invoiceDate",
    "courierTrackingNo",
    "paymentStatus",
    "remarks",
    "apekshaInvoiceNo",
    "dateOfCourier",
    "updatedBy",
    "updatedAt",
    "Action",
  ],
};

export default function MyRoleBasedTable({
  jobs,
  loading,
  error,
  isCollapsed,
  initialBillingFilter,
  userRole,
}: MyRoleBasedTableProps) {
  const allowedFields =
    userRole && roleBasedFields[userRole] ? roleBasedFields[userRole] : [];

  if (allowedFields.length === 0) {
    console.error("Invalid user role:", userRole);
    return (
      <Typography color="error">
        Please contact admin to assign a role.
      </Typography>
    );
  }

  const modifiedJobs = jobs.map((job) => {
    const filteredJob: Partial<TableColumns> = {};
    for (const field of allowedFields) {
      if (field === "Action") {
        continue; // Skip "Action", it's not part of TableColumns
      }
      if (field in job) {
        const typedField = field as keyof TableColumns;
        const value = job[typedField];
        if (value !== undefined && value !== null) {
          (filteredJob as any)[typedField] = value;
        }
      }
    }
    return filteredJob;
  });

  const dynamicColumnConfig: ColumnConfig[] = fullColumnConfig.filter(
    (config) => allowedFields.includes(config.field as string)
  );

  return (
    <TableComponent
      jobs={modifiedJobs as TableColumns[]}
      loading={loading}
      error={error}
      isCollapsed={isCollapsed}
      initialBillingFilter={initialBillingFilter}
      columnConfig={dynamicColumnConfig}
    />
  );
}
