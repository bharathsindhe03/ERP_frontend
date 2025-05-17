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
import UniversalDropdown from "../ui/UniversalDropdown";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { toast } from "sonner";

interface AddJobProps {
  setShowModal: (show: boolean) => void;
  onJobAdded?: () => void;
}

export default function AddJob({ setShowModal, onJobAdded }: AddJobProps) {
  const [customerName, setCustomerName] = useState("");
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [category, setCategory] = useState("");
  const [sellingPrice, setSellingPrice] = useState<number | null>(null);
  const [isTemp, setisTemp] = useState(false);
  const [costPrice, setCostPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    if (!loading) setShowModal(false);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!customerName.trim()) newErrors.customerName = "Customer Name is required.";
    if (!category.trim()) newErrors.category = "Category is required.";
    if (sellingPrice === null || sellingPrice <= 0) newErrors.sellingPrice = "Selling Price must be greater than 0.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formattedDate = date.split("-").reverse().join("-");
    setLoading(true);

    await handleAddJob(customerName, formattedDate, category, Number(sellingPrice), Number(costPrice), isTemp, setLoading, () => {
      setShowModal(false);
      if (onJobAdded) onJobAdded();
      toast.success("Job added successfully!");
    });
  };

  return (
    <Dialog fullScreen={fullScreen} open={true} onClose={handleClose} aria-labelledby="add-job-dialog-title">
      <DialogTitle
        id="add-job-dialog-title"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        Add New Job
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2, // Adds spacing between form fields
        }}>
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
            error={!!errors.customerName}
            helperText={errors.customerName}
            disabled={loading}
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
            InputLabelProps={{
              shrink: true,
            }}
            disabled={loading}
            sx={{ mb: 2 }}
          />
          <UniversalDropdown label="Category" value={category} setValue={setCategory} fieldName="category" />
          {errors.category && <p style={{ color: "red", fontSize: "0.8rem" }}>{errors.category}</p>}

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
            error={!!errors.sellingPrice}
            helperText={errors.sellingPrice}
            disabled={loading}
            sx={{ mb: 2 }}
          />

          <TextField
            margin="dense"
            id="costPrice"
            label="Cost Price"
            type="number"
            fullWidth
            variant="outlined"
            value={costPrice === null ? "" : costPrice}
            onChange={(e) => {
              const value = e.target.value;
              setCostPrice(value === "" ? null : Number(value));
            }}
            disabled={loading}
            sx={{ mb: 2 }}
          />

          <FormControlLabel control={<Checkbox id="isTemp" checked={isTemp} onChange={() => setisTemp(!isTemp)} disabled={loading} />} label="Temporary ID" />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="error" disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" onClick={handleSubmit} disabled={loading} autoFocus variant="contained" color="success">
          {loading ? <CircularProgress size={24} /> : "Add Job"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
