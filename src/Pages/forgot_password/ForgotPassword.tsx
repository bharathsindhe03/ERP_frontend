import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleForgotPassword } from "../../Services/ForgotPassword/forgot_password";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import FormControl from "@mui/material/FormControl";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleForgotPassword(email, navigate);
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
        <Typography variant="h4" align="center" color="#111928" gutterBottom>
          Forgot Password
        </Typography>

        <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
          Enter your email and we'll send you a link to reset your password.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
          <FormControl>
            <TextField label="Email" type="email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth />
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
          >
            Send Reset Link
          </Button>

          <Typography align="center" variant="body2">
            Remembered your password?
            <Link href="/" underline="hover" sx={{ color: "#111928" }} fontWeight={500}>
              Log in
            </Link>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}
