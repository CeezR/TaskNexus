"use client"
import React, { useState, useEffect } from 'react'

type Props ={
    params: {
        jobId: string;
    }
}

const page = (props: Props) => {
    const [job, setJob] = useState<Job>();

    // useEffect(() => {
    //     getJob();
    //   }, []);

    const getJob = async () => {
        try {
          const response = await fetch(
            `https://tasknexus.azurewebsites.net/api/jobs/${props.params.jobId}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data: Job = await response.json();
          setJob(data);
          return data;
        } catch (error) {
          console.error("Error fetching data:", error);
          return null;
        }
      };
    
  return (
  <section>
    <h1>Job</h1>
    <p>{job?.id}</p>
  </section>
  )
}

export default page
