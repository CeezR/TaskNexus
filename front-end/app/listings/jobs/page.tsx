"use client"

import ListingsTable from "@/app/listings/ListingsTable";
import AddEntityForm from "./AddEntityForm";
import { useEffect, useState } from "react";


export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    getJobs();
  }, [])

  const getJobs = async () => {
    try {
      const response = await fetch(`https://tasknexus.azurewebsites.net/api/jobs`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: ApiJobResponse = await response.json();
      setJobs(data.jobList)
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  return (

    <div>
      <h1>Jobs</h1>
      <AddEntityForm jobs={jobs} setJobs={setJobs} />
      <ListingsTable jobs={jobs} />
    </div>
  )

}