import { useState } from "react";
import { handleRegister } from "../../Services/Register/Register";
import { useNavigate } from "react-router-dom";
import { validatePassword } from "../../Utils/validate_password";
import {
  Box,
  Button,
  Card,
  FormControl,
  TextField,
  Typography,
  Link,
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
            <TextField
              id="outlined-basic"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
            />
          </FormControl>
          <FormControl>
            <TextField
              id="outlined-basic"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
            />
          </FormControl>
          <FormControl>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              value={password}
              onChange={handlePasswordChange}
              error={!!passwordError}
              helperText={passwordError}
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
