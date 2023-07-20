"use client";

import ListingsTable from "@/app/listings/crews/ListingsTable";
import AddEntityForm from "./AddCrewForm";
import { ChangeEvent, ChangeEventHandler, FormEvent, useEffect, useState } from "react";
import { InputBase, TextField, alpha, styled } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

type ApiCrewResponse ={
    crewList: Crew[]
}

type Crew = {
    id: number | undefined,
    name: string | undefined
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

export default function Crews() {
  const [crews, setCrews] = useState<Crew[]>([]);
  const [filteredCrews, setFilteredCrews] = useState<Crew[]>(crews);
  const [search, setsearch] = useState("")

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const searchText = event.currentTarget.value.toLowerCase();
    setsearch(searchText);
    setFilteredCrews(crews.filter((crew) => {
      if(crew.name !== undefined) {
        return crew.name.toLowerCase().startsWith(searchText)
      }
    }));
  };

  useEffect(() => {
    getCrews();
  }, []);

  useEffect(() => {
    setFilteredCrews(crews.filter((crew) => {
      if(crew.name) {
        return crew.name.toLowerCase().startsWith(search)
      }
    }));
  }, [crews])

  const getCrews = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/crews`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: ApiCrewResponse = await response.json();
      setCrews(data.crewList);
      setFilteredCrews(data.crewList);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  return (
    <div>
      <h1>Crews</h1>
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
      <AddEntityForm crews={crews} setCrews={setCrews} />
      <ListingsTable crews={filteredCrews} />
    </div>
  );
}
