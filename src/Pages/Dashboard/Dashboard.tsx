// AdminPage.tsx
import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import Taskbar from "../../Components/Taskbar";
import TableComponent from "../../Components/TableComponent";
import TableColumns from "../../Interface/TableColumns";
import handleFetchJob from "../../Services/Jobs/FetchJobs";

export default function AdminPage() {
  const [jobs, setJobs] = useState<TableColumns[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const storedState = localStorage.getItem("isCollapsed");
    return storedState ? JSON.parse(storedState) : false;
  });

  useEffect(() => {
    localStorage.setItem("isCollapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  useEffect(() => {
    const fetchJobs = async () => {
      await handleFetchJob(setJobs, setLoading, setError);
    };
    fetchJobs();
  }, []);

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Taskbar */}
      <Taskbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main Content */}
      <div
        className={`flex flex-col w-full transition-all duration-300 ${
          isCollapsed ? "ml-[60px]" : "ml-[200px]"
        }`}
      >
        {/* Navbar (Fixed at the top) */}
        <Navbar isCollapsed={isCollapsed} />

        {/* Content Below Navbar */}
        <div className="flex-grow overflow-auto p-4 bg-white mt-[64px]">
          <div className="overflow-x-auto min-w-[700px]">
            <TableComponent
              jobs={jobs}
              loading={loading}
              error={error}
              isCollapsed={isCollapsed}
            />{" "}
            {/* Pass isCollapsed */}
          </div>
        </div>
      </div>
    </div>
  );
}
