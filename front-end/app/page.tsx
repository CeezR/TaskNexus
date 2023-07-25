import Dashboard from "./Dashboard";
import { Box } from "@mui/material";


export default async function Home() {
  
  return (
    <Box
    sx={{
      width: "100vh",
      overflowX: "hidden"
    }}
    >   
    <Dashboard />
    </Box>
  )
}
