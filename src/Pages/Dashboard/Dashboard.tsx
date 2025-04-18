import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import Taskbar from "../../Components/Taskbar";
import TableComponent from "../../Components/TableComponent";
import TableColumns from "../../Interface/TableColumns";
import handleFetchJob from "../../Services/Jobs/FetchJobs";
import Searchbar from "../../Components/Searchbar";
import { Box } from "@mui/material";

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
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Taskbar */}
      <Taskbar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        onJobAdded={fetchJobs}
      />

      {/* Main Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          ml: isCollapsed ? "60px" : "200px",
          transition: "all 0.3s ease",
        }}
      >
        {/* Navbar */}
        <Navbar isCollapsed={isCollapsed} />

        {/* Content Below Navbar */}
        <Box
          sx={{
            flexGrow: 1,
            overflow: "auto",
            backgroundColor: "#fff",
            paddingX: { xs: 2, sm: 3 },
            paddingTop: "72px",
          }}
        >
          {/* Searchbar */}
          <Box sx={{ marginTop: 2, marginBottom: 2 }}>
            <Searchbar onSearch={handleSearch} />
          </Box>

          {/* Table */}
          <Box sx={{ overflowX: "auto" }}>
            <TableComponent
              jobs={filteredJobs}
              loading={loading}
              error={error}
              isCollapsed={isCollapsed}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
