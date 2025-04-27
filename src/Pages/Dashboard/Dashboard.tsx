import { useEffect, useMemo, useState } from "react";
import Navbar from "../../Components/Navbar";
import Taskbar from "../../Components/Taskbar";
import TableColumns from "../../Interface/TableColumns";
import handleFetchJob from "../../Services/Jobs/FetchJobs";
import Searchbar from "../../Components/Searchbar";
import { Box } from "@mui/material";
import ManageEmployee from "../../Components/ManageEmployee";
import MyRoleBasedTable from "../../Components/MyRoleBasedTable";

export default function Dashboard() {
  const role = localStorage.getItem("role") || null;
  const [jobs, setJobs] = useState<TableColumns[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<TableColumns[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const storedState = localStorage.getItem("isCollapsed");
    return storedState ? JSON.parse(storedState) : false;
  });
  const [billingFilter, setBillingFilter] = useState<string | null>(null);
  const [activeContent, setActiveContent] = useState<
    "jobs" | "manageEmployees"
  >("jobs");

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

  const handleSearch = (query: string, filters?: any) => {
    const lowered = query.toLowerCase();
    let filtered = jobs.filter((job) => {
      return (
        job.customerName?.toLowerCase().includes(lowered) ||
        job.category?.toLowerCase().includes(lowered) ||
        String(job.jobId)?.toLowerCase().includes(lowered)
      );
    });

    if (filters) {
      console.log("Filters:", filters); // Debugging line

      if (filters.jobDateFrom) {
        const jobDateFrom =
          filters.jobDateFrom instanceof Date
            ? filters.jobDateFrom
            : new Date(filters.jobDateFrom.split("-").reverse().join("-")); // Convert "DD-MM-YYYY" to "YYYY-MM-DD"
        filtered = filtered.filter((job) => {
          const jobDate = job.jobDate
            ? new Date(job.jobDate.split("-").reverse().join("-")) // Convert "DD-MM-YYYY" to "YYYY-MM-DD"
            : null;
          return jobDate && jobDate >= jobDateFrom;
        });
      }
      if (filters.jobDateTo) {
        const jobDateTo =
          filters.jobDateTo instanceof Date
            ? filters.jobDateTo
            : new Date(filters.jobDateTo.split("-").reverse().join("-")); // Convert "DD-MM-YYYY" to "YYYY-MM-DD"
        filtered = filtered.filter((job) => {
          const jobDate = job.jobDate
            ? new Date(job.jobDate.split("-").reverse().join("-")) // Convert "DD-MM-YYYY" to "YYYY-MM-DD"
            : null;
          return jobDate && jobDate <= jobDateTo;
        });
      }
      if (filters.categories && filters.categories.length > 0) {
        filtered = filtered.filter((job) =>
          filters.categories.includes(job.category || "")
        );
      }
      if (filters.sellingPriceFrom !== null) {
        filtered = filtered.filter(
          (job) =>
            job.sellingPrice !== undefined &&
            job.sellingPrice !== null &&
            job.sellingPrice >= filters.sellingPriceFrom
        );
      }
      if (filters.sellingPriceTo !== null) {
        filtered = filtered.filter(
          (job) =>
            job.sellingPrice !== undefined &&
            job.sellingPrice !== null &&
            job.sellingPrice <= filters.sellingPriceTo
        );
      }
      if (filters.billingStatuses && filters.billingStatuses.length > 0) {
        filtered = filtered.filter((job) =>
          filters.billingStatuses.includes(job.billingStatus || "")
        );
      }
    }

    setFilteredJobs(filtered);
  };

  const handleBillingFilterChange = (filter: string | null) => {
    setBillingFilter(filter);
  };

  const handleShowAllJobs = () => {
    setBillingFilter(null);
    setFilteredJobs(jobs);
    setActiveContent("jobs");
  };

  const handleShowCurrentJobs = () => {
    setBillingFilter("Open");
    setFilteredJobs(jobs.filter((job) => job.billingStatus === "Open"));
    setActiveContent("jobs");
  };

  const handleManageEmployeesClick = () => {
    setActiveContent("manageEmployees");
  };

  const filteredByBillingStatus = useMemo(() => {
    if (!billingFilter || billingFilter === "All") {
      return filteredJobs;
    }
    return filteredJobs.filter((job) => job.billingStatus === billingFilter);
  }, [filteredJobs, billingFilter]);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Taskbar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        onJobAdded={fetchJobs}
        onFilterChange={handleBillingFilterChange}
        onShowAllJobs={handleShowAllJobs}
        onShowCurrentJobs={handleShowCurrentJobs}
        onManageEmployeesClick={handleManageEmployeesClick}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          ml: isCollapsed ? "60px" : "200px",
          transition: "all 0.3s ease",
        }}
      >
        <Navbar isCollapsed={isCollapsed} />
        <Box
          sx={{
            flexGrow: 1,
            overflow: "auto",
            backgroundColor: "#fff",
            paddingX: { xs: 2, sm: 3 },
            paddingTop: "72px",
          }}
        >
          {activeContent === "jobs" && (
            <>
              <Box sx={{ marginTop: 2, marginBottom: 2 }}>
                <Searchbar onSearch={handleSearch} jobs={jobs} />{" "}
                {/* Passed the jobs prop here */}
              </Box>
              <Box sx={{ overflowX: "auto" }}>
                <MyRoleBasedTable
                  jobs={filteredByBillingStatus}
                  loading={loading}
                  error={error}
                  isCollapsed={isCollapsed}
                  initialBillingFilter={billingFilter}
                  userRole={role}
                />
              </Box>
            </>
          )}
          {activeContent === "manageEmployees" && <ManageEmployee />}
        </Box>
      </Box>
    </Box>
  );
}
