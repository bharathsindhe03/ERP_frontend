import { useState, useMemo, ReactNode } from "react";
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
const dropdownOptions: { [key: string]: string[] } = {
  billingStatus: ["Done","Job Closed","Open"]
  // Add more dropdown fields if needed
};


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

  const columnWidths: { [key: string]: string } = {
    slNo: "60px",
    jobId: "120px",
    jobDate: "140px",
    category: "150px",
    customerName: "200px",
    jobParticulars: "300px",
    jobReference: "200px",
    boeSbNo: "150px",
    boeSbDate: "150px",
    arrivalDate: "150px",
    tentativeClosureDate: "200px",
    closedDate: "150px",
    sellingPrice: "150px",
    billingStatus: "150px",
    invoiceNo: "150px",
    invoiceDate: "150px",
    courierTrackingNo: "200px",
    paymentStatus: "150px",
    remarks: "300px",
    apekshaInvoiceNo: "200px",
    dateOfCourier: "150px",
    updatedBy: "150px",
    updatedAt: "200px",
    Action: "120px",
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
                sx={{
                  position: "relative",
                  zIndex: 1,
                  border: "1px solid rgba(224, 224, 224, 1)",
                  tableLayout: "fixed",
                }}
              >
                <TableHead>
                  <TableRow>
                    {Object.entries(columnWidths).map(([key, width]) => (
                      <TableCell
                        key={key}
                        style={{
                          width: width,
                          border: "1px solid rgba(224, 224, 224, 1)",
                          position:
                            key === "slNo" || key === "jobId"
                              ? "sticky"
                              : "static",
                          left:
                            key === "slNo"
                              ? 0
                              : key === "jobId"
                              ? parseInt(columnWidths["slNo"])
                              : undefined,
                          background:
                            key === "slNo" || key === "jobId"
                              ? "#fff"
                              : undefined,
                          zIndex:
                            key === "slNo" || key === "jobId" ? 11 : undefined,
                        }}
                      >
                        {key === "billingStatus" ? (
                          <>
                            Billing Status
                            <IconButton
                              size="small"
                              onClick={(e) => handleFilterClick(e, setAnchorEl)}
                            >
                              <ArrowDropDownIcon />
                            </IconButton>
                          </>
                        ) : key === "jobId" ||
                          key === "jobDate" ||
                          key === "category" ||
                          key === "customerName" ? (
                          <>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleSort.handleSort(
                                  sortConfig,
                                  setSortConfig,
                                  key as keyof TableColumns
                                )
                              }
                            >
                              {sortConfig.key === key &&
                              sortConfig.direction === "ascending" ? (
                                <ArrowUpwardIcon />
                              ) : (
                                <ArrowDownwardIcon />
                              )}
                            </IconButton>
                          </>
                        ) : (
                          key.charAt(0).toUpperCase() + key.slice(1)
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedJobs
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((job) => (
                      <TableRow hover key={job.jobId}>
                        {Object.keys(columnWidths).map((key) => {
                          let cellContent: ReactNode =
                            job[key as keyof TableColumns];

                          if (key === "updatedAt" && job.updatedAt) {
                            cellContent = (
                              <>
                                <div>{job.updatedAt.split("T")[0]}</div>
                                <div>
                                  {job.updatedAt.split("T")[1].split(".")[0]}
                                </div>
                              </>
                            );
                          } else if (
                            isEditing === job.jobId &&
                            editableColumns.includes(key as keyof TableColumns)
                          ) {
                            if (key === "billingStatus") {
                              // Render dropdown for billingStatus
                              cellContent = (
                                <TextField
                                  select
                                  value={editedJob[key as keyof TableColumns] || ""}
                                  onChange={(e) =>
                                    handleInputChange(setEditedJob, key as keyof TableColumns, e.target.value)
                                  }
                                  size="small"
                                  fullWidth
                                >
                                  {dropdownOptions.billingStatus.map((status) => (
                                    <MenuItem key={status} value={status}>
                                      {status}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              );
                            } else {
                              // For other fields, just render the regular TextField
                              cellContent = (
                                <TextField
                                  value={editedJob[key as keyof TableColumns] || ""}
                                  onChange={(e) =>
                                    handleInputChange(setEditedJob, key as keyof TableColumns, e.target.value)
                                  }
                                  size="small"
                                />
                              );
                            }
                          } else if (key === "Action") {
                            cellContent =
                              isEditing === job.jobId ? (
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
                              );
                          }

                          return (
                            <TableCell
                              key={key}
                              style={{
                                border: "1px solid rgba(224, 224, 224, 1)",
                                position:
                                  key === "slNo" || key === "jobId"
                                    ? "sticky"
                                    : "static",
                                left:
                                  key === "slNo"
                                    ? 0
                                    : key === "jobId"
                                    ? parseInt(columnWidths["slNo"])
                                    : undefined,
                                background:
                                  key === "slNo" || key === "jobId"
                                    ? "#fff"
                                    : undefined,
                                zIndex:
                                  key === "slNo" || key === "jobId"
                                    ? 11
                                    : undefined,
                              }}
                            >
                              {cellContent}
                            </TableCell>
                          );
                        })}
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
