import { useEffect, useState } from "react";
import { fetchUsers } from "../Services/ManageEmployee/FetchEmp";
import { deleteUser } from "../Services/ManageEmployee/DeleteEmp";
import handleAddUser from "../Services/ManageEmployee/AddEmp";

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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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

  // States for Add User Dialog
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("ADMIN");

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
        <Box
          sx={{
            overflow: "auto",
            maxHeight: "65vh",
            overflowX: "auto",
          }}
        >
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
                  {users.map((user: any, index: number) => (
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

      {/* Add New User Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            mt: 0,
            minWidth: 300,
            width: 400,
          }}
        >
          <TextField
            label="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            variant="outlined" // Ensures label floats
            fullWidth // Ensures it takes up full width
            margin="normal" // Adds spacing between input fields
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />

          <TextField
            select
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="ADMIN">Admin</MenuItem>
            <MenuItem value="EMPLOYEE">Employee</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={() =>
              handleAddUser(
                userName,
                password,
                email,
                role,
                setUsers,
                setLoading,
                setOpen,
                setUserName,
                setPassword,
                setEmail,
                setRole
              )
            }
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
