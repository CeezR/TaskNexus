import * as React from 'react';
import { PieChart, pieArcClasses } from '@mui/x-charts/PieChart';
import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '@/app/theme';

type PieActiveArcProps = {
  jobStatus: JobStatus[]; // The prop for pieData
};

export default function PieActiveArc(props: PieActiveArcProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


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
        {props.jobStatus === null ? (
          <div>Loading...</div>
        ) : (
          <PieChart
            series={[
              {
                type: 'pie',
                data: props.jobStatus,
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