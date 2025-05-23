import logo from "../assets/apeksha white text-02.png";
import { useState } from "react";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import WorkIcon from "@mui/icons-material/Work";
import AddIcon from "@mui/icons-material/Add";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddJob from "./forms/AddJob";
import Tooltip from "@mui/material/Tooltip";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import JobStatusDialog from "./forms/JobStatusDialogProps";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import UpdateJobStatusDialog from "./forms/UpdateJobStatusDialog";
interface TaskbarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  onJobAdded: () => void;
  onFilterChange: (filter: string | null) => void;
  onShowAllJobs: () => void;
  onShowCurrentJobs: () => void;
  onManageEmployeesClick: () => void;
}

export default function Taskbar({ isCollapsed, setIsCollapsed, onJobAdded, onShowAllJobs, onShowCurrentJobs, onManageEmployeesClick }: TaskbarProps) {
  const [showModal, setShowModal] = useState(false);
  const [isJobStatusDialogOpen, setIsJobStatusDialogOpen] = useState(false);
  const [isUpdateJobStatusDialogOpen, setIsUpdateJobStatusDialogOpen] = useState(false);
  const handleAddJobClick = () => {
    setShowModal(true);
  };

  const userRole = localStorage.getItem("role");
  const canAddJob = userRole === "ADMIN" || userRole === "CRM" || userRole === "OPERATIONS";
  const canManageEmployees = userRole === "ADMIN";
  const canUpdateJobStatus = userRole === "CRM" || userRole === "BILLING" || userRole === "OPERATIONS";
  return (
    <Box position="fixed" top={0} left={0} height="100vh" bgcolor="#111928" width={isCollapsed ? 60 : 200} zIndex={1000} component="nav">
      <IconButton
        onClick={() => setIsCollapsed(!isCollapsed)}
        sx={{
          position: "absolute",
          top: 16,
          right: -12,
          bgcolor: "white",
          color: "#111928",
          "&:hover": { bgcolor: "#f0f0f0" },
        }}
      >
        {isCollapsed ? <ChevronRightIcon fontSize="large" /> : <ChevronLeftIcon fontSize="large" />}
      </IconButton>

      <Box display="flex" justifyContent="center" py={3}>
        <img
          src={logo}
          alt="Logo"
          style={{
            width: isCollapsed ? "40px" : "150px", // Adjust width based on isCollapsed
            height: "auto",
            transition: "width 0.3s ease", // Smooth transition for resizing
          }}
        />
      </Box>

      <List sx={{ color: "white" }}>
        {canAddJob && (
          <Tooltip title="Add a new job" arrow placement="right">
            <ListItemButton component="li" onClick={handleAddJobClick}>
              <AddIcon sx={{ fontSize: 24 }} />
              {!isCollapsed && <ListItemText primary="Add Jobs" />}
            </ListItemButton>
          </Tooltip>
        )}
        <Tooltip title="View all jobs" arrow placement="right">
          <ListItemButton component="li" onClick={onShowAllJobs}>
            <WorkIcon sx={{ fontSize: 24 }} />
            {!isCollapsed && <ListItemText primary="Jobs" />}
          </ListItemButton>
        </Tooltip>
        <Tooltip title="View current jobs" arrow placement="right">
          <ListItemButton component="li" onClick={onShowCurrentJobs}>
            <WorkHistoryIcon sx={{ fontSize: 24 }} />
            {!isCollapsed && <ListItemText primary="Current Jobs" />}
          </ListItemButton>
        </Tooltip>
        {canManageEmployees && (
          <>
            <Tooltip title="Manage employees" arrow placement="right">
              <ListItemButton component="li" onClick={onManageEmployeesClick}>
                <ManageAccountsIcon sx={{ fontSize: 24 }} />
                {!isCollapsed && <ListItemText primary="Manage Employees" />}
              </ListItemButton>
            </Tooltip>
            <Tooltip title="Status of Job" arrow placement="right">
              <ListItemButton component="li" onClick={() => setIsJobStatusDialogOpen(true)}>
                <QuestionMarkIcon sx={{ fontSize: 24 }} />
                {!isCollapsed && <ListItemText primary="Job Status" />}
              </ListItemButton>
            </Tooltip>
          </>
        )}
        {canUpdateJobStatus && (
          <Tooltip title="Update Job Status" arrow placement="right">
            <ListItemButton component="li" onClick={() => setIsUpdateJobStatusDialogOpen(true)}>
              <UpgradeIcon sx={{ fontSize: 24 }} />
              {!isCollapsed && <ListItemText primary="Update Job Status" />}
            </ListItemButton>
          </Tooltip>
        )}
      </List>
      {showModal && <AddJob setShowModal={setShowModal} onJobAdded={onJobAdded} />}
      <JobStatusDialog open={isJobStatusDialogOpen} onClose={() => setIsJobStatusDialogOpen(false)} />
      <UpdateJobStatusDialog open={isUpdateJobStatusDialogOpen} onClose={() => setIsUpdateJobStatusDialogOpen(false)} />
    </Box>
  );
}
