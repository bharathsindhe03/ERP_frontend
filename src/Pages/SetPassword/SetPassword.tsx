import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { handleSetPassword } from "../../Services/SetPassword/SetPassword";
import { validatePassword } from "../../Utils/validate_password";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import logo from "../../assets/only_logo.png";

export default function SetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get("email");
    if (emailParam) {
      setEmail(emailParam);
    } else {
      navigate("/");
    }
  }, [location.search, navigate]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const { isValid, errorMessage } = validatePassword(newPassword);
    setPasswordError(errorMessage);
    setIsPasswordValid(isValid); // Validate password
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent mouse-down default behavior
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword); // Toggle password visibility

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isPasswordValid) return; // Ensure password is valid before submission
    await handleSetPassword(email, password, navigate); // Call API to set password
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#F9FAFB" px={2}>
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
          sx={{
            width: 120,
            mx: "auto",
            mb: 2,
            display: "block",
          }}
        />

        <Typography variant="h4" align="center" color="#111928" gutterBottom>
          Set Password
        </Typography>

        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
          <FormControl>
            <TextField
              label="Email"
              value={email}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true, // Make email read-only
              }}
            />
          </FormControl>

          <FormControl>
            <TextField
              label="New Password"
              variant="outlined"
              value={password}
              onChange={handlePasswordChange}
              error={!!passwordError}
              helperText={passwordError}
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

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
            disabled={!isPasswordValid} // Disable button if password is not valid
          >
            Set Password
          </Button>

          <Typography align="center" fontSize="0.9rem">
            Already Registered?{" "}
            <Link href="/" underline="hover" sx={{ color: "#111928" }} fontWeight={500}>
              Login
            </Link>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}
