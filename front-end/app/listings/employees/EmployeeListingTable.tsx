import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";

type Employee = {
  id: number | undefined;
  name: string | undefined;
  email: string | undefined;
};

type EmployeeTableProp = {
  employees: Employee[] | undefined;
};

export default function EmployeeListingTable({ employees }: EmployeeTableProp) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees?.map((employee, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Link href={`/listings/employees/${employee.id}`}>
                  <p className="table-paragraph">{employee.name}</p>
                </Link>
              </TableCell>
              <TableCell>
              <Link href={`/listings/employees/${employee.id}`}>
                  <p className="table-paragraph">{employee.email}</p>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
