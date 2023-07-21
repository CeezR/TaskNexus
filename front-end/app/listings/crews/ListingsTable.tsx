import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import { ArrowForward } from '@mui/icons-material';
import { useRouter } from 'next/navigation';


type BasicTableProp = {
  crews : Crew[] | undefined
}

export default function ListingsTable({ crews }: BasicTableProp) {
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
          {crews?.length ? ( // Check if crews is not null and has elements
            crews.map((crew, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <div className='tableListing__row' onClick={() => router.push(`/listings/crews/${crew.id}`)}>
                    <p className='table-paragraph'>{crew.name}</p>
                    <ArrowForward />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
             
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}