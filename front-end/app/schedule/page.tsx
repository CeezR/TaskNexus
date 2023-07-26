"use client";
import React from "react";
import Calender from "./Calender";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from "@/components/Header";

const page = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box style={{ height: "100vh", width: "100%" }}  m="20px">
      <div style={{ height: "100vh", width: "100%" }}>
        <Header title="SCHEDULE" subtitle="Welcome to your schedule" />
        <Calender />
      </div>
    </Box>
  );
};

export default page;
