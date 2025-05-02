import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import handleAddUser from "../../Services/ManageEmployee/AddEmp";

type AddUserDialogProps = {
  open: boolean;
  onClose: () => void;
};

const AddUserDialog: React.FC<AddUserDialogProps> = ({ open, onClose }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("ADMIN");

  const handleSubmit = () => {
    handleAddUser(userName, email, role);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New User</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          paddingBottom: "16px", // Ensure there's some bottom padding for the button
          overflowX: "hidden", // Prevent horizontal scrolling
          width: "100%", // Ensure the content fills the dialog and prevents overflow
        }}
      >
        <TextField
          label="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          sx={{
            minWidth: 0, // Prevents TextField from causing horizontal overflow
          }}
        />

        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          sx={{
            minWidth: 0, // Prevents TextField from causing horizontal overflow
          }}
        />

        <TextField
          select
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          fullWidth
          margin="normal"
          sx={{
            minWidth: 0, // Prevents TextField from causing horizontal overflow
          }}
        >
          <MenuItem value="ADMIN">Admin Role</MenuItem>
          <MenuItem value="CRM">CRM Role</MenuItem>
          <MenuItem value="BILLING">Billing Role</MenuItem>
          <MenuItem value="OPERATIONS">Operations Role</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
        }}
      >
        <Button
          sx={{
            backgroundColor: "red",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#fff",
              color: "#111928",
              border: "1px solid red",
            },
          }}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "#111928",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#fff",
              color: "#111928",
            },
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserDialog;
