import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

export default function PageLoader() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh" // Or a suitable height for your application
      width="100vw" // Make sure it covers the full width
    >
      <svg width={0} height={0} style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
      />
    </Box>
  );
}
