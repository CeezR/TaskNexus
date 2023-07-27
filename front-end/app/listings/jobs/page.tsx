"use client";

import ListingsTable from "@/app/listings/jobs/ListingsTable";
import AddEntityForm from "./AddEntityForm";
import { ChangeEvent, useEffect, useState } from "react";
import { Box, InputBase, TextField, alpha, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);
  const [search, setsearch] = useState("");
  const [managedCrew, setManagedCrew] = useState<Crew[]>([]);

  const handleSearchChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const searchText = event.currentTarget.value.toLowerCase();
    setsearch(searchText);
    setFilteredJobs(
      jobs.filter((job) => {
        if (job.name !== undefined) {
          return job.name.toLowerCase().startsWith(searchText);
        }
      })
    );
  };

  useEffect(() => {
    getJobs();
    getCrew();
    getCompanies();
  }, []);

  useEffect(() => {
    setFilteredJobs(
      jobs.filter((job) => {
        if (job.name) {
          return job.name.toLowerCase().startsWith(search);
        }
      })
    );
  }, [jobs]);

  const getCrew = async () => {
    const response = await fetch("https://tasknexus123.azurewebsites.net/api/crews");
    if (!response.ok) {
      throw new Error("Failed to add job");
    }
    const data = await response.json();
    setManagedCrew(data);
  };

  const getJobs = async () => {
    try {
      const response = await fetch(`https://tasknexus123.azurewebsites.net/api/jobs`);
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

  const getCompanies = async () => {
    const response = await fetch("https://tasknexus123.azurewebsites.net/api/companies");
    if (!response.ok) {
      throw new Error("Failed to add job");
    }
    const data = await response.json();
    setCompanies(data);
  };

  return (
    <Box className="EntityListing">
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
      <AddEntityForm
        companies={companies}
        setJobs={setJobs}
        crews={managedCrew}
      />
      <ListingsTable jobs={filteredJobs} />
    </Box>
  );
}
