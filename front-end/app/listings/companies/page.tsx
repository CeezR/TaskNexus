"use client";
import CompaniesListingTable from "./CompaniesListingTable";
import CompaniesAddEntityForm from "./CompaniesAddEntityForm";
import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { Box, InputBase, TextField, alpha, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Header from "@/components/Header";

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

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] =
    useState<Company[]>(companies);
  const [search, setsearch] = useState("");

  const handleSearchChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const searchText = event.currentTarget.value.toLowerCase();
    setsearch(searchText);
    setFilteredCompanies(
      companies.filter((companies) => {
        if (companies.name !== undefined) {
          return companies.name.toLowerCase().startsWith(searchText);
        }
      })
    );
  };

  useEffect(() => {
    getCompanies();
  }, []);

  useEffect(() => {
    setFilteredCompanies(
      companies.filter((company) => {
        if (company.name) {
          return company.name.toLowerCase().startsWith(search);
        }
      })
    );
  }, [companies]);

  const getCompanies = async () => {
    try {
      const response = await fetch(`https://tasknexus123.azurewebsites.net/api/companies`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Company[] = await response.json();
      setCompanies(data);
      setFilteredCompanies(data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  return (
    <Box className="EntityListing">
      <Header title="COMPANIES" subtitle="" />
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
      <CompaniesAddEntityForm
        companies={companies}
        setCompanies={setCompanies}
      />
      <CompaniesListingTable companies={filteredCompanies} />
    </Box>
  );
}
