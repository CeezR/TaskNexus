"use client";
import ListingsTable from "@/app/listings/crews/ListingsTable";
import AddEntityForm from "./AddCrewForm";
import { ChangeEvent, useEffect, useState } from "react";
import { InputBase, alpha, styled } from "@mui/material";
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

export default function Crews() {
  const [crews, setCrews] = useState<Crew[]>([]);
  const [search, setSearch] = useState("");

  const handleSearchChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const searchText = event.currentTarget.value.toLowerCase();
    setSearch(searchText);
  };

  useEffect(() => {
    getCrews();
  }, []);

  const getCrews = async () => {
    try {
      const response = await fetch(`https://tasknexus123.azurewebsites.net/api/crews`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Crew[] = await response.json();
      setCrews(data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  return (
    <section className="EntityListing">
      <Header title="CREWS" subtitle="" />
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
      <ListingsTable crews={crews} />
    </section>
  );
}
