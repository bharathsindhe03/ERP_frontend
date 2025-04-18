import { useState } from "react";
import { useNavigate } from "react-router-dom";
import handleVerifyOTP from "../../Services/ForgotPassword/verify_otp";

import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
  FormControl,
  Alert,
} from "@mui/material";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp) {
      setError("All fields are required");
      return;
    }

    setError("");
    await handleVerifyOTP(otp, navigate);
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
          Verify OTP
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
          mt={2}
        >
          Please enter the OTP sent to your registered email.
          <FormControl>
            <TextField
              label="OTP"
              type="text"
              variant="outlined"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              fullWidth
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
          >
            Verify OTP
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
