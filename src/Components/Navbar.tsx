import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import handleLogOut from "../Services/Login/log_out";
import { useNavigate } from "react-router-dom";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { Box, Button, Typography } from "@mui/material";

export default function Navbar({ isCollapsed }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const navigator = useNavigate();
  const userName = localStorage.getItem("username") || "John Doe";
  const userEmail = localStorage.getItem("email") || "johndoe@example.com";
  const department = localStorage.getItem("role") || "CRM";

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsOpen(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? "profile-popover" : undefined;

  return (
    <Box
      component="nav"
      position="fixed"
      top={0}
      right={0}
      width="100%"
      bgcolor="#111928" // Use the primary color
      color="white"
      px={4}
      py={2}
      boxShadow={4}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        paddingLeft: isCollapsed ? "60px" : "200px", // Adjust padding based on isCollapsed prop
        transition: "padding-left 0.3s ease",
      }}
    >
      {/* Left side: User info */}
      <Box display="flex" alignItems="center">
        <Typography variant="h6" color="inherit">
          Welcome {userName}
        </Typography>
        <Box ml={1}>
          <Typography
            variant="caption"
            color="inherit"
            sx={{
              display: "inline-block",
              fontSize: "0.75rem",
              borderBottom: "none", // Remove any border line under the department name
              paddingBottom: "0", // Ensure there's no padding
            }}
          >
            <sup>{department}</sup> {/* Department as superscript */}
          </Typography>
        </Box>
      </Box>

      {/* Right side: Profile and logout */}
      <Box position="relative">
        <Button
          onClick={handleOpen}
          startIcon={<FaUserCircle size={30} />}
          endIcon={
            <Typography
              variant="body2"
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              {userName} {/* Display username as it is */}
            </Typography>
          }
          color="inherit"
        ></Button>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuList>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                handleLogOut(navigator);
              }}
              style={{ color: "red" }}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Popover>
      </Box>
    </Box>
  );
}
