import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import getJobStatus from "../../Services/JobStatus/JobStatus";
import Box from "@mui/material/Box";
import { toast } from "sonner";

interface JobStatusDialogProps {
  open: boolean;
  onClose: () => void;
}

interface JobStatus {
  [key: string]: string | number | boolean;
}

const JobStatusDialog: React.FC<JobStatusDialogProps> = ({ open, onClose }) => {
  const [slNo, setSlNo] = useState<string>("");
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null);

  const handleSubmit = async () => {
    if (!slNo.trim()) {
      toast.error("Please enter a valid Sl No.");
      return;
    }

    try {
      await getJobStatus(slNo, setJobStatus);
      toast.success("Job status fetched successfully!");
    } catch (error) {
      console.error("Error fetching job status:", error);
      toast.error("Failed to fetch job status. Please try again.");
    }
  };

  const handleClose = () => {
    onClose();
    setSlNo("");
    setJobStatus(null);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Job Status</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin="dense" label="Enter Sl No" type="number" fullWidth value={slNo} onChange={(e) => setSlNo(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
      {jobStatus && (
        <Box sx={{ padding: 2 }}>
          <h3>Job Status Details</h3>
          <ul>
            {Object.entries(jobStatus).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </Box>
      )}
    </Dialog>
  );
};

export default JobStatusDialog;
