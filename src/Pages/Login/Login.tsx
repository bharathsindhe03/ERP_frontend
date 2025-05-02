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
  InputAdornment,
  IconButton,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import logo from "../../assets/only_logo.png";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleLogIn(username, password, navigate);
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#F9FAFB"
      px={2}
    >
      <Card
        sx={{
          p: 4,
          width: { xs: "100%", sm: 450 },
          boxShadow: 4,
          borderRadius: 4,
          backgroundColor: "#fff",
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{ width: 120, mx: "auto", mb: 2 }}
        />

        <Typography variant="h4" align="center" color="#111928" gutterBottom>
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
              fullWidth
              required
            />
          </FormControl>

          <FormControl>
            <TextField
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              sx={{ color: "#111928" }}
              fullWidth
              required
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          <Box textAlign="right">
            <Link
              href="/forgotpassword"
              underline="hover"
              sx={{ color: "#111928" }}
              fontSize="0.875rem"
            >
              Forgot Password?
            </Link>
          </Box>

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#111928",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#fff",
                color: "#111928",
              },
            }}
            fullWidth
          >
            Login
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
