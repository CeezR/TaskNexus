//import React, { useState, useEffect } from "react";
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "@/app/theme";
import { useTheme } from "@mui/material";



const PieChart: React.FC<Dashboard> = ({ jobStatus }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  console.log("jobStatus="+ jobStatus)
  // const [loading, setLoading] = useState(true);

  // const [dashboardData, setDashboardData] = useState<Dashboard | null>(null);

  // const getDashboardData = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:8080/api/dashboard`);
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const data: Dashboard = await response.json();
  //     setDashboardData(data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getDashboardData();
  // }, []);

  const ddata = [
    {
       "color":"hsl(27, 70%, 50%)",
       "id":"In-progress",
       "label":"In progress",
       "value":20
    },
    {
       "color":"hsl(347, 70%, 50%)",
       "id":"Completed",
       "label":"completed",
       "value":50
    },
    {
       "color":"hsl(347, 70%, 50%)",
       "id":"To-Be-Completed",
       "label":"To-Be-Completed",
       "value":30
    }
 ]



  return (
    <>
      {jobStatus && (
        <ResponsivePie
          data={jobStatus}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: colors.grey[100],
                },
              },
              legend: {
                text: {
                  fill: colors.grey[100],
                },
              },
              ticks: {
                line: {
                  stroke: colors.grey[100],
                  strokeWidth: 1,
                },
                text: {
                  fill: colors.grey[100],
                },
              },
            },
            legends: {
              text: {
                fill: colors.grey[100],
              },
            },
          }}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor={colors.grey[100]}
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          enableArcLabels={false}
          arcLabelsRadiusOffset={0.4}
          arcLabelsSkipAngle={7}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: "#999",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                  },
                },
              ],
            },
          ]}
        />
      ) }
    </>
   
  );
};

export default PieChart;
