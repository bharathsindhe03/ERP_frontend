import logo from "../assets/apeksha white text-02.png";
import { useState } from "react";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import WorkIcon from "@mui/icons-material/Work";
import AddIcon from "@mui/icons-material/Add";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import {
  Box,
  IconButton,
  List,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import AddJob from "./AddJob";
import { userInfo } from "os";

interface TaskbarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  onJobAdded: () => void;
  onFilterChange: (filter: string | null) => void;
}

export default function Taskbar({
  isCollapsed,
  setIsCollapsed,
  onJobAdded,
  onFilterChange,
}: TaskbarProps) {
  const [showModal, setShowModal] = useState(false);

  const handleCurrentJobsClick = () => {
    onFilterChange("Open");
  };
  const userRole = localStorage.getItem("role");
  const canAddJob = userRole === "ADMIN" || userRole === "CRM";
  const canManageEmployees = userRole === "ADMIN";

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      height="100vh"
      bgcolor="#111928"
      width={isCollapsed ? 60 : 200}
      zIndex={1000}
      component="nav"
    >
      {/* Toggle Button */}
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
        {isCollapsed ? (
          <FiChevronRight size={24} />
        ) : (
          <FiChevronLeft size={24} />
        )}
      </IconButton>

      {/* Logo */}
      <Box display="flex" justifyContent="center" py={3}>
        <img src={logo} alt="Logo" style={{ width: "150px", height: "auto" }} />
      </Box>

      {/* Sidebar Links */}
      <List sx={{ color: "white" }}>
        {/* All Roles: Jobs */}
        <ListItemButton component="li">
          <WorkIcon sx={{ fontSize: 24 }} />
          {!isCollapsed && <ListItemText primary="Jobs" />}
        </ListItemButton>

        {/* All Roles: Current Jobs */}
        <ListItemButton component="li" onClick={handleCurrentJobsClick}>
          <WorkHistoryIcon sx={{ fontSize: 24 }} />
          {!isCollapsed && <ListItemText primary="Current Jobs" />}
        </ListItemButton>

        {/* Admin + CRM: Add Job */}
        {canAddJob && (
          <ListItemButton component="li" onClick={() => setShowModal(true)}>
            <AddIcon sx={{ fontSize: 24 }} />
            {!isCollapsed && <ListItemText primary="Add Jobs" />}
          </ListItemButton>
        )}

        {/* Admin Only: Manage Employees */}
        {canManageEmployees && (
          <ListItemButton component="li" onClick={() => setShowModal(true)}>
            <ManageAccountsIcon sx={{ fontSize: 24 }} />
            {!isCollapsed && <ListItemText primary="Manage Employees" />}
          </ListItemButton>
        )}
      </List>

      {/* Modal */}
      {showModal && (
        <AddJob setShowModal={setShowModal} onJobAdded={onJobAdded} />
      )}
    </Box>
  );
}
