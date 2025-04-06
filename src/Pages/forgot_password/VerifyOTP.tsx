import { useState } from "react";
import { useNavigate } from "react-router-dom";
import handleVerifyOTP from "../../Services/ForgotPassword/verify_otp";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";

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
      bgcolor="background.default"
      p={3}
    >
      <Card sx={{ p: 4, width: { xs: "100%", sm: 450 }, boxShadow: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
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
          <FormControl>
            <TextField
              label="OTP"
              type="text"
              variant="outlined"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </FormControl>

          {error && <Alert severity="error">{error}</Alert>}

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Verify OTP
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
