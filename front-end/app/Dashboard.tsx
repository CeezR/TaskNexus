// Dashboard component
'use client'
import React, { useState, useEffect } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "./theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

import Header from "../components/Header";
import StatBox from "../components/StatBox";
import PieChart from "@/components/PieChart";

type JobStatus = {
    color: string;
    id: string;
    label: string;
    value: number;
};

type Statbox = {
    subtitle: string;
    progress: number;
    title: string;
    increase: number;
};

type Dashboard = {
    jobStatus: JobStatus[];
    statbox: Statbox[]
}

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [dashboard, setDashboard] = useState<Dashboard | null>(null);

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

        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="HOME" subtitle="Welcome to your dashboard" />

                <Box>
                    <Button
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                    >
                        <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                        Download Reports
                    </Button>
                </Box>
            </Box>

            {dashboard && (
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gap="20px"
                   
                >
                    {/* Iterate through StatBox data */}
                    {dashboard.statbox.map((item, index) => (
                        <Box
                            key={index}
                            gridColumn="span 3"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            padding="20px"
                            sx={{
                                backgroundColor: colors.primary[400], // Set the background color using sx prop
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
                    alignItems="center"
                    justifyContent="center"
                    width="700px"
                    height="400px"
                    sx={{
                        backgroundColor: colors.primary[400], // Set the background color using sx prop
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "20px",
                    }}
                >
                    <PieChart jobStatus={dashboard.jobStatus}/>
                </Box>



            )}




        </Box>
    );
};

export default Dashboard;
