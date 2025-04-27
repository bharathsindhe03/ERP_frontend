import TableColumns from "../Interface/TableColumns";
import { updateJob } from "../Services/Jobs/update_job";
import { Dispatch, SetStateAction } from "react";

export const formatDate = (
  dateString: string | null | undefined
): string | undefined => {
  if (!dateString) return undefined;
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const handleEdit = (
  job: TableColumns,
  setIsEditing: Dispatch<SetStateAction<number | null>>,
  setEditedJob: Dispatch<SetStateAction<Partial<TableColumns>>>
) => {
  setIsEditing(job.jobId);
  setEditedJob({
    slNo: job.slNo,
    jobId: job.jobId,
    jobDate: job.jobDate,
    category: job.category,
    customerName: job.customerName,
    jobParticulars: job.jobParticulars,
    jobReference: job.jobReference,
    boeSbNo: job.boeSbNo,
    boeSbDate: job.boeSbDate,
    arrivalDate: job.arrivalDate,
    tentativeClosureDate: job.tentativeClosureDate,
    closedDate: job.closedDate,
    sellingPrice: job.sellingPrice,
    billingStatus: job.billingStatus,
    invoiceNo: job.invoiceNo,
    invoiceDate: job.invoiceDate,
    courierTrackingNo: job.courierTrackingNo,
    paymentStatus: job.paymentStatus,
    remarks: job.remarks,
    apekshaInvoiceNo: job.apekshaInvoiceNo,
    dateOfCourier: job.dateOfCourier,
  });
};

export const handleSave = async (
  editedJob: Partial<TableColumns>,
  setIsEditing: Dispatch<SetStateAction<number | null>>,
  setEditedJob: Dispatch<SetStateAction<Partial<TableColumns>>>
) => {
  const updatedJob: TableColumns = {
    slNo: Number(editedJob.slNo) ?? 0,
    jobId: Number(editedJob.jobId),
    jobDate: formatDate(editedJob.jobDate),
    category: editedJob.category,
    customerName: editedJob.customerName,
    jobParticulars: editedJob.jobParticulars,
    jobReference: editedJob.jobReference,
    boeSbNo: editedJob.boeSbNo,
    boeSbDate: formatDate(editedJob.boeSbDate),
    arrivalDate: formatDate(editedJob.arrivalDate),
    tentativeClosureDate: formatDate(editedJob.tentativeClosureDate),
    closedDate: formatDate(editedJob.closedDate),
    sellingPrice: editedJob.sellingPrice,
    billingStatus: editedJob.billingStatus,
    invoiceNo: editedJob.invoiceNo,
    invoiceDate: formatDate(editedJob.invoiceDate),
    courierTrackingNo: editedJob.courierTrackingNo,
    paymentStatus: editedJob.paymentStatus,
    remarks: editedJob.remarks,
    apekshaInvoiceNo: editedJob.apekshaInvoiceNo,
    dateOfCourier: formatDate(editedJob.dateOfCourier),
    action: null,
    updatedBy: null,
    updatedAt: null,
  };

  console.log("Calling updateJob with data:", updatedJob);

  try {
    await updateJob(updatedJob);
    setIsEditing(null);
    setEditedJob({});
  } catch (error) {
    console.error("Failed to update job", error);
  }
};

export const handleCancel = (
  setIsEditing: Dispatch<SetStateAction<number | null>>,
  setEditedJob: Dispatch<SetStateAction<Partial<TableColumns>>>
) => {
  setIsEditing(null);
  setEditedJob({});
};

export const handleInputChange = (
  setEditedJob: Dispatch<SetStateAction<Partial<TableColumns>>>,
  field: keyof TableColumns,
  value: string
) => {
  setEditedJob((prev) => ({ ...prev, [field]: value }));
};

export const handleSort = {
  sortString: (
    a: string | undefined,
    b: string | undefined,
    direction: "ascending" | "descending"
  ) => {
    if (!a) return direction === "ascending" ? 1 : -1;
    if (!b) return direction === "ascending" ? -1 : 1;
    return direction === "ascending" ? a.localeCompare(b) : b.localeCompare(a);
  },
  sortNumber: (
    a: number | undefined,
    b: number | undefined,
    direction: "ascending" | "descending"
  ) => {
    if (a === undefined) return direction === "ascending" ? 1 : -1;
    if (b === undefined) return direction === "ascending" ? -1 : 1;
    return direction === "ascending"
      ? (a || 0) - (b || 0)
      : (b || 0) - (a || 0);
  },
  handleSort: (
    sortConfig: {
      key: keyof TableColumns | null;
      direction: "ascending" | "descending" | null;
    },
    setSortConfig: Dispatch<
      SetStateAction<{
        key: keyof TableColumns | null;
        direction: "ascending" | "descending" | null;
      }>
    >,
    key: keyof TableColumns
  ) => {
    let direction: "ascending" | "descending" | null = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    setSortConfig({ key, direction });
  },
};

export const handleFilterClick = (
  event: React.MouseEvent<HTMLButtonElement>,
  setAnchorEl: Dispatch<SetStateAction<null | HTMLElement>>
) => {
  setAnchorEl(event.currentTarget);
};

export const handleFilterClose = (
  setAnchorEl: Dispatch<SetStateAction<null | HTMLElement>>
) => {
  setAnchorEl(null);
};

export const handleFilterSelect = (
  status: string,
  setBillingFilter: Dispatch<SetStateAction<string>>,
  setAnchorEl: Dispatch<SetStateAction<null | HTMLElement>>
) => {
  setBillingFilter(status);
  setAnchorEl(null);
};

export const handleChangePage = (
  _event: unknown,
  newPage: number,
  setPage: Dispatch<SetStateAction<number>>
) => {
  setPage(newPage);
};

export const handleChangeRowsPerPage = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setRowsPerPage: Dispatch<SetStateAction<number>>,
  setPage: Dispatch<SetStateAction<number>>
) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};

export const getEditableColumns = (
  userRole: string | null
): (keyof TableColumns)[] => {
  if (userRole === "ADMIN") {
    return [
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
    ];
  } else if (userRole === "CRM") {
    return ["jobId", "jobDate", "category", "customerName"];
  } else if (userRole === "BILLING") {
    return [
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
    ];
  }
  return [];
};
