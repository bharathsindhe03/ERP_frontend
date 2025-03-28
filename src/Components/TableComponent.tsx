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
import TextField from "@mui/material/TextField";
import CRMJob from "../Interface/CRMJob";
import { updateJob } from "../Services/crm_page/update_job";
import { IconButton } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

interface CRMTableProps {
  jobs: CRMJob[];
  loading: boolean;
  error: string | null;
}

export default function TableComponent({
  jobs,
  loading,
  error,
}: CRMTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editedJob, setEditedJob] = useState<Partial<CRMJob>>({});
  const [billingFilter, setBillingFilter] = useState<string>("All");

  // Popover State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Open popover on button click
  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Close popover
  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  // Handle filter selection
  const handleFilterSelect = (status: string) => {
    setBillingFilter(status);
    setAnchorEl(null); // Close popover after selection
  };

  // Filter jobs based on billing status
  const filteredJobs =
    billingFilter === "All" ? jobs : jobs.filter((job) => job.billingStatus === billingFilter);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (job: CRMJob) => {
    setIsEditing(job.jobId);
    setEditedJob({
      slNo: job.slNo,
      jobId: job.jobId,
      jobDate: job.jobDate,
      category: job.category,
      customerName: job.customerName,
    });
  };

  const formatDate = (dateString: string | undefined): string | undefined => {
    if (!dateString) return undefined;
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSave = async () => {
    if (!editedJob.jobId || editedJob.slNo === undefined) {
      console.error("Missing required fields:", editedJob);
      return;
    }

    const updatedJob = {
      slNo: editedJob.slNo,
      jobId: Number(editedJob.jobId),
      jobDate: formatDate(editedJob.jobDate),
      category: editedJob.category,
      customerName: editedJob.customerName,
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

  const handleCancel = () => {
    setIsEditing(null);
    setEditedJob({});
  };

  const handleInputChange = (field: keyof CRMJob, value: string) => {
    setEditedJob((prev) => ({ ...prev, [field]: value }));
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
            <TableContainer sx={{ zIndex: 10 }}>
              <Table
                stickyHeader
                aria-label="CRM Table"
                sx={{ position: "relative", zIndex: 1 }}
              >
                <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 150 }}>Sl No</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>Job ID</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>Job Date</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>Category</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>Customer Name</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>Job Particulars</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>Job Reference</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>BOE/SB No</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>BOE/SB Date</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>Arrival Date</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>Tentative Closure Date</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>Closed Date</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>Selling Price</TableCell>
                  <TableCell sx={{ minWidth: 150}}>
                  Billing Status<IconButton size="small" onClick={handleFilterClick} >
                    <ArrowDropDownIcon />
                  </IconButton>
                  </TableCell>

                  <TableCell sx={{ minWidth: 150 }}>Invoice No</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>Invoice Date</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>Courier Tracking No</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>Payment Status</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>Remarks</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>Apeksha Invoice No</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>Date of Courier</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>Updated By</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>Updated At</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>Action</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                  {jobs
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((job, index) => (
                      <TableRow hover key={job.jobId}>
                        <TableCell>{index + 1}</TableCell>

                        {/* Job ID (Editable) */}
                        <TableCell>
                          {isEditing === job.jobId ? (
                            <TextField
                              value={editedJob.jobId || ""}
                              onChange={(e) =>
                                handleInputChange("jobId", e.target.value)
                              }
                              size="small"
                            />
                          ) : (
                            job.jobId
                          )}
                        </TableCell>

                        {/* Job Date (Editable) */}
                        <TableCell>
                          {isEditing === job.jobId ? (
                            <TextField
                              type="date"
                              value={editedJob.jobDate || ""}
                              onChange={(e) =>
                                handleInputChange("jobDate", e.target.value)
                              }
                              size="small"
                            />
                          ) : (
                            job.jobDate
                          )}
                        </TableCell>

                        {/* Category (Editable) */}
                        <TableCell>
                          {isEditing === job.jobId ? (
                            <TextField
                              value={editedJob.category || ""}
                              onChange={(e) =>
                                handleInputChange("category", e.target.value)
                              }
                              size="small"
                            />
                          ) : (
                            job.category
                          )}
                        </TableCell>

                        {/* Customer Name (Editable) */}
                        <TableCell>
                          {isEditing === job.jobId ? (
                            <TextField
                              value={editedJob.customerName || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  "customerName",
                                  e.target.value
                                )
                              }
                              size="small"
                            />
                          ) : (
                            job.customerName
                          )}
                        </TableCell>

                        {/* Non-Editable Fields */}
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
                        <TableCell>
                        {job.updatedAt ? (
                          <>
                            <div>{job.updatedAt.split("T")[0]}</div> {/* Date */}
                            <div>{job.updatedAt.split("T")[1].split(".")[0]}</div> {/* Time */}
                          </>
                        ) : (
                          "N/A"
                        )}
                      </TableCell>


                        {/* Action Buttons */}
                        <TableCell>
                          {isEditing === job.jobId ? (
                            <>
                              <Button
                                variant="contained"
                                color="success"
                                onClick={handleSave}
                                sx={{ mr: 1 }}
                              >
                                Save
                              </Button>
                              <Button
                                variant="contained"
                                color="error"
                                onClick={handleCancel}
                              >
                                Cancel
                              </Button>
                            </>
                          ) : (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleEdit(job)}
                            >
                              Edit
                            </Button>
                          )}
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
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleFilterClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MenuList>
          <MenuItem onClick={() => handleFilterSelect("All")}>All</MenuItem>
          <MenuItem onClick={() => handleFilterSelect("Done")}>Done</MenuItem>
          <MenuItem onClick={() => handleFilterSelect("Job Closed")}>Job Closed</MenuItem>
          <MenuItem onClick={() => handleFilterSelect("Custom Process")}>Custom Process</MenuItem>
        </MenuList>
      </Popover>
    </div>
  );
}
