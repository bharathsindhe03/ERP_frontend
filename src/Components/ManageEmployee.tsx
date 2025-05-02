import { useEffect, useState } from "react";
import { fetchUsers } from "../Services/ManageEmployee/FetchEmp";
import { deleteUser } from "../Services/ManageEmployee/DeleteEmp";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Paper,
  IconButton,
  CircularProgress,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddUserDialog from "./forms/AddUserDialog"; // Import the new AddUserDialog component

const columnWidths: Record<string, string> = {
  slNo: "50px",
  userName: "200px",
  email: "300px",
  role: "150px",
  lastLogin: "200px",
  actions: "100px",
};

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

  useEffect(() => {
    fetchUsers(setUsers, setLoading);
  }, []);

  return (
    <>
      {/* Add New Button */}
      <Box display="flex" justifyContent="flex-end" mt={3}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add New
        </Button>
      </Box>

      {/* Table */}
      <Box
        sx={{
          width: "100%",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          border: "1px solid rgba(224, 224, 224, 1)",
          borderRadius: 0,
          marginTop: 2,
        }}
      >
        <Box sx={{ overflow: "auto", maxHeight: "65vh", overflowX: "hidden" }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer sx={{ minWidth: "100%" }} component={Paper}>
              <Table
                stickyHeader
                aria-label="CRM Table"
                sx={{ tableLayout: "fixed" }}
              >
                <TableHead>
                  <TableRow>
                    {Object.entries(columnWidths).map(([key, width]) => (
                      <TableCell
                        key={key}
                        sx={{
                          width,
                          border: "1px solid rgba(224, 224, 224, 1)",
                          position: key === "slNo" ? "sticky" : "static",
                          left: key === "slNo" ? 0 : undefined,
                          background: key === "slNo" ? "#fff" : undefined,
                          zIndex: key === "slNo" ? 11 : undefined,
                        }}
                      >
                        <Typography fontWeight="bold">
                          {key === "slNo"
                            ? "Sl No"
                            : key === "actions"
                            ? "Actions"
                            : key.charAt(0).toUpperCase() + key.slice(1)}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user: User, index: number) => (
                    <TableRow key={index}>
                      <TableCell
                        sx={{
                          width: columnWidths["slNo"],
                          position: "sticky",
                          left: 0,
                          background: "#fff",
                          zIndex: 10,
                        }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell>{user.userName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>
                        <IconButton
                          color="error"
                          onClick={() =>
                            deleteUser(
                              user.userName,
                              fetchUsers,
                              setUsers,
                              setLoading
                            )
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>

      {/* Add User Dialog */}
      <AddUserDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
