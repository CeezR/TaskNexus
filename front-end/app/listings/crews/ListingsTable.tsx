import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from 'next/link';



type BasicTableProp = {
  crews : Crew[] | undefined
}

type Crew = {
  id: number | undefined,
  name: string | undefined,
  employees?: EmployeeApiResponse | undefined
}

type EmployeeApiResponse = {
employeeList: Employee[];
};

type Employee = {
id: number | undefined;
name: string | undefined;
email: string | undefined;
phoneNumber: string | undefined;
};

export default function ListingsTable({ crews }: BasicTableProp) {
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
                  <Link href={`/listings/crews/${crew.id}`}>
                    <p className='table-paragraph'>{crew.name}</p>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={1}>No crews found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}