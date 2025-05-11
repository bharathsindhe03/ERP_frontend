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
import FileDownloadIcon from "@mui/icons-material/FileDownload";
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
} from "../Services/Table/TableComponent";
import CircularProgress from "@mui/material/CircularProgress";
import UniversalDropdown from "./ui/UniversalDropdown";
import { fetchCategories } from "../Services/FieldOption/getFields";
import handleExcelDownload from "../Services/Table/ExcelDownload";
import { toast } from "sonner";

interface TableColumnProps {
  jobs: TableColumns[];
  loading: boolean;
  error: string | null;
  isCollapsed: boolean;
  initialBillingFilter?: string | null;
  columnConfig: {
    field: keyof TableColumns | "jobControls";
    headerName: string;
    width: string;
  }[];
}

export default function TableComponent({ jobs, loading, error, isCollapsed, initialBillingFilter, columnConfig }: TableColumnProps) {
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
    if (initialBillingFilter !== null && initialBillingFilter !== undefined) {
      setBillingFilter(initialBillingFilter);
    } else {
      setBillingFilter("All");
    }
  }, [initialBillingFilter]);

  const filteredJobs = useMemo(
    () => (billingFilter === "All" ? (Array.isArray(jobs) ? jobs : []) : Array.isArray(jobs) ? jobs.filter((job) => job.billingStatus === billingFilter) : []),
    [billingFilter, jobs]
  );

  const role = useMemo(() => localStorage.getItem("role"), []);
  const editableColumns = useMemo(() => getEditableColumns(role), [role]);
  const [billingFilterOptions, setBillingFilterOptions] = useState<string[]>([]);
  useEffect(() => {
    fetchCategories(setBillingFilterOptions, "billingstatus");
  }, []);
  const downloadExcel = (data: TableColumns[]) => {
    if (!data || data.length === 0) {
      console.error("No data available for download.");
      toast.error("No data available for download.");
      return;
    }
    handleExcelDownload(data);
  };
  const sortedJobs = useMemo(() => {
    if (sortConfig.key) {
      return [...filteredJobs].sort((a, b) => {
        const aValue = sortConfig.key ? a[sortConfig.key] : undefined;
        const bValue = sortConfig.key ? b[sortConfig.key] : undefined;

        if (typeof aValue === "number" || typeof bValue === "number") {
          return handleSort.sortNumber(aValue as number, bValue as number, sortConfig.direction || "ascending");
        } else {
          return handleSort.sortString(aValue as string, bValue as string, sortConfig.direction || "ascending");
        }
      });
    }
    return filteredJobs;
  }, [filteredJobs, sortConfig]);

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      ) : error ? (
        <Typography variant="body1" color="error" align="center" py={4}>
          Please check your internet connection and try again.
          <br />
          Or
          <br />
          Please Logout and login again.
        </Typography>
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            border: "1px solid rgba(224, 224, 224, 1)",
            borderRadius: 2,
            marginRight: isCollapsed ? "50px" : "200px",
            transition: "margin 0.3s ease",
            "@media (max-width: 1200px)": {
              marginRight: isCollapsed ? "30px" : "100px",
            },
            "@media (max-width: 768px)": {
              marginRight: isCollapsed ? "20px" : "50px",
            },
          }}
        >
          <Box sx={{ overflow: "auto", maxHeight: "65vh", flexGrow: 1 }}>
            <TableContainer component={Box} sx={{ minWidth: "100%", maxHeight: "65vh", overflow: "auto" }}>
              <Table stickyHeader aria-label="CRM Table" sx={{ tableLayout: "fixed" }}>
                <TableHead>
                  <TableRow
                    sx={{
                      position: "sticky",
                      top: 0,
                      background: "#fff",
                      zIndex: 12,
                    }}
                  >
                    {columnConfig.map((col, index) => (
                      <TableCell
                        key={index}
                        sx={{
                          width: col.width,
                          border: "1px solid rgba(224, 224, 224, 1)",
                          position: ["slNo", "jobId"].includes(col.field) ? "sticky" : "static",
                          left: col.field === "slNo" ? 0 : col.field === "jobId" ? columnConfig.filter((c) => c.field === "slNo").reduce((sum, c) => sum + parseInt(c.width), 0) : undefined,
                          background: ["slNo", "jobId"].includes(col.field) ? "#fff" : undefined,
                          zIndex: ["slNo", "jobId"].includes(col.field) ? 11 : undefined,
                        }}
                      >
                        {col.field === "billingStatus" ? (
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography>{col.headerName}</Typography>
                            <IconButton size="small" onClick={(e) => handleBillingFilterButtonClick(e, setAnchorEl)}>
                              <ArrowDropDownIcon />
                            </IconButton>
                          </Stack>
                        ) : ["slNo", "jobId", "jobDate", "category", "customerName"].includes(col.field as string) ? (
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography>{col.headerName}</Typography>
                            <IconButton size="small" onClick={() => handleSort.handleSort(sortConfig, setSortConfig, col.field as keyof TableColumns)}>
                              {sortConfig.key === col.field && sortConfig.direction === "ascending" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                            </IconButton>
                          </Stack>
                        ) : (
                          <Typography>{col.headerName}</Typography>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedJobs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((job, rowIndex) => {
                    const actualIndex = page * rowsPerPage + rowIndex;
                    return (
                      <TableRow hover key={actualIndex}>
                        {columnConfig.map((col) => {
                          const key = col.field;
                          let cellContent: ReactNode = job[key as keyof TableColumns];

                          if (key === "updatedAt" && job.updatedAt) {
                            const [date, time] = job.updatedAt.split("T");
                            cellContent = (
                              <Stack spacing={0.5}>
                                <Typography>{date}</Typography>
                                <Typography>{time.split(".")[0]}</Typography>
                              </Stack>
                            );
                          } else if (isEditing === actualIndex && editableColumns.includes(key as keyof TableColumns)) {
                            cellContent = ["arrivalDate", "tentativeClosureDate", "closedDate", "boeSbDate", "invoiceDate", "dateOfCourier", "clearanceDate", "dutyPaidDate", "jobDate"].includes(
                              key
                            ) ? (
                              <TextField
                                type="date" // Use text instead of date to display the raw value
                                value={editedJob[key as keyof TableColumns] || ""} // Display the date as it is
                                onChange={(e) =>
                                  handleInputChange(
                                    setEditedJob,
                                    key as keyof TableColumns,
                                    e.target.value // Store the raw value
                                  )
                                }
                                size="small"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                autoFocus
                              />
                            ) : key === "category" ? (
                              <UniversalDropdown label="Category" value={editedJob.category || ""} setValue={(val: string) => handleInputChange(setEditedJob, "category", val)} fieldName="category" />
                            ) : key === "billingStatus" ? (
                              <UniversalDropdown
                                label="Billing Status"
                                value={editedJob.billingStatus || ""}
                                setValue={(val: string) => handleInputChange(setEditedJob, "billingStatus", val)}
                                fieldName="billingstatus"
                              />
                            ) : key === "paymentStatus" ? (
                              <UniversalDropdown
                                label="Payment Status"
                                value={editedJob.paymentStatus || ""}
                                setValue={(val: string) => handleInputChange(setEditedJob, "paymentStatus", val)}
                                fieldName="paymentstatus"
                              />
                            ) : (
                              <TextField
                                value={editedJob[key as keyof TableColumns] || ""}
                                onChange={(e) => handleInputChange(setEditedJob, key as keyof TableColumns, e.target.value)}
                                size="small"
                                fullWidth
                              />
                            );
                          } else if (key === "jobControls") {
                            cellContent =
                              isEditing === actualIndex ? (
                                <Stack direction="row" spacing={1}>
                                  <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => {
                                      console.log("ediited", editedJob);
                                      handleSave(editedJob, setIsEditing, setEditedJob);
                                      setIsEditing(null);
                                    }}
                                  >
                                    Save
                                  </Button>
                                  <Button variant="outlined" color="error" onClick={() => handleCancel(setIsEditing, setEditedJob)}>
                                    Cancel
                                  </Button>
                                </Stack>
                              ) : (
                                <Button
                                  variant="contained"
                                  onClick={() => {
                                    handleEdit(job, setIsEditing, setEditedJob);
                                    setIsEditing(actualIndex);
                                  }}
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
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                                overflowWrap: "break-word",
                                position: key === "slNo" || key === "jobId" ? "sticky" : "static",
                                left: key === "slNo" ? 0 : key === "jobId" ? columnConfig.filter((c) => c.field === "slNo").reduce((sum, c) => sum + parseInt(c.width), 0) : undefined,
                                background: key === "slNo" || key === "jobId" ? "#fff" : undefined,
                                zIndex: key === "slNo" || key === "jobId" ? 11 : undefined,
                              }}
                            >
                              {cellContent}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid rgba(224, 224, 224, 1)",
              backgroundColor: "#fff",
              padding: "8px 16px",
            }}
          >
            <IconButton
              onClick={() => downloadExcel(jobs)} // Call the simplified function
              sx={{ padding: "8px" }} // Optional: Adjust padding for better spacing
            >
              <FileDownloadIcon />
            </IconButton>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={jobs.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event, newPage) => handleChangePage(event, newPage, setPage)}
              onRowsPerPageChange={(event) => handleChangeRowsPerPage(event, setRowsPerPage, setPage)}
            />
          </Box>
        </Box>
      )}
      <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => handleBillingFilterClose(setAnchorEl)} anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
        <MenuList>
          {billingFilterOptions.map((option) => (
            <MenuItem key={option} onClick={() => handleBillingFilterSelect(option, setBillingFilter, setAnchorEl)}>
              {option}
            </MenuItem>
          ))}
        </MenuList>
      </Popover>
    </Box>
  );
}
