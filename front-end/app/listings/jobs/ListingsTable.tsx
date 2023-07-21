import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowForward } from '@mui/icons-material';

function createData(
  name: string
) {
  return { name };
}

type BasicTableProp = {
  jobs: Job[] | undefined
}

const rows = [
  createData('Frozen yoghurt')
];

export default function ListingsTable({ jobs }: BasicTableProp) {
  const router = useRouter();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs?.map((job, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row" >
                <div className='tableListing__row' onClick={() => router.push(`/listings/jobs/${job.id}`)}>
                  <p className='table-paragraph'>{job.name}</p>
                  <ArrowForward />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}