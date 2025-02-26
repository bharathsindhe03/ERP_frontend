import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const userName = localStorage.getItem("user") || "John Doe";
  const userEmail = localStorage.getItem("email") || "johndoe@example.com";
  const department = localStorage.getItem("department") || "CRM";

  return (
    <nav className="flex items-center justify-between px-4 sm:px-6 py-4 bg-gray-900 text-white shadow-md">
      {/* Left Section */}
      <div className="text-lg sm:text-xl font-semibold flex items-baseline gap-1">
        <p>Welcome {userName}</p>
        <sup className="text-xs text-gray-400">
          <span className=" bg-gray-700 px-2 py-1 rounded-full text-gray-300 ">
            {department}
          </span>
        </sup>
      </div>

      {/* Right Section */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
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

        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-lg py-2">
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">
              Profile
            </button>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
