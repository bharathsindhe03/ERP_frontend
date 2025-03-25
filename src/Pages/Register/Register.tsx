import React, { useState } from "react";
import { handleRegister } from "../../Services/Register/register";
import { useNavigate } from "react-router-dom";
import { validatePassword } from "../../Utils/validate_password";
import {
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  Link,
  Divider,
} from "@mui/material";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const navigate = useNavigate();

  const handlePasswordChange = (e: any) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const { isValid, errorMessage } = validatePassword(newPassword);
    setPasswordError(errorMessage);
    setIsPasswordValid(isValid);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!isPasswordValid) return;
    await handleRegister(email, username, password, navigate);
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
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <FormControl>
            <FormLabel>Username</FormLabel>
            <TextField
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <TextField
              type="email"
              placeholder="someone@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <TextField
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
              error={!!passwordError}
              helperText={passwordError}
              fullWidth
              required
            />
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!isPasswordValid}
          >
            Register
          </Button>
          <Typography align="center">
            Already have an account? <Link href="/">Login</Link>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}
