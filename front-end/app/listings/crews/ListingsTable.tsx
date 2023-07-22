import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { ArrowForward } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import {
  Box,
  useTheme,
  IconButton,
} from "@mui/material";
import { tokens } from "@/app/theme";


type BasicTableProp = {
  crews: Crew[] | undefined
}

export default function ListingsTable({ crews }: BasicTableProp) {
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
  ];
  const handleRowClick = (params: GridRowParams) => {

    const employeeId = params.row.id;


    router.push(`/listings/crews/${employeeId}`);
  };
  return (
    
    <Box
    m="40px 0 0 0"
    height="75vh"
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
        checkboxSelection
        rows={crews as readonly any[]} 
        columns={columns}
        onRowClick={handleRowClick}
      />
  </Box>
  );
}

