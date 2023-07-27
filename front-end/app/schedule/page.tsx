"use client";
import React from "react";
import Calender from "./Calender";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from "@/components/Header";

const Schedule = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box style={{ height: "100vh" }} m="20px">
      <div style={{ height: "100vh", width: "100%" }}>
        <Header title="SCHEDULE" subtitle="Welcome to your schedule" />
        <Calender />
      </div>
    </Box>
  );
};

export default Schedule;
