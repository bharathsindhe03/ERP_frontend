import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import logo from "../assets/cropped_logo.png";
import { IoBarChart, IoBagSharp } from "react-icons/io5";
import { FaClock } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";

export default function Taskbar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showTasks, setShowTasks] = useState(false);

  const tasks = [
    "Talk to Myntra",
    "Finish React Project",
    "Send Email to Client",
    "Prepare Presentation",
    "Update Documentation",
  ];

  return (
    <>
      {/* Hamburger Menu for Mobile */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-md md:hidden"
        onClick={() => setShowSidebar(!showSidebar)}
        title="Toggle Sidebar"
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar (Taskbar) */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white p-4 shadow-lg transition-all duration-300
          ${showSidebar ? "translate-x-0" : "-translate-x-full"} 
          w-64 md:w-[20%] md:translate-x-0 md:fixed`}
      >
        {/* Close Button for Mobile */}
        <button
          className="absolute top-4 right-4 text-white md:hidden"
          onClick={() => setShowSidebar(false)}
        >
          ✕
        </button>

        {/* Logo */}
        <img src={logo} alt="logo" className="w-20 h-20 mx-auto" />

        <h4 className="text-center text-lg font-semibold mt-4">Dashboard</h4>

        {/* Sidebar Links */}
        <nav className="flex flex-col mt-4 space-y-3">
          <a href="#" className="flex items-center space-x-2 hover:text-white">
            <IoBagSharp /> <span>Current Jobs</span>
          </a>
          <a href="#" className="flex items-center space-x-2 hover:text-white">
            <IoIosAddCircle /> <span>New Jobs</span>
          </a>
          <a href="#" className="flex items-center space-x-2 hover:text-white">
            <FaClock /> <span>Time Sheet</span>
          </a>
          <a href="#" className="flex items-center space-x-2 hover:text-white">
            <IoBarChart /> <span>Data Analytics</span>
          </a>
        </nav>

        {/* Tasks Section */}
        <div className="mt-6 p-3 bg-gray-800 rounded-lg">
          <div className="flex justify-between items-center">
            <h4 className="text-md font-semibold">My Tasks</h4>
            <FiMenu
              className="cursor-pointer text-xl hover:text-gray-400"
              onClick={() => setShowTasks(!showTasks)}
            />
          </div>
          <ul
            className={`${
              showTasks ? "block" : "hidden"
            } mt-2 text-sm space-y-1`}
          >
            {tasks.map((task, index) => (
              <li key={index} className="bg-gray-700 p-2 rounded">
                {index + 1}. {task}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
