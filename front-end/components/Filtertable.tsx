import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material';
import { tokens } from '@/app/theme';


interface Job {
    id: number;
    name: string;
    description: string;
    status: string;
    createdDate: string;
    updatedDate: string;
    crew: { name: string };
    company: { name: string };
}

const VISIBLE_FIELDS = ['id', 'name', 'status'];

export default function QuickFilteringGrid() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    const [jobs, setJobs] = useState<Job[]>([]);

    const rows = React.useMemo(() => jobs.map((job) => ({ ...job, id: job.id.toString() })), [jobs]);

    const getTableData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/jobs`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            if(data && data.jobList){
                setJobs(data.jobList);
            }else{

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
            ...VISIBLE_FIELDS.map((field) => ({ field, headerName: field, width: 150 })),
            {
                field: 'crewName',
                headerName: 'Crew Name',
                width: 150,
                valueGetter: (params: { row: { crew: { name: any; }; }; }) => params.row?.crew?.name || '-',
            },
            {
                field: 'companyName',
                headerName: 'Company Name',
                width: 150,
                valueGetter: (params: { row: { company: { name: any; }; }; }) => params.row?.company?.name || '-',
            },
        ],
        [],
    );

    return (
        <Box  m="40px 0 0 0"
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
        }}>
            <DataGrid
                rows={rows}
                columns={columns}
                disableColumnFilter
                disableColumnSelector
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
