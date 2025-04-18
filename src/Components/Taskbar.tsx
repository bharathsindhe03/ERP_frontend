import logo from "../assets/apeksha white text-02.png";
import { useState } from "react";
import { IoBagSharp } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import {
  Box,
  IconButton,
  List,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import AddJob from "./AddJob";

export default function Taskbar({
  isCollapsed,
  setIsCollapsed,
  onJobAdded,
}: any) {
  const [showModal, setShowModal] = useState(false);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      height="100vh"
      bgcolor="#111928" // Use the primary color
      width={isCollapsed ? 60 : 200}
      zIndex={1000}
      component="nav" // Explicitly set the component prop to 'nav' to avoid the type error
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
        <ListItemButton component="li">
          {" "}
          {/* Using ListItemButton to avoid type error */}
          <IoBagSharp size={24} />
          {!isCollapsed && <ListItemText primary="Current Jobs" />}
        </ListItemButton>
        <ListItemButton component="li" onClick={() => setShowModal(true)}>
          {/* Using ListItemButton to avoid type error */}
          <IoIosAddCircle size={24} />
          {!isCollapsed && <ListItemText primary="Add Jobs" />}
        </ListItemButton>
      </List>

      {showModal && (
        <AddJob setShowModal={setShowModal} onJobAdded={onJobAdded} />
      )}
    </Box>
  );
}
