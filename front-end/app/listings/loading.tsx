import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box>
        <CircularProgress color="inherit" size={150} />{" "}
      </Box>
    </div>
  );
}
