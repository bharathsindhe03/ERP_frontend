import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleUpdatePassword } from "../../Services/ForgotPassword/reset_password";

import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
  FormControl,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { validatePassword } from "../../Utils/validate_password";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);
    const { errorMessage } = validatePassword(value);
    setPasswordError(errorMessage);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !newConfirmPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword !== newConfirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const { isValid, errorMessage } = validatePassword(newPassword);
    if (!isValid) {
      setPasswordError(errorMessage);
      return;
    }

    setError("");
    setPasswordError("");

    await handleUpdatePassword(newPassword, navigate);
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
        <Typography variant="h4" align="center" color="#111928" gutterBottom>
          Update Password
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
          mt={2}
        >
          <FormControl>
            <TextField
              label="New Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              error={!!passwordError}
              helperText={passwordError}
              value={newPassword}
              onChange={handlePasswordChange}
              required
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          <FormControl>
            <TextField
              label="Confirm New Password"
              type={showConfirmPassword ? "text" : "password"}
              variant="outlined"
              value={newConfirmPassword}
              onChange={(e) => setNewConfirmPassword(e.target.value)}
              required
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          {error && <Alert severity="error">{error}</Alert>}

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
            disabled={
              !newPassword ||
              !newConfirmPassword ||
              !!passwordError ||
              newPassword !== newConfirmPassword
            }
          >
            Update Password
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
