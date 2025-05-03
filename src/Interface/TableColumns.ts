export default interface TableColumns {
  slNo: number;
  jobId: number | null;
  jobDate: string | null | undefined;
  category: string | null | undefined;
  customerName: string | null | undefined;
  jobParticulars: string | null | undefined;
  jobReference: string | null | undefined;
  boeSbNo: string | null | undefined;
  boeSbDate: string | null | undefined;
  arrivalDate: string | null | undefined;
  tentativeClosureDate: string | null | undefined;
  closedDate: string | null | undefined;
  sellingPrice: number | null | undefined;
  costPrice?: number | null;
  billingStatus: string | null | undefined;
  // invoiceNo: string | null | undefined;  // was never there
  invoiceDate: string | null | undefined;
  courierTrackingNo: string | null | undefined;
  paymentStatus: string | null | undefined;
  remarks: string | null | undefined;
  apekshaInvoiceNo: string | null | undefined;
  dateOfCourier: string | null | undefined;
  action: number | null;
  updatedBy: string | null | undefined;
  updatedAt: string | null | undefined;
  version?: number | null;
}
