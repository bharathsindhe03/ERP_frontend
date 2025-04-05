import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import handleLogOut from "../Services/Login/log_out";
import { useNavigate } from "react-router-dom";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

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
    <nav
      className={`fixed top-0 right-0 bg-gray-900 text-white w-full shadow-md transition-all duration-300
      ${isCollapsed ? "pl-[60px]" : "pl-[200px]"}`}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 py-4">
        {/* Left Section */}
        <div className="text-lg sm:text-xl font-semibold flex items-baseline gap-1">
          <p>Welcome {userName}</p>
          <sup className="text-xs text-gray-400">
            <span className="bg-gray-700 px-2 py-1 rounded-full text-gray-300">
              {department}
            </span>
          </sup>
        </div>

        {/* Right Section */}
        <div className="relative">
          <button
            aria-describedby={id}
            onClick={handleOpen}
            className="flex items-center gap-2 p-2"
          >
            <FaUserCircle size={30} className="text-gray-300" />
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-medium">
                  {userName}
                </span>
                <span className="text-xs bg-gray-700 px-2 py-1 rounded-full text-gray-300">
                  {department}
                </span>
              </div>
              <span className="text-xs sm:text-sm text-gray-300 block">
                {userEmail}
              </span>
            </div>
          </button>

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
            PaperProps={{
              style: {
                zIndex: 1500, // Ensure it's above other elements
              },
            }}
          >
            <MenuList>
              <MenuItem
                onClick={handleClose}
                sx={{ "&:hover": { backgroundColor: "#f0f0f0" } }}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  handleLogOut(navigator);
                }}
                sx={{ "&:hover": { backgroundColor: "#f0f0f0" }, color: "red" }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Popover>
        </div>
      </div>
    </nav>
  );
}
