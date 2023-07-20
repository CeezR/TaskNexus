import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from 'next/link';

function createData(
  name: string
) {
  return { name};
}

type BasicTableProp = {
  companies : Company[] | undefined
}

const rows = [
  createData('Frozen yoghurt')
];

export default function CompaniesListingTable({companies} : BasicTableProp) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {companies?.map((company, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row" >
              <Link href={`/listings/companies/${company.id}`}>
                <p className='table-paragraph'>{company.name}</p>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}