import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import Taskbar from "../../Components/Taskbar";
import TableComponent from "../../Components/TableComponent";
import TableColumns from "../../Interface/TableColumns";
import handleFetchJob from "../../Services/Jobs/FetchJobs";
import Searchbar from "../../Components/Searchbar";

export default function Dashboard() {
  const [jobs, setJobs] = useState<TableColumns[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<TableColumns[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const storedState = localStorage.getItem("isCollapsed");
    return storedState ? JSON.parse(storedState) : false;
  });

  useEffect(() => {
    localStorage.setItem("isCollapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);
  const fetchJobs = async () => {
    await handleFetchJob(
      (data) => {
        setJobs(data);
        setFilteredJobs(data);
      },
      setLoading,
      setError
    );
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      await handleFetchJob(
        (data) => {
          setJobs(data);
          setFilteredJobs(data);
        },
        setLoading,
        setError
      );
    };
    fetchJobs();
  }, []);

  const handleSearch = (query: string) => {
    const lowered = query.toLowerCase();
    const filtered = jobs.filter((job) => {
      return (
        job.customerName?.toLowerCase().includes(lowered) ||
        job.category?.toLowerCase().includes(lowered) ||
        String(job.jobId)?.toLowerCase().includes(lowered)
      );
    });
    setFilteredJobs(filtered);
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Taskbar */}
      <Taskbar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        onJobAdded={fetchJobs}
      />

      {/* Main Content */}
      <div
        className={`flex flex-col w-full transition-all duration-300 ${
          isCollapsed ? "ml-[60px]" : "ml-[200px]"
        }`}
      >
        {/* Navbar */}
        <Navbar isCollapsed={isCollapsed} />

        {/* Content Below Navbar */}
        <div className="flex-grow overflow-auto bg-white px-4 sm:px-6 pt-6 mt-[72px]">
          {/* Searchbar */}
          <div className="mb-4">
            <Searchbar onSearch={handleSearch} />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <TableComponent
              jobs={filteredJobs}
              loading={loading}
              error={error}
              isCollapsed={isCollapsed}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
