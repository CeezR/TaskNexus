"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, GridValueGetterParams } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import { tokens } from "@/app/theme";

const VISIBLE_FIELDS = ["id"];

export default function QuickFilteringGrid() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [jobs, setJobs] = useState<Job[]>([]);

  const rows = React.useMemo(() => jobs.map((job) => ({ ...job })), [jobs]);

  const getTableData = async () => {
    try {
      const response = await fetch(`https://tasknexus123.azurewebsites.net/api/jobs`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data && data.jobList) {
        setJobs(data.jobList);
      } else {
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getTableData();
  }, []);

  const columns = React.useMemo(
    () => [
      ...VISIBLE_FIELDS.map((field) => ({
        field,
        headerName: field,
        width: 150,
      })),
      {
        field: "name",
        headerName: "Job Name",
        width: 150,
        valueGetter: (params: GridValueGetterParams<Job>) =>
          params.row.name || "-",
      },
      {
        field: "status",
        headerName: "Status",
        width: 150,
        valueGetter: (params: GridValueGetterParams<Job>) =>
          params.row.status || "-",
      },
      {
        field: "crewName",
        headerName: "Crew Name",
        width: 150,
        valueGetter: (params: GridValueGetterParams<Job>) =>
          params.row.crew?.name || "-",
      },
      {
        field: "companyName",
        headerName: "Company Name",
        width: 150,
        valueGetter: (params: GridValueGetterParams<Job>) =>
          params.row.company?.name || "-",
      },
      {
        field: "startDate",
        headerName: "Start Date",
        width: 150,
        valueGetter: (params: GridValueGetterParams<Job>) =>
          params.row.startDate || "-",
      },
      {
        field: "endDate",
        headerName: "End Date",
        width: 150,
        valueGetter: (params: GridValueGetterParams<Job>) =>
          params.row.endDate || "-",
      },
    ],
    []
  );

  return (
    <Box
      overflow-x="scroll"
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
        "& .MuiButtonBase-root": {
          color: `${colors.greenAccent[200]} !important`,
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        disableColumnFilter
        disableColumnMenu
        disableDensitySelector
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </Box>
  );
}
