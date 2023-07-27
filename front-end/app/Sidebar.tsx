import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { ColorModeContext, tokens } from "./theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useContext } from "react";
import { useRouter } from "next/navigation";

interface ItemProps {
  title: string;
  icon: JSX.Element;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  onClick?: () => void;
  to?: string;
}

const Item: React.FC<ItemProps> = ({
  title,
  icon,
  selected,
  setSelected,
  onClick,
  to,
}) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => {
        setSelected(title);
        if (onClick) onClick();
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState("Dashboard");
  const colorMode = useContext(ColorModeContext);
  const router = useRouter();

  const handleThemeChange = () => {
    colorMode.toggleColorMode();
  };

  const handleLink = async (path: string) => {
    router.push(path);
  };

  const handleSidebarToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={handleSidebarToggle}
            icon={
              isCollapsed ? (
                <MenuOutlinedIcon />
              ) : (
                <IconButton onClick={handleSidebarToggle}>
                  <MenuOutlinedIcon />
                </IconButton>
              )
            }
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  TaskNexus
                </Typography>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Home"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              onClick={() => handleLink("/")}
            />
            <Item
              title="Schedule"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              onClick={() => handleLink("/schedule")}
            />
            <Item
              title="Jobs"
              icon={<WorkOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              onClick={() => handleLink("/listings/jobs")}
            />
            <Item
              title="Company"
              icon={<CorporateFareOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              onClick={() => handleLink("/listings/companies")}
            />
            <Item
              title="Employees"
              icon={<Person2OutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              onClick={() => handleLink("/listings/employees")}
            />
            <Item
              title="Crew"
              icon={<GroupsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              onClick={() => handleLink("/listings/crews")}
            />
            <Item
              title="Theme"
              icon={
                colorMode.mode === "dark" ? (
                  <DarkModeOutlinedIcon />
                ) : (
                  <LightModeOutlinedIcon />
                )
              }
              selected={selected}
              setSelected={setSelected}
              onClick={handleThemeChange}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
