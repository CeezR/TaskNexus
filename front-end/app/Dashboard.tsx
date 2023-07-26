// Dashboard component
'use client'
import React, { useState, useEffect } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { tokens } from "./theme";
import Header from "../components/Header";
import StatBox from "../components/StatBox";
import PieChart from "@/components/PieChart";
import QuickFilteringGrid from "@/components/Filtertable";



const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [dashboard, setDashboard] = useState<Dashboard | null>(null);
    const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

    const getDashboardData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/dashboard`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data: Dashboard = await response.json();
            setDashboard(data);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getDashboardData();
    }, []);



    return (

        <Box m="20px"
        width={isDesktop ? "100%" : "70%"}>
            <Box >
                <Header title="HOME" subtitle="Welcome to your dashboard" />
            </Box>

            {dashboard && (
                <Box
                    display="grid"
                    gridTemplateColumns={isDesktop ? "repeat(12, 3fr)" : "repeat(12, 1fr)"}
                    gap="10px"
                >
                    {dashboard.statbox.map((item, index) => (
                        <Box
                            key={index}
                            gridColumn={isDesktop ? `span 3` : "span 12"}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            padding="10px"
                            sx={{
                                backgroundColor: colors.primary[400],
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <StatBox
                                title={item.title}
                                subtitle={item.subtitle}
                                progress={item.progress}
                                increase={item.increase.toString()}
                                icon={null}
                            />
                        </Box>
                    ))}
                </Box>

            )}

            {dashboard && (

                <Box
                    gridColumn="span 3"
                    display="flex"
                    width="100%"
                    height="300px"
                    sx={{
                        backgroundColor: colors.primary[400],
                        display: "flex",
                        margin: "20px 0",
                    }}
                >
                    <PieChart jobStatus={dashboard.jobStatus} />
                </Box>
            )}
            <Box sx={{ borderTop: "1px solid grey" }}
            >
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    m="40px 0 0 0"
                    textAlign="center"
                >Jobs Table
                </Typography>
                <QuickFilteringGrid />
            </Box>
        </Box>
    );
};

export default Dashboard;
