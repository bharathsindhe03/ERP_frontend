import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import logo from "../assets/cropped_logo.png";
import { IoBarChart, IoBagSharp } from "react-icons/io5";
import { FaClock } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import { useState } from "react";
import AddJob from "./AddJob";

export default function Taskbar({ isCollapsed, setIsCollapsed }: any) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      className={`bg-gray-900 text-white h-screen fixed top-0 left-0 z-50 transition-width duration-300 
      overflow-hidden ${isCollapsed ? "w-[60px]" : "w-[200px]"}`}
    >
      {/* Toggle Button */}
      <button
        className="absolute top-4 right-[-12px] bg-gray-700 text-white p-1 rounded-full hover:bg-gray-600 transition-colors"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <FiChevronRight size={24} />
        ) : (
          <FiChevronLeft size={24} />
        )}
      </button>
        
      {/* Logo */}
      <div className="flex justify-center py-4">
        <img
          src={logo}
          alt="Logo"
          className="w-12 h-12 transition-opacity duration-300"
        />
      </div>

      {/* Sidebar Links */}
      <nav className="flex flex-col mt-6 space-y-3 px-4">
        <a
          href="#"
          className="flex items-center space-x-2 hover:text-white transition-all duration-300"
        >
          <IoBagSharp className="text-2xl" />
          <span
            className={`${
              isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
            } transition-all duration-300`}
          >
            Current Jobs
          </span>
        </a>
        <a
          href="#"
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 hover:text-white transition-all duration-300"
        >
          <IoIosAddCircle className="text-2xl" />
          <span
            className={`${
              isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
            } transition-all duration-300`}
          >
            Add Jobs
          </span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-2 hover:text-white transition-all duration-300"
        >
          <FaClock className="text-2xl" />
          <span
            className={`${
              isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
            } transition-all duration-300`}
          >
            Time Sheet
          </span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-2 hover:text-white transition-all duration-300"
        >
          <IoBarChart className="text-2xl" />
          <span
            className={`${
              isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
            } transition-all duration-300`}
          >
            Data Analytics
          </span>
        </a>
      </nav>
      {showModal && <AddJob setShowModal={setShowModal} />}
    </div>
  );
}
