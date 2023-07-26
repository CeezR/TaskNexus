import * as React from 'react';
import { PieChart} from '@mui/x-charts/PieChart';
import { Box, Typography } from '@mui/material';

const size = {
  width: 400,
  height: 200,
};

const pieParams = { height: 250, margin: { right: 5 } }

type PieArcLabelProps = {
  jobStatus: JobStatus[]; 
};

export default function PieArcLabel(props: PieArcLabelProps) {
  return (
    <Box flexGrow={1}
    textAlign="center"
    >
        <Typography
        variant="h4"
        fontWeight="bold"
        m="5px"
        >Job Status</Typography>
        <PieChart
          series={[{
            arcLabel: (item) => `${item.label} (${item.value})`,
            arcLabelMinAngle: 45,
            type: 'pie',
            data: props.jobStatus,
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30 },
          }]}
          {...pieParams}
        />
      </Box>
  );
}
