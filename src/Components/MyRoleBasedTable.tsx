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
  const allowedFields = userRole ? roleBasedFields[userRole] : undefined;

  if (!allowedFields) {
    console.error("Invalid user role:", userRole);
    return <div>Please contact admin to assign a role.</div>;
  }

  // Filter the jobs based on allowed fields
  const modifiedJobs = jobs.map((job) => {
    const filteredJob: any = {};
    for (const field of allowedFields) {
      filteredJob[field] = job[field as keyof TableColumns];
    }
    return filteredJob;
  });
  console.log("Modified Jobs:", modifiedJobs);

  return (
    <TableComponent
      jobs={modifiedJobs}
      loading={loading}
      error={error}
      isCollapsed={isCollapsed}
      initialBillingFilter={initialBillingFilter}
    />
  );
}
