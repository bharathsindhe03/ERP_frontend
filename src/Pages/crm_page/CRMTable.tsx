import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import CRMJob from "../../Interface/CRMJob";

interface CRMTableProps {
  jobs: CRMJob[];
  loading: boolean;
  error: string | null;
}

export default function CRMTable({ jobs, loading, error }: CRMTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="p-4 flex flex-col h-full">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600 text-center py-4">{error}</div>
      ) : (
        <Paper
          sx={{
            width: "100%",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            className="overflow-auto"
            style={{ maxHeight: "65vh", overflowX: "auto" }}
          >
            <TableContainer>
              <Table stickyHeader aria-label="CRM Table">
                <TableHead>
                  <TableRow>
                    {[
                      "Sl No",
                      "Job ID",
                      "Job Date",
                      "Category",
                      "Customer Name",
                      "Job Particulars",
                      "Job Reference",
                      "BOE/SB No",
                      "BOE/SB Date",
                      "Arrival Date",
                      "Tentative Closure Date",
                      "Closed Date",
                      "Selling Price",
                      "Billing Status",
                      "Invoice No",
                      "Invoice Date",
                      "Courier Tracking No",
                      "Payment Status",
                      "Remarks",
                      "Apeksha Invoice No",
                      "Date of Courier",
                      "Updated By",
                      "Updated At",
                      "Action",
                    ].map((header, index) => (
                      <TableCell key={index} sx={{ minWidth: 150 }}>
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {jobs
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((job, index) => (
                      <TableRow hover key={job.jobId}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{job.jobId}</TableCell>
                        <TableCell>{job.jobDate}</TableCell>
                        <TableCell>{job.category}</TableCell>
                        <TableCell>{job.customerName}</TableCell>
                        <TableCell>{job.jobParticulars}</TableCell>
                        <TableCell>{job.jobReference}</TableCell>
                        <TableCell>{job.boeSbNo}</TableCell>
                        <TableCell>{job.boeSbDate}</TableCell>
                        <TableCell>{job.arrivalDate}</TableCell>
                        <TableCell>{job.tentativeClosureDate}</TableCell>
                        <TableCell>{job.closedDate}</TableCell>
                        <TableCell>{job.sellingPrice}</TableCell>
                        <TableCell>{job.billingStatus}</TableCell>
                        <TableCell>{job.invoiceNo}</TableCell>
                        <TableCell>{job.invoiceDate}</TableCell>
                        <TableCell>{job.courierTrackingNo}</TableCell>
                        <TableCell>{job.paymentStatus}</TableCell>
                        <TableCell>{job.remarks}</TableCell>
                        <TableCell>{job.apekshaInvoiceNo}</TableCell>
                        <TableCell>{job.dateOfCourier}</TableCell>
                        <TableCell>{job.updatedBy}</TableCell>
                        <TableCell>{job.updatedAt}</TableCell>
                        <TableCell>
                          <Button variant="contained" color="primary">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={jobs.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </div>
  );
}
