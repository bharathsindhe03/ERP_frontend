import { useState, useMemo } from "react";
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
import TableColumns from "../Interface/TableColumns";
import { IconButton } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import {
  handleEdit,
  handleSave,
  handleCancel,
  handleInputChange,
  handleSort,
  handleFilterClick,
  handleFilterClose,
  handleFilterSelect,
  handleChangePage,
  handleChangeRowsPerPage,
  getEditableColumns,
} from "../Utils/TableComponent";

interface TableColumnProps {
  jobs: TableColumns[];
  loading: boolean;
  error: string | null;
  isCollapsed: boolean;
}

export default function TableComponent({
  jobs,
  loading,
  error,
  isCollapsed,
}: TableColumnProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editedJob, setEditedJob] = useState<Partial<TableColumns>>({});
  const [billingFilter, setBillingFilter] = useState<string>("All");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof TableColumns | null;
    direction: "ascending" | "descending" | null;
  }>({ key: null, direction: null });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const filteredJobs = useMemo(
    () =>
      billingFilter === "All"
        ? jobs
        : jobs.filter((job) => job.billingStatus === billingFilter),
    [billingFilter, jobs]
  );

  const role = useMemo(() => localStorage.getItem("role"), []);
  const editableColumns = useMemo(() => getEditableColumns(role), [role]);

  const sortedJobs = useMemo(() => {
    if (sortConfig.key) {
      return [...filteredJobs].sort((a, b) => {
        const aValue = sortConfig.key ? a[sortConfig.key] : undefined;
        const bValue = sortConfig.key ? b[sortConfig.key] : undefined;

        if (typeof aValue === "number" || typeof bValue === "number") {
          return handleSort.sortNumber(
            aValue as number,
            bValue as number,
            sortConfig.direction || "ascending"
          );
        } else {
          return handleSort.sortString(
            aValue as string,
            bValue as string,
            sortConfig.direction || "ascending"
          );
        }
      });
    }
    return filteredJobs;
  }, [filteredJobs, sortConfig]);

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
            style={{
              maxHeight: "65vh",
              overflowX: "auto",
              marginRight: isCollapsed ? "0px" : "150px",
            }}
          >
            <TableContainer sx={{ zIndex: 10, minWidth: "100%" }}>
              <Table
                stickyHeader
                aria-label="CRM Table"
                sx={{ position: "relative", zIndex: 1 }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ minWidth: 150 }}>Sl No</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>
                      Job ID
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleSort.handleSort(
                            sortConfig,
                            setSortConfig,
                            "jobId"
                          )
                        }
                      >
                        {sortConfig.key === "jobId" &&
                        sortConfig.direction === "ascending" ? (
                          <ArrowUpwardIcon />
                        ) : (
                          <ArrowDownwardIcon />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell sx={{ minWidth: 150 }}>
                      Job Date
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleSort.handleSort(
                            sortConfig,
                            setSortConfig,
                            "jobDate"
                          )
                        }
                      >
                        {sortConfig.key === "jobDate" &&
                        sortConfig.direction === "ascending" ? (
                          <ArrowUpwardIcon />
                        ) : (
                          <ArrowDownwardIcon />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell sx={{ minWidth: 150 }}>
                      Category
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleSort.handleSort(
                            sortConfig,
                            setSortConfig,
                            "category"
                          )
                        }
                      >
                        {sortConfig.key === "category" &&
                        sortConfig.direction === "ascending" ? (
                          <ArrowUpwardIcon />
                        ) : (
                          <ArrowDownwardIcon />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell sx={{ minWidth: 150 }}>
                      Customer Name
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleSort.handleSort(
                            sortConfig,
                            setSortConfig,
                            "customerName"
                          )
                        }
                      >
                        {sortConfig.key === "customerName" &&
                        sortConfig.direction === "ascending" ? (
                          <ArrowUpwardIcon />
                        ) : (
                          <ArrowDownwardIcon />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell sx={{ minWidth: 150 }}>
                      Job Particulars
                    </TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Job Reference</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>BOE/SB No</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>BOE/SB Date</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Arrival Date</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>
                      Tentative Closure Date
                    </TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Closed Date</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Selling Price</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>
                      Billing Status
                      <IconButton
                        size="small"
                        onClick={(e) => handleFilterClick(e, setAnchorEl)}
                      >
                        <ArrowDropDownIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Invoice No</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Invoice Date</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>
                      Courier Tracking No
                    </TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Payment Status</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Remarks</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>
                      Apeksha Invoice No
                    </TableCell>
                    <TableCell sx={{ minWidth: 150 }}>
                      Date of Courier
                    </TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Updated By</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Updated At</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedJobs
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((job) => (
                      <TableRow hover key={job.jobId}>
                        <TableCell>{job.slNo}</TableCell>
                        <TableCell>
                          {isEditing === job.jobId &&
                          editableColumns.includes("jobId") ? (
                            <TextField
                              value={editedJob.jobId || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  setEditedJob,
                                  "jobId",
                                  e.target.value
                                )
                              }
                              size="small"
                            />
                          ) : (
                            job.jobId
                          )}
                        </TableCell>
                        <TableCell>
                          {isEditing === job.jobId &&
                          editableColumns.includes("jobDate") ? (
                            <TextField
                              type="date"
                              value={editedJob.jobDate || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  setEditedJob,
                                  "jobDate",
                                  e.target.value
                                )
                              }
                              size="small"
                            />
                          ) : (
                            job.jobDate
                          )}
                        </TableCell>
                        <TableCell>
                          {isEditing === job.jobId &&
                          editableColumns.includes("category") ? (
                            <TextField
                              value={editedJob.category || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  setEditedJob,
                                  "category",
                                  e.target.value
                                )
                              }
                              size="small"
                            />
                          ) : (
                            job.category
                          )}
                        </TableCell>
                        <TableCell>
                          {isEditing === job.jobId &&
                          editableColumns.includes("customerName") ? (
                            <TextField
                              value={editedJob.customerName || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  setEditedJob,
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
                        <TableCell>
                          {isEditing === job.jobId &&
                          editableColumns.includes("jobParticulars") ? (
                            <TextField
                              value={editedJob.jobParticulars || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  setEditedJob,
                                  "jobParticulars",
                                  e.target.value
                                )
                              }
                              size="small"
                            />
                          ) : (
                            job.jobParticulars
                          )}
                        </TableCell>
                        <TableCell>
                          {isEditing === job.jobId &&
                          editableColumns.includes("jobReference") ? (
                            <TextField
                              value={editedJob.jobReference || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  setEditedJob,
                                  "jobReference",
                                  e.target.value
                                )
                              }
                              size="small"
                            />
                          ) : (
                            job.jobReference
                          )}
                        </TableCell>
                        <TableCell>
                          {isEditing === job.jobId &&
                          editableColumns.includes("boeSbNo") ? (
                            <TextField
                              value={editedJob.boeSbNo || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  setEditedJob,
                                  "boeSbNo",
                                  e.target.value
                                )
                              }
                              size="small"
                            />
                          ) : (
                            job.boeSbNo
                          )}
                        </TableCell>
                        <TableCell>
                          {isEditing === job.jobId &&
                          editableColumns.includes("boeSbDate") ? (
                            <TextField
                              type="date"
                              value={editedJob.boeSbDate || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  setEditedJob,
                                  "boeSbDate",
                                  e.target.value
                                )
                              }
                              size="small"
                            />
                          ) : (
                            job.boeSbDate
                          )}
                        </TableCell>
                        <TableCell>
                          {isEditing === job.jobId &&
                          editableColumns.includes("arrivalDate") ? (
                            <TextField
                              type="date"
                              value={editedJob.arrivalDate || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  setEditedJob,
                                  "arrivalDate",
                                  e.target.value
                                )
                              }
                              size="small"
                            />
                          ) : (
                            job.arrivalDate
                          )}
                        </TableCell>
                        <TableCell>
                          {isEditing === job.jobId &&
                          editableColumns.includes("tentativeClosureDate") ? (
                            <TextField
                              type="date"
                              value={editedJob.tentativeClosureDate || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  setEditedJob,
                                  "tentativeClosureDate",
                                  e.target.value
                                )
                              }
                              size="small"
                            />
                          ) : (
                            job.tentativeClosureDate
                          )}
                        </TableCell>
                        <TableCell>
                          {isEditing === job.jobId &&
                          editableColumns.includes("closedDate") ? (
                            <TextField
                              type="date"
                              value={editedJob.closedDate || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  setEditedJob,
                                  "closedDate",
                                  e.target.value
                                )
                              }
                              size="small"
                            />
                          ) : (
                            job.closedDate
                          )}
                        </TableCell>
                        <TableCell>
                          {isEditing === job.jobId &&
                          editableColumns.includes("sellingPrice") ? (
                            <TextField
                              value={editedJob.sellingPrice || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  setEditedJob,
                                  "sellingPrice",
                                  e.target.value
                                )
                              }
                              size="small"
                            />
                          ) : (
                            job.sellingPrice
                          )}
                        </TableCell>
                        <TableCell>
                          {isEditing === job.jobId &&
                          editableColumns.includes("billingStatus") ? (
                            <TextField
                              value={editedJob.billingStatus || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  setEditedJob,
                                  "billingStatus",
                                  e.target.value
                                )
                              }
                              size="small"
                            />
                          ) : (
                            job.billingStatus
                          )}
                        </TableCell>
                        <TableCell>
                          {isEditing === job.jobId &&
                          editableColumns.includes("invoiceNo") ? (
                            <TextField
                              value={editedJob.invoiceNo || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  setEditedJob,
                                  "invoiceNo",
                                  e.target.value
                                )
                              }
                              size="small"
                            />
                          ) : (
                            job.invoiceNo
                          )}
                        </TableCell>
                        <TableCell>
                          {isEditing === job.jobId &&
                          editableColumns.includes("invoiceDate") ? (
                            <TextField
                              type="date"
                              value={editedJob.invoiceDate || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  setEditedJob,
                                  "invoiceDate",
                                  e.target.value
                                )
                              }
                              size="small"
                            />
                          ) : (
                            job.invoiceDate
                          )}
                        </TableCell>
                        <TableCell>
                          {isEditing === job.jobId &&
                          editableColumns.includes("courierTrackingNo") ? (
                            <TextField
                              value={editedJob.courierTrackingNo || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  setEditedJob,
                                  "courierTrackingNo",
                                  e.target.value
                                )
                              }
                              size="small"
                            />
                          ) : (
                            job.courierTrackingNo
                          )}
                        </TableCell>
                        <TableCell>
                          {isEditing === job.jobId &&
                          editableColumns.includes("paymentStatus") ? (
                            <TextField
                              value={editedJob.paymentStatus || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  setEditedJob,
                                  "paymentStatus",
                                  e.target.value
                                )
                              }
                              size="small"
                            />
                          ) : (
                            job.paymentStatus
                          )}
                        </TableCell>
                        <TableCell>
                          {isEditing === job.jobId &&
                          editableColumns.includes("remarks") ? (
                            <TextField
                              value={editedJob.remarks || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  setEditedJob,
                                  "remarks",
                                  e.target.value
                                )
                              }
                              size="small"
                            />
                          ) : (
                            job.remarks
                          )}
                        </TableCell>
                        <TableCell>
                          {isEditing === job.jobId &&
                          editableColumns.includes("apekshaInvoiceNo") ? (
                            <TextField
                              value={editedJob.apekshaInvoiceNo || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  setEditedJob,
                                  "apekshaInvoiceNo",
                                  e.target.value
                                )
                              }
                              size="small"
                            />
                          ) : (
                            job.apekshaInvoiceNo
                          )}
                        </TableCell>
                        <TableCell>
                          {isEditing === job.jobId &&
                          editableColumns.includes("dateOfCourier") ? (
                            <TextField
                              type="date"
                              value={editedJob.dateOfCourier || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  setEditedJob,
                                  "dateOfCourier",
                                  e.target.value
                                )
                              }
                              size="small"
                            />
                          ) : (
                            job.dateOfCourier
                          )}
                        </TableCell>
                        <TableCell>{job.updatedBy}</TableCell>
                        <TableCell>
                          {job.updatedAt ? (
                            <>
                              <div>{job.updatedAt.split("T")[0]}</div>
                              <div>
                                {job.updatedAt.split("T")[1].split(".")[0]}
                              </div>
                            </>
                          ) : (
                            "N/A"
                          )}
                        </TableCell>
                        <TableCell>
                          {isEditing === job.jobId ? (
                            <>
                              <Button
                                variant="contained"
                                color="success"
                                onClick={() =>
                                  handleSave(
                                    editedJob,
                                    setIsEditing,
                                    setEditedJob
                                  )
                                }
                                sx={{ mr: 1 }}
                              >
                                Save
                              </Button>
                              <Button
                                variant="contained"
                                color="error"
                                onClick={() =>
                                  handleCancel(setIsEditing, setEditedJob)
                                }
                              >
                                Cancel
                              </Button>
                            </>
                          ) : (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() =>
                                handleEdit(job, setIsEditing, setEditedJob)
                              }
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
            style={{ marginRight: isCollapsed ? "40px" : "180px" }}
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={jobs.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) =>
              handleChangePage(event, newPage, setPage)
            }
            onRowsPerPageChange={(event) =>
              handleChangeRowsPerPage(event, setRowsPerPage, setPage)
            }
          />
        </Paper>
      )}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => handleFilterClose(setAnchorEl)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MenuList>
          <MenuItem
            onClick={() =>
              handleFilterSelect("All", setBillingFilter, setAnchorEl)
            }
          >
            All
          </MenuItem>
          <MenuItem
            onClick={() =>
              handleFilterSelect("Done", setBillingFilter, setAnchorEl)
            }
          >
            Done
          </MenuItem>
        </MenuList>
      </Popover>
    </div>
  );
}
