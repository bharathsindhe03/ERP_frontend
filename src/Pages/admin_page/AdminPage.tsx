import Navbar from "../../Components/Navbar";

import Taskbar from "../../Components/Taskbar";

export default function AdminPage() {
  return (
    <div className="h-screen flex">
          {/* Fixed Taskbar (Full Left Side) */}
          <div className="w-1/5 h-full bg-gray-800 text-white fixed">
            <Taskbar />
          </div>
    
          {/* Content Area (Navbar, Searchbar, and Table) */}
          <div className="w-4/5 ml-[20%] flex flex-col h-full">
            <Navbar />
            
          </div>
        </div>
  );
}
