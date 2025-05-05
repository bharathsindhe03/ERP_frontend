import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

type User = {
  userName: string;
  email: string;
  role: string;
  lastLogin: string;
};

export default function DeleteConfirmationDialog({
  open,
  onClose,
  onConfirm,
  user,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  user: User | null;
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete <strong>{user?.userName}</strong>?
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
