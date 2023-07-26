"use client";
import { Box } from "@mui/material";
import EmployeeDisplay from "./EmployeeDisplay";

type Props = {
  params: {
    employeeId: string;
  };
};

const page = (props: Props) => {
  return (
    <Box width="100%" padding="1rem">
      <EmployeeDisplay employeeId={props.params.employeeId} />
    </Box>
  );
};

export default page;
