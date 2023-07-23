import * as React from 'react';
import { PieChart, pieArcClasses } from '@mui/x-charts/PieChart';
import { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '@/app/theme';

export default function PieActiveArc() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [dashboardData, setDashboardData] = useState<Dashboard | null>(null);
  const [pieData, setPieData] = useState<JobStatus[] | null>([]);
  const getDashboardData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/dashboard`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Dashboard = await response.json();
      setDashboardData(data);
      setPieData(data.jobStatus);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <>
      <Box flexGrow={1}>
        <Typography variant="h4"
            fontWeight="bold"
            padding="20px"
            sx={{ color: colors.grey[100] }}
            >
              Job Status
          </Typography>
        {pieData === null ? (
          <div>Loading...</div>
        ) : (
          <PieChart
            series={[
              {
                type: 'pie',
                data: pieData,
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30 },
              },
            ]}
            sx={{
              [`& .${pieArcClasses.faded}`]: {
                fill: colors.greenAccent,
              }
            }}
            height={300}
            width={500}
          />
        )}
      </Box>
    </>
  );
}