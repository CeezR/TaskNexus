"use client";
import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";

type Props = {
  params: {
    jobId: string;
  };
};

const page = (props: Props) => {
  const [job, setJob] = useState<Job>();

  useEffect(() => {
    getJob();
  }, []);

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

  const deleteJob = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/jobs/${job?.id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = () => {
    deleteJob();
  }

  const handleEdit = () => {
    
  }

  return (
    <section>
      <h1>Job</h1>
      <h2>{job?.name}</h2>
      <Stack direction="row" spacing={2}>
        <Button onClick={handleDelete} variant="outlined" color="error" startIcon={<DeleteIcon />}>
          Delete
        </Button>
        <Button onClick={handleEdit} variant="outlined" color="warning" startIcon={<EditIcon />}>
          Edit
        </Button>
      </Stack>
    </section>
  );
};

export default page;
