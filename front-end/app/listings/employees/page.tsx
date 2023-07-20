"use client";

import { ChangeEvent, ChangeEventHandler, FormEvent, useEffect, useState } from "react";
import { InputBase, TextField, alpha, styled } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import EmployeeListingTable from "./EmployeeListingTable";

type EmployeeApiResponse ={
    employeeList: Employee[]
}

type Employee = {
    id: number | undefined,
    name: string | undefined,
    email: string | undefined
}


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>(employees);
  const [search, setsearch] = useState("")

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const searchText = event.currentTarget.value.toLowerCase();
    setsearch(searchText);
    setFilteredEmployees(employees.filter((employee) => {
      if(employee.name !== undefined) {
        return employee.name.toLowerCase().startsWith(searchText)
      }
    }));
  };

  useEffect(() => {
    getEmployees();
  }, []);

  useEffect(() => {
    setFilteredEmployees(employees.filter((employee) => {
        if(employee.name !== undefined) {
          return employee.name.toLowerCase().startsWith(search)
        }
      }));
  }, [employees])

  const getEmployees = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/employees`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: EmployeeApiResponse = await response.json();
      setEmployees(data.employeeList);
      setFilteredEmployees(data.employeeList);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  return (
    <div>
      <h1>Employees</h1>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          value={search}
          onChange={(event) => handleSearchChange(event)}
        />
      </Search>
      {/* <AddEntityForm jobs={jobs} setJobs={setJobs} /> */}
      <EmployeeListingTable employees={filteredEmployees} />
    </div>
  );
}
