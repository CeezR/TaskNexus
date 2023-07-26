"use client";
import React, { useState, useEffect } from "react";
import CrewDisplay from "./CrewDisplay";
import { Box } from "@mui/material";

type Props = {
  params: {
    crewId: string;
  };
};

const page = (props: Props) => {
  return (
    <Box width="100%" padding="1rem">
      <CrewDisplay crewId={props.params.crewId} />
    </Box>
  );
};

export default page;
