"use client";
import React, { useState, useEffect } from "react";
import CompanyDisplay from "./CompanyDisplay";
import { Box } from "@mui/material";

type Props = {
  params: {
    companyId: string;
  };
};

const page = (props: Props) => {
  return (
    <Box width="100%" padding="1rem">
      <CompanyDisplay companyId={props.params.companyId} />
    </Box>
  );
};

export default page;