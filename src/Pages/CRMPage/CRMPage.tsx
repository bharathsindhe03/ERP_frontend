import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import Searchbar from "../../Components/Searchbar";
import Taskbar from "../../Components/Taskbar";
import CRMJob from "../../Interface/CRMJob";
import handleFetchJob from "../../Services/CRMPage/handleFetchJob";
import Loader from "../../Components/Loader";

export default function CRMPage() {
  const [jobs, setJobs] = useState<CRMJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        await handleFetchJob(setJobs, setLoading, setError);
      } catch (err) {
        setError("Failed to load jobs.");
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-col md:flex-row flex-grow h-full">
        <Taskbar />
        <div className="w-full flex-grow">
          <Navbar />
          <Searchbar />
          <div className="p-4 overflow-auto">
            {loading && <Loader />}
            {error && <p className="text-red-500">Error: {error}</p>}
            {!loading && !error && jobs.length === 0 && (
              <p className="text-gray-500">No jobs available</p>
            )}
            {!loading && !error && jobs.length > 0 && (
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    {jobs[0] &&
                      Object.keys(jobs[0])?.map((key) => (
                        <th key={key} className="border p-2">
                          {key}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.jobId} className="border">
                      {Object.values(job).map((value, index) => (
                        <td key={index} className="border p-2">
                          {String(value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
