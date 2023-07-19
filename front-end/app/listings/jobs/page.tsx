"use client";

import ListingsTable from "@/app/listings/ListingsTable";
import AddEntityForm from "./AddEntityForm";
import { ChangeEvent, ChangeEventHandler, FormEvent, useEffect, useState } from "react";
import { InputBase, TextField, alpha, styled } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';


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

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);
  const [search, setsearch] = useState("")

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const searchText = event.currentTarget.value.toLowerCase();
    setsearch(searchText);
    setFilteredJobs(jobs.filter((job) => job.name.toLowerCase().startsWith(searchText)));
  };

  useEffect(() => {
    getJobs();
  }, []);

  useEffect(() => {
    setFilteredJobs(jobs.filter((job) => job.name.toLowerCase().startsWith(search)));
  }, [jobs])

  const getJobs = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/jobs`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: ApiJobResponse = await response.json();
      setJobs(data.jobList);
      setFilteredJobs(data.jobList);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  return (
    <div>
      <h1>Jobs</h1>
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
      <AddEntityForm jobs={jobs} setJobs={setJobs} />
      <ListingsTable jobs={filteredJobs} />
    </div>
  );
}
