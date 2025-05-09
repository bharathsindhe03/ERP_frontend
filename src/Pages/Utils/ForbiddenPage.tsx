import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

export default function ErrorPage() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="grey.900" p={4}>
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: { xs: 360, sm: 480 },
          p: { xs: 3, sm: 4 },
          textAlign: "center",
          bgcolor: "grey.800",
          borderRadius: 2,
        }}
      >
        <Typography variant="h1" component="h1" fontWeight="bold" color="white" fontSize={{ xs: "3rem", sm: "4rem" }}>
          404
        </Typography>
        <Typography variant="body1" color="grey.300" mt={2} fontSize={{ xs: "0.875rem", sm: "1rem" }}>
          Oops! The page you are looking for does not exist.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          sx={{
            mt: 3,
            py: { xs: 1, sm: 1.5 },
            px: 3,
            fontSize: { xs: "0.875rem", sm: "1rem" },
          }}
        >
          Go Back Home
        </Button>
      </Paper>
    </Box>
  );
}
