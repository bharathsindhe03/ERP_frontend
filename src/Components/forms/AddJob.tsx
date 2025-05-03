import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import handleAddJob from "../../Services/Jobs/AddJobs";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import UniversalDropdown from "../ui/UniversalDropdown";
import { useState } from "react";

interface AddJobProps {
  setShowModal: (show: boolean) => void;
  onJobAdded?: () => void;
}

export default function AddJob({
  setShowModal,
  onJobAdded,
}: AddJobProps) {
  const [customerName, setCustomerName] = useState("");
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [category, setCategory] = useState("");
  const [sellingPrice, setSellingPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedDate = date.split("-").reverse().join("-");

    await handleAddJob(
      customerName,
      formattedDate,
      category,
      Number(sellingPrice),
      setLoading,
      setError,
      () => {
        setShowModal(false);
        if (onJobAdded) onJobAdded();
      }
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
        Add New Job
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
          <UniversalDropdown
            label="Category"
            value={category}
            setValue={setCategory}
            fieldName="category"
          />

          <TextField
            margin="dense"
            id="sellingPrice"
            label="Selling"
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
        <Button
          onClick={handleClose}
          variant="contained"
          sx={{
            backgroundColor: "red",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#fff",
              color: "#111928",
              border: "1px solid red",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          autoFocus
          sx={{
            backgroundColor: "#111928",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#fff",
              color: "#111928",
            },
          }}
        >
          {loading ? <CircularProgress size={24} /> : "Add Job"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
