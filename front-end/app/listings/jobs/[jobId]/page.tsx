"use client";
import React, { useState, useEffect } from "react";
import JobDisplay from "./JobDisplay";
import { Box } from "@mui/material";

type Props = {
  params: {
    jobId: string;
  };
};

const page = (props: Props) => {
  return (
    <Box width="100%" padding="1rem">
      <JobDisplay jobId={props.params.jobId} />
    </Box>
  );
};

export default page;
