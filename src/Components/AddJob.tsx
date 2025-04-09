import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { FaTimes } from "react-icons/fa";
import handleCRMAddJob from "../Services/Jobs/AddJobs";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

interface AddJobProps {
  setShowModal: (show: boolean) => void;
}

export default function AddJob({ setShowModal }: AddJobProps) {
  const [customerName, setCustomerName] = React.useState("");
  const [date, setDate] = React.useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [category, setCategory] = React.useState("");
  const [sellingPrice, setSellingPrice] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setShowModal(false);
  };

  const categoryOptions = [
    "Clearance",
    "Domestic Freight",
    "Export Freight",
    "Freight & Clearance",
    "Import Freight",
    "Service",
    "Storage",
    "Transportation",
    "DTA Movement",
    "Duty Payment",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedDate = date.split("-").reverse().join("-");

    await handleCRMAddJob(
      customerName,
      formattedDate,
      category,
      Number(sellingPrice),
      setLoading,
      setError,
      setShowModal
    );
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={true}
      onClose={handleClose}
      aria-labelledby="add-job-dialog-title"
    >
      <DialogTitle
        id="add-job-dialog-title"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {"Add New Job"}
        <Button onClick={handleClose} color="inherit" aria-label="close">
          <FaTimes />
        </Button>
      </DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="customerName"
            label="Customer Name"
            type="text"
            fullWidth
            variant="outlined"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            id="date"
            label="Date"
            type="date"
            fullWidth
            variant="outlined"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
              required
              variant="outlined"
            >
              <MenuItem value="" disabled>
                Select Category
              </MenuItem>
              {categoryOptions.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            id="sellingPrice"
            label="Selling Price"
            type="number"
            fullWidth
            variant="outlined"
            value={sellingPrice === null ? "" : sellingPrice}
            onChange={(e) => {
              const value = e.target.value;
              setSellingPrice(value === "" ? null : Number(value));
            }}
            required
            sx={{ mb: 2 }}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          autoFocus
        >
          {loading ? <CircularProgress size={24} /> : "Add Job"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
