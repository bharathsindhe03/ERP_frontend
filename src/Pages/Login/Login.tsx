import { useState } from "react";
import handleLogIn from "../../Services/Login/log_in";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  FormControl,
  TextField,
  Typography,
  Link,
} from "@mui/material";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await handleLogIn(username, password, navigate);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="background.default"
      p={3}
    >
      <Card sx={{ p: 4, width: { xs: "100%", sm: 450 }, boxShadow: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <FormControl>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
            />
          </FormControl>
          <FormControl>
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              variant="outlined"
            />
          </FormControl>
          <Box textAlign="right">
            <Link href="/forgotpassword" variant="body2">
              Forgot Password?
            </Link>
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
          <Typography align="center">
            Don't have an account? <Link href="/register">Create Account</Link>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}
