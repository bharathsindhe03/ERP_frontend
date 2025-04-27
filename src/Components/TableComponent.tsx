import { useState, useMemo, ReactNode, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import TableColumns from "../Interface/TableColumns";
import { 
  handleAddNewCategory, fetchCategories, handleDeleteCategory 
} 
from "../Services/FieldOption/index";
import {
  handleEdit,
  handleSave,
  handleCancel,
  handleInputChange,
  handleSort,
  handleFilterClick as handleBillingFilterButtonClick,
  handleFilterClose as handleBillingFilterClose,
  handleFilterSelect as handleBillingFilterSelect,
  handleChangePage,
  handleChangeRowsPerPage,
  getEditableColumns,
} from "../Utils/TableComponent";
import CircularProgress from "@mui/material/CircularProgress";


interface TableColumnProps {
  jobs: TableColumns[];
  loading: boolean;
  error: string | null;
  isCollapsed: boolean;
  initialBillingFilter?: string | null;
}
interface BillingStatusSelectorProps {
  billingStatus: string;
  setBillingStatus: (value: string) => void;
  billingStatusOptions: string[];
  setBillingStatusOptions: React.Dispatch<React.SetStateAction<string[]>>;
}
const dropdownOptions: { [key: string]: string[] } = {
  billingStatus: ["Done", "Job Closed", "Open"],
};

export default function TableComponent({
  jobs,
  loading,
  error,
  isCollapsed,
  initialBillingFilter,
}: TableColumnProps) {
  console.log("initialBillingFilter in TableComponent:", initialBillingFilter);

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

  useEffect(() => {
    if (initialBillingFilter !== undefined) {
      setBillingFilter("All");
    }
  }, [initialBillingFilter]);

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
    billingStatus: "200px",
    invoiceNo: "150px",
    invoiceDate: "150px",
    courierTrackingNo: "200px",
    paymentStatus: "150px",
    remarks: "300px",
    apekshaInvoiceNo: "200px",
    dateOfCourier: "150px",
    updatedBy: "150px",
    updatedAt: "200px",
    Action: "220px",
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {loading ? (
        <CircularProgress color="inherit" />
      ) : error ? (
        <Typography variant="body1" color="error" align="center" py={4}>
          Please check your internet connection and try again.
          <br />
          Please Logout and login again.
        </Typography>
      ) : (
        <Box
          sx={{
            width: "100%",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            border: "1px solid rgba(224, 224, 224, 1)", // Added border here
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              overflow: "auto",
              maxHeight: "65vh",
              overflowX: "auto",
              marginRight: isCollapsed ? "0px" : "150px",
            }}
          >
            <TableContainer sx={{ minWidth: "100%" }}>
              <Table
                stickyHeader
                aria-label="CRM Table"
                sx={{ tableLayout: "fixed" }}
              >
                <TableHead>
                  <TableRow>
                    {Object.entries(columnWidths).map(([key, width]) => (
                      <TableCell
                        key={key}
                        sx={{
                          width,
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
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <Typography>Billing Status</Typography>
                            <IconButton
                              size="small"
                              onClick={(e) =>
                                handleBillingFilterButtonClick(e, setAnchorEl)
                              }
                            >
                              <ArrowDropDownIcon />
                            </IconButton>
                          </Stack>
                        ) : [
                            "jobId",
                            "jobDate",
                            "category",
                            "customerName",
                          ].includes(key) ? (
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <Typography>
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </Typography>
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
                          </Stack>
                        ) : (
                          <Typography>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </Typography>
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
                            const [date, time] = job.updatedAt.split("T");
                            cellContent = (
                              <Stack spacing={0.5}>
                                <Typography>{date}</Typography>
                                <Typography>{time.split(".")[0]}</Typography>
                              </Stack>
                            );
                          } else if (
                            isEditing === job.jobId &&
                            editableColumns.includes(key as keyof TableColumns)
                          ) {
                            cellContent =
                              key === "billingStatus" ? (
                                <TextField
                                  select
                                  value={
                                    editedJob[key as keyof TableColumns] || ""
                                  }
                                  onChange={(e) =>
                                    handleInputChange(
                                      setEditedJob,
                                      key as keyof TableColumns,
                                      e.target.value
                                    )
                                  }
                                  size="small"
                                  fullWidth
                                >
                                  {dropdownOptions.billingStatus.map(
                                    (status) => (
                                      <MenuItem key={status} value={status}>
                                        {status}
                                      </MenuItem>
                                    )
                                  )}
                                </TextField>
                              ) : (
                                <TextField
                                  value={
                                    editedJob[key as keyof TableColumns] || ""
                                  }
                                  onChange={(e) =>
                                    handleInputChange(
                                      setEditedJob,
                                      key as keyof TableColumns,
                                      e.target.value
                                    )
                                  }
                                  size="small"
                                  fullWidth
                                />
                              );
                          } else if (key === "Action") {
                            cellContent =
                              isEditing === job.jobId ? (
                                <Stack direction="row" spacing={1}>
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
                                  >
                                    Save
                                  </Button>
                                  <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() =>
                                      handleCancel(setIsEditing, setEditedJob)
                                    }
                                  >
                                    Cancel
                                  </Button>
                                </Stack>
                              ) : (
                                <Button
                                  variant="contained"
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
                              sx={{
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
          </Box>
          <TablePagination
            sx={{
              px: 2,
              mt: 1,
              borderTop: "1px solid rgba(224, 224, 224, 1)",
              borderLeft: "1px solid rgba(224, 224, 224, 1)",
              borderRight: isCollapsed
                ? "1px solid rgba(224, 224, 224, 1)"
                : `1px solid rgba(224, 224, 224, 1)`,
              borderBottomLeftRadius: 2,
              borderBottomRightRadius: 2,
              mr: isCollapsed ? "0px" : "150px",
            }}
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
        </Box>
      )}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => handleBillingFilterClose(setAnchorEl)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <MenuList>
          <MenuItem
            onClick={() =>
              handleBillingFilterSelect("All", setBillingFilter, setAnchorEl)
            }
          >
            All
          </MenuItem>
          <MenuItem
            onClick={() =>
              handleBillingFilterSelect("Done", setBillingFilter, setAnchorEl)
            }
          >
            Done
          </MenuItem>
          <MenuItem
            onClick={() =>
              handleBillingFilterSelect(
                "Job Closed",
                setBillingFilter,
                setAnchorEl
              )
            }
          >
            Job Closed
          </MenuItem>
          <MenuItem
            onClick={() =>
              handleBillingFilterSelect("Open", setBillingFilter, setAnchorEl)
            }
          >
            Open
          </MenuItem>
        </MenuList>
      </Popover>
    </Box>
  );
}
