import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
type Employee = {
    id: number | undefined;
    name: string | undefined;
    email: string | undefined;
    phoneNumber: string | undefined;
  };

type EmployeeTableProps = {
  employees: Employee[];
  onDeleteEmployee: (employeeId: number) => void;
};




const theme = createTheme({
  palette: {
    primary: {
      main: "#001f3f", // Navy Blue
    },
    secondary: {
      main: "#0074d9", // Blue (header color)
    },
  },
});

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(2),
  color: "#fff", // White text color
}));

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: "#fff", // White text color
  fontWeight: "bold",
  padding: theme.spacing(2),
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.primary.light,
  },
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.primary.main,
  },
}));

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, onDeleteEmployee }) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledTableContainer component={Paper}>
        <Table aria-label="employee table">
          <TableHead>
            <StyledTableRow>
              <StyledTableHeaderCell>ID</StyledTableHeaderCell>
              <StyledTableHeaderCell>Name</StyledTableHeaderCell>
              <StyledTableHeaderCell>Email</StyledTableHeaderCell>
              <StyledTableHeaderCell>Phone Number</StyledTableHeaderCell>
              <StyledTableHeaderCell>Action</StyledTableHeaderCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <StyledTableRow key={employee.id}>
                <StyledTableCell>{employee.id}</StyledTableCell>
                <StyledTableCell>{employee.name}</StyledTableCell>
                <StyledTableCell>{employee.email}</StyledTableCell>
                <StyledTableCell>{employee.phoneNumber}</StyledTableCell>
                <StyledTableCell>
                  <IconButton onClick={() => onDeleteEmployee(employee.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </ThemeProvider>
  );
};

export default EmployeeTable;

