import * as React from "react";
import { ArrowForward } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { Box, IconButton, useTheme } from "@mui/material";
import { tokens } from "@/app/theme";


type EmployeeTableProp = {
  employees: Employee[] | undefined;
};

export default function EmployeeListingTable({ employees }: EmployeeTableProp) {
  const router = useRouter();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "view",
      headerName: "View",
      sortable: false,
      renderCell: ({ row }) => (
        <IconButton onClick={() => handleRowClick(row)} style={{ color: "white" }}>
          <ArrowForward />
        </IconButton>
      ),
    },
  ];
  const handleRowClick = (params: GridRowParams) => {
    const employeeId = params.id;
    router.push(`/listings/employees/${employeeId}`);
  };

  return (
     <Box
     m="40px 0 0 0"
    width="90%"
     sx={{
       "& .MuiDataGrid-root": {
         border: "none",
       },
       "& .MuiDataGrid-cell": {
         borderBottom: "none",
       },
       "& .name-column--cell": {
         color: colors.greenAccent[300],
       },
       "& .MuiDataGrid-columnHeaders": {
         backgroundColor: colors.blueAccent[700],
         borderBottom: "none",
       },
       "& .MuiDataGrid-virtualScroller": {
         backgroundColor: colors.primary[400],
       },
       "& .MuiDataGrid-footerContainer": {
         borderTop: "none",
         backgroundColor: colors.blueAccent[700],
       },
       "& .MuiCheckbox-root": {
         color: `${colors.greenAccent[200]} !important`,
       },
     }}
   >
     <DataGrid
       rows={employees as readonly any[]} 
       columns={columns}
       disableColumnMenu
     />
   </Box>
  );
}
