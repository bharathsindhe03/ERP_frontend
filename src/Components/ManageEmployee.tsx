import { useEffect, useState } from "react";
import { fetchUsers } from "../Services/ManageEmployee/FetchEmp";
import { deleteUser } from "../Services/ManageEmployee/DeleteEmp";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import AddUserDialog from "./forms/AddUserDialog";
import UserTable from "./UserTable";
import DeleteConfirmationDialog from "./forms/DeleteConfirmationDialog";

type User = {
  userName: string;
  email: string;
  role: string;
  lastLogin: string;
};

export default function ManageEmployee() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers(setUsers, setLoading);
  }, []);

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedUser) {
      await deleteUser(selectedUser.userName, fetchUsers, setUsers, setLoading);
    }
    setDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <Box display="flex" justifyContent="flex-end" mt={3}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add New
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <UserTable users={users} handleDeleteClick={handleDeleteClick} />
      )}

      <AddUserDialog open={open} onClose={() => setOpen(false)} />

      <DeleteConfirmationDialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} onConfirm={handleConfirmDelete} user={selectedUser} />
    </>
  );
}
