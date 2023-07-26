import React from "react";
import {
  Box,
  useTheme,
  IconButton,
} from "@mui/material";
import { ThemeProvider, styled } from "@mui/material/styles";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { tokens } from "@/app/theme";
import DeleteIcon from "@mui/icons-material/Delete";


type JobTableProps = {
  jobs: Job[];
  onDeleteJob: (jobId: number) => void;
};

const JobTable: React.FC<JobTableProps> = ({ jobs, onDeleteJob }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "actions", 
      headerName: "Actions",
      renderCell: ({ row }) => (
        <IconButton onClick={() => onDeleteJob(row.id)} style={{ color: "red" }}>
          <DeleteIcon />
        </IconButton>
      ),
      sortable: false,
      filterable: false,
      width: 100,
      disableColumnMenu: true,
    },
  ];
  return (
    <ThemeProvider theme={theme}>
      <Box
        m="5px 0 0 0"
        height="100%"
        width="100%"
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
        <DataGrid rows={jobs} columns={columns} />
      </Box>
    </ThemeProvider>
  );
};

export default JobTable;