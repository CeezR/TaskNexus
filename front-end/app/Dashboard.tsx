// Dashboard component
'use client'
import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "./theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

import Header from "../components/Header";
import StatBox from "../components/StatBox";
import { ResponsivePie } from "@nivo/pie";
import { Height } from "@mui/icons-material";

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
            console.log("=== " + JSON.stringify(data, undefined, 2))
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
                    gridAutoRows="200px"
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

            {dashboard && dashboard.jobStatus.length > 0 && (
                <Box
                    gridColumn="span 7"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        backgroundColor: colors.primary[400], // Set the background color using sx prop
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "700px",
                        height: "400px",
                        margin: "50px",
                        color: "white"
                    }}
                >
                    
                    <ResponsivePie
                        data={dashboard.jobStatus}
                        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                        innerRadius={0.5}
                        padAngle={0.7}
                        cornerRadius={3}
                        activeOuterRadiusOffset={8}
                        borderWidth={1}
                        borderColor={{
                            from: 'color',
                            modifiers: [
                                [
                                    'darker',
                                    0.2
                                ]
                            ]
                        }}
                        arcLinkLabelsSkipAngle={10}
                        arcLinkLabelsTextColor={colors.grey[100]}
                        arcLinkLabelsThickness={2}
                        arcLinkLabelsColor={{ from: 'color' }}
                        arcLabelsSkipAngle={100}
                        arcLabelsTextColor={{
                            from: 'color',
                            modifiers: [
                                [
                                    'darker',
                                    2
                                ]
                            ]
                        }}
                        defs={[
                            {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                size: 4,
                                padding: 1,
                                stagger: true
                            },
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10
                            }
                        ]}
                        fill={[
                            {
                                match: {
                                    id: 'In-progress'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'c'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'Completed'
                                },
                                id: 'lines'
                            },
                            {
                                match: {
                                    id: 'To-Be-Completed'
                                },
                                id: 'dots'
                            }
                        ]}
                        legends={[
                            {
                                anchor: 'bottom',
                                direction: 'row',
                                justify: false,
                                translateX: 0,
                                translateY: 56,
                                itemsSpacing: 0,
                                itemWidth: 100,
                                itemHeight: 18,
                                itemTextColor: 'white',
                                itemDirection: 'left-to-right',
                                itemOpacity: 1,
                                symbolSize: 18,
                                symbolShape: 'circle',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemTextColor: '#fff'
                                        }
                                    }
                                ]
                            }
                        ]}
                    />
                </Box>
            )}


        </Box>
    );
};

export default Dashboard;
