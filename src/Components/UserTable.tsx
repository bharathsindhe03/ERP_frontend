import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

type User = {
  userName: string;
  email: string;
  role: string;
  lastLogin: string;
};

const columnWidths: Record<string, string> = {
  slNo: "50px",
  userName: "200px",
  email: "300px",
  role: "150px",
  lastLogin: "200px",
  actions: "100px",
};

export default function UserTable({ users, handleDeleteClick }: { users: User[]; handleDeleteClick: (user: User) => void }) {
  return (
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
        <TableContainer sx={{ minWidth: "100%" }} component={Paper}>
          <Table stickyHeader aria-label="CRM Table" sx={{ tableLayout: "fixed" }}>
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
                    <Typography fontWeight="bold">{key === "slNo" ? "Sl No" : key === "actions" ? "Actions" : key.charAt(0).toUpperCase() + key.slice(1)}</Typography>
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
                    <IconButton color="error" onClick={() => handleDeleteClick(user)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
