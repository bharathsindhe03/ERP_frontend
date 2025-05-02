import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import handleLogOut from "../Services/Login/log_out";
import { useNavigate } from "react-router-dom";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { Box, Button, Typography } from "@mui/material";
import {
  getEmail,
  getRole,
  getUsername,
} from "../Services/Utils/LocalStorageUtils";

export default function Navbar({ isCollapsed }: { isCollapsed: boolean }) {
  const [, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const navigator = useNavigate();
  const userName = getUsername();
  const userEmail = getEmail();
  const department = getRole();

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
      bgcolor="#111928"
      color="white"
      px={4}
      py={2}
      boxShadow={4}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        paddingLeft: isCollapsed ? "60px" : "200px",
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
              borderBottom: "none",
              paddingBottom: "0",
            }}
          >
            <sup>{department}</sup>
          </Typography>
        </Box>
      </Box>

      <Box position="relative">
        <Button
          onClick={handleOpen}
          color="inherit"
          sx={{ textTransform: "none", padding: 1 }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <AccountCircleIcon sx={{ fontSize: 30 }} />
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <Typography variant="body2" color="inherit">
                {userName}
              </Typography>
              <Typography
                variant="caption"
                color="inherit"
                sx={{ fontSize: "0.75rem", lineHeight: 1 }}
              >
                {userEmail}
              </Typography>
            </Box>
          </Box>
        </Button>

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
