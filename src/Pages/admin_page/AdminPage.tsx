import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import Searchbar from "../crm_page/CRMSearchbar";
import Taskbar from "../../Components/Taskbar";
import CRMTable from "../crm_page/CRMTable";
import CRMJob from "../../Interface/CRMJob";
import handleFetchJob from "../../Services/crm_page/fetch_jobs";

export default function AdminPage() {

  const [jobs, setJobs] = useState<CRMJob[]>([]);
    const [filteredJobs, setFilteredJobs] = useState<CRMJob[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
  
    useEffect(() => {
      const fetchJobs = async () => {
        await handleFetchJob(setJobs, setLoading, setError);
      };
      fetchJobs();
    }, []);
  
    useEffect(() => {
      if (!searchQuery) {
        setFilteredJobs(jobs);
      } else {
        setFilteredJobs(
          jobs.filter((job) =>
            job.jobId.toString().toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      }
    }, [searchQuery, jobs]);
    
  return (
    <div className="h-screen flex">
      {/* Fixed Taskbar (Full Left Side) */}
      <div className="w-1/5 h-full bg-gray-800 text-white fixed">
        <Taskbar />
      </div>

      {/* Content Area (Navbar, Searchbar, and Table) */}
      <div className="w-4/5 ml-[20%] flex flex-col h-full">
        <Navbar />
        <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Table should be scrollable */}
        <div className="flex-grow overflow-hidden">
          <CRMTable jobs={filteredJobs} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
}
