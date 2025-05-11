import { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import TableColumns from "../Interface/TableColumns";
import AdvanceFilter from "./forms/AdvanceFilter";

interface SearchbarProps {
  onSearch: (query: string, filters?: Record<string, unknown>) => void; // Replace `any` with a specific type
  jobs: TableColumns[];
}

interface CategoryCounts {
  [category: string]: number;
}

interface BillingStatusCounts {
  [status: string]: number;
}

interface PaymentStatusCounts {
  [status: string]: number;
}

export default function Searchbar({ onSearch, jobs }: SearchbarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [jobDateFrom, setJobDateFrom] = useState<Date | null>(null);
  const [jobDateTo, setJobDateTo] = useState<Date | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sellingPriceFrom, setSellingPriceFrom] = useState<number | null>(null);
  const [sellingPriceTo, setSellingPriceTo] = useState<number | null>(null);
  const [selectedBillingStatuses, setSelectedBillingStatuses] = useState<string[]>([]);
  const [selectedPaymentStatuses, setSelectedPaymentStatuses] = useState<string[]>([]); // New state

  const categoryCounts: CategoryCounts = jobs.reduce((acc, job) => {
    if (job.category) {
      acc[job.category] = (acc[job.category] || 0) + 1;
    }
    return acc;
  }, {} as CategoryCounts);

  const billingStatusCounts: BillingStatusCounts = jobs.reduce((acc, job) => {
    if (job.billingStatus) {
      acc[job.billingStatus] = (acc[job.billingStatus] || 0) + 1;
    }
    return acc;
  }, {} as BillingStatusCounts);

  const paymentStatusCounts: PaymentStatusCounts = jobs.reduce((acc, job) => {
    if (job.paymentStatus) {
      acc[job.paymentStatus] = (acc[job.paymentStatus] || 0) + 1;
    }
    return acc;
  }, {} as PaymentStatusCounts); // New counts for payment statuses

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value, getFilters());
  };

  const handleFilterClick = () => {
    setFilterDialogOpen(true);
  };

  const handleFilterDialogClose = () => {
    setFilterDialogOpen(false);
    resetFilters();
    onSearch(searchTerm);
  };

  const handleJobDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobDateFrom(e.target.value ? new Date(e.target.value) : null);
  };

  const handleJobDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobDateTo(e.target.value ? new Date(e.target.value) : null);
  };

  const handleCategoryCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setSelectedCategories((prev) => (checked ? [...prev, value] : prev.filter((cat) => cat !== value)));
  };

  const handleSellingPriceFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSellingPriceFrom(e.target.value ? Number(e.target.value) : null);
  };

  const handleSellingPriceToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSellingPriceTo(e.target.value ? Number(e.target.value) : null);
  };

  const handleBillingStatusCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setSelectedBillingStatuses((prev) => (checked ? [...prev, value] : prev.filter((status) => status !== value)));
  };

  const handlePaymentStatusCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setSelectedPaymentStatuses((prev) => (checked ? [...prev, value] : prev.filter((status) => status !== value)));
  }; // New handler for payment statuses

  const applyFilters = () => {
    onSearch(searchTerm, getFilters());
    setFilterDialogOpen(false);
  };

  const resetFilters = () => {
    setJobDateFrom(null);
    setJobDateTo(null);
    setSelectedCategories([]);
    setSellingPriceFrom(null);
    setSellingPriceTo(null);
    setSelectedBillingStatuses([]);
    setSelectedPaymentStatuses([]); // Reset payment statuses
  };

  const getFilters = () => ({
    jobDateFrom,
    jobDateTo,
    categories: selectedCategories,
    sellingPriceFrom,
    sellingPriceTo,
    billingStatuses: selectedBillingStatuses,
    paymentStatuses: selectedPaymentStatuses, // Include payment statuses in filters
  });

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <TextField
        fullWidth
        label="Search jobs..."
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchTermChange}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
          "& .MuiInputLabel-root": {
            fontSize: "1rem",
          },
        }}
      />
      <IconButton onClick={handleFilterClick} sx={{ ml: 1, scale: 1.5 }}>
        <FilterAltIcon />
      </IconButton>

      <Dialog open={filterDialogOpen} onClose={handleFilterDialogClose}>
        <AdvanceFilter
          open={filterDialogOpen}
          onClose={handleFilterDialogClose}
          onApply={applyFilters}
          jobDateFrom={jobDateFrom}
          jobDateTo={jobDateTo}
          sellingPriceFrom={sellingPriceFrom}
          sellingPriceTo={sellingPriceTo}
          selectedCategories={selectedCategories}
          selectedBillingStatuses={selectedBillingStatuses}
          selectedPaymentStatuses={selectedPaymentStatuses} // New prop
          categoryCounts={categoryCounts}
          billingStatusCounts={billingStatusCounts}
          paymentStatusCounts={paymentStatusCounts} // New prop
          onDateFromChange={handleJobDateFromChange}
          onDateToChange={handleJobDateToChange}
          onSellingPriceFromChange={handleSellingPriceFromChange}
          onSellingPriceToChange={handleSellingPriceToChange}
          onCategoryChange={handleCategoryCheckboxChange}
          onBillingStatusChange={handleBillingStatusCheckboxChange}
          onPaymentStatusChange={handlePaymentStatusCheckboxChange} // New handler
        />
      </Dialog>
    </Box>
  );
}
