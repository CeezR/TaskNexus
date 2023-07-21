import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import { ArrowForward } from "@mui/icons-material";
import { useRouter } from "next/navigation";

type Employee = {
  id: number | undefined;
  name: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
};

type EmployeeTableProp = {
  employees: Employee[] | undefined;
};

export default function EmployeeListingTable({ employees }: EmployeeTableProp) {
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
          {employees?.map((employee, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <div className='tableListing__row' onClick={() => router.push(`/listings/employees/${employee.id}`)}>
                    <p className='table-paragraph'>{employee.name}</p>
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
