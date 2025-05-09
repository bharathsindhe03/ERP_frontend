import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { toast } from "sonner";
import handleUpdateJobStatus from "../../Services/UpdateJobStatus/UpdateJobStatus";
import UniversalDropdown from "../ui/UniversalDropdown";

interface UpdateJobStatusDialogProps {
  open: boolean;
  onClose: () => void;
}

const UpdateJobStatusDialog = ({ open, onClose }: UpdateJobStatusDialogProps) => {
  const [status, setStatus] = useState<string>("");
  const [slNo, setSlNo] = useState<string>("");

  const handleSubmit = () => {
    if (!slNo || !status) {
      toast.error("Please enter a valid Sl No and Status.");
      return;
    }
    handleUpdateJobStatus(slNo, status);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Job Status</DialogTitle>
      <DialogContent sx={{ padding: 2, width: 400 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField autoFocus margin="dense" label="Enter Sl No" type="number" fullWidth value={slNo} onChange={(e) => setSlNo(e.target.value)} sx={{ marginTop: 2 }} />
          <UniversalDropdown label="Select Status" value={status} setValue={(val): void => setStatus(val)} fieldName="status" />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="error">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="success">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateJobStatusDialog;
