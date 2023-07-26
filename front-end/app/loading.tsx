import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
    return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <CircularProgress color="inherit" size={150} /> {/* Adjust the size as needed */}
        </Box>
      );
}