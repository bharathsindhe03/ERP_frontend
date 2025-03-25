import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import logo from "../assets/cropped_logo.png";
import { IoBarChart, IoBagSharp } from "react-icons/io5";
import { FaClock } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";

export default function Taskbar({ isCollapsed, setIsCollapsed }: any) {
  return (
    <div
      className={`bg-gray-900 text-white h-screen fixed top-0 left-0 z-50 transition-all duration-300 
      ${isCollapsed ? "w-[60px]" : "w-[250px]"}`}
    >
      {/* Toggle Button */}
      <button
        className="absolute top-4 right-[-15px] bg-gray-700 text-white p-1 rounded-full hover:bg-gray-600 transition"
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
        <img src={logo} alt="Logo" className="w-12 h-12" />
      </div>

      {/* Sidebar Links */}
      <nav className="flex flex-col mt-6 space-y-3 px-4">
        <a href="#" className="flex items-center space-x-2 hover:text-white">
          <IoBagSharp /> {!isCollapsed && <span>Current Jobs</span>}
        </a>
        <a href="#" className="flex items-center space-x-2 hover:text-white">
          <IoIosAddCircle /> {!isCollapsed && <span>Add Jobs</span>}
        </a>
        <a href="#" className="flex items-center space-x-2 hover:text-white">
          <FaClock /> {!isCollapsed && <span>Time Sheet</span>}
        </a>
        <a href="#" className="flex items-center space-x-2 hover:text-white">
          <IoBarChart /> {!isCollapsed && <span>Data Analytics</span>}
        </a>
      </nav>
    </div>
  );
}
