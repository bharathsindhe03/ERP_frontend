export interface JobRecord {
  slNo: number;
  customerName: string;
  jobNo: string;
  jobDate: string;
  category: string;
  jobParticulars: string;
  jobReference: string;
  billOfEntryOrShippingBillNo?: string;
  boeOrSbDate?: string;
  arrivalDate?: string;
  dutyPaidDate?: string;
  currentStatus: string;
  clearanceDate?: string;
  noOfDays?: number;
  action: string;
  tentativeDateOfClosure?: string;
  closedDate?: string;
  remarks?: string;
  billingStatus: string;
  apekshaInvoiceNo: string;
  invDate: string;
  dateOfCourier?: string;
  dtdcCourierTrackingNo?: string;
  paymentStatus: string;
  remarksFromSiddhesh?: string;
}
