import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer, Event } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, Typography, Button, Modal, useTheme } from "@mui/material";
import { tokens } from "../theme";
import "./scheduler.css";

const localizer = momentLocalizer(moment);

interface JobEvent extends Event {
  id: number | undefined;
  name: string | undefined;
  description: string | undefined;
  company: Company | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
  crew: Crew | undefined;
}

const Scheduler = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [jobs, setJobs] = useState<JobEvent[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobEvent | null>(null);

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/jobs`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: ApiJobResponse = await response.json();

      const parsedJobs: JobEvent[] = data.jobList.map((job: Job) => ({
        id: job.id,
        name: job.name,
        title: `${job.name} (${job.crew?.name})`,
        description: job.description,
        company: job.company,
        startDate: job.startDate ? new Date(job.startDate) : undefined,
        endDate: job.endDate ? new Date(job.endDate) : undefined,
        crew: job.crew,
      }));
      setJobs(parsedJobs);
      return data.jobList;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  const filteredEvents: JobEvent[] = jobs.filter(
    (event) => event.startDate !== undefined && event.endDate !== undefined
  );

  const handleJobClick = (event: JobEvent) => {
    console.log("Clicked Event ID:", event.id);
    console.log("Events Array:", filteredEvents);

    if (selectedJob && selectedJob.id === event.id) {
      setSelectedJob(null);
    } else {
      const clickedJob = filteredEvents.find((job) => job.id === event.id);

      if (clickedJob) {
        setSelectedJob(clickedJob);
      }
    }
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  const modalStyle = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div style={{ height: "100%", maxWidth: "100%" }}>
      <Calendar
        localizer={localizer}
        events={filteredEvents}
        startAccessor="startDate"
        endAccessor="endDate"
        style={{ width: "100%", height: "100%" }}
        onSelectEvent={handleJobClick}
      />
      {selectedJob && (
        <Modal
        open={!!selectedJob}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography  variant="h2">{selectedJob.name}</Typography>
          <fieldset style={{ margin: "15px 0" }}>
            <legend style={{ fontSize: "16px", fontWeight: "bold",}}>Crew</legend>
            <Typography variant="subtitle1">
              {selectedJob.crew?.name}
            </Typography>
          </fieldset>
          <fieldset style={{ marginBottom: "15px" }}>
            <legend style={{ fontSize: "16px", fontWeight: "bold" }}>Company</legend>
            <Typography variant="subtitle1">
              {selectedJob.company?.name}
            </Typography>
          </fieldset>
          <fieldset style={{ marginBottom: "15px" }}>
            <legend style={{ fontSize: "16px", fontWeight: "bold"}}>Description</legend>
            <Typography variant="subtitle1">
              {selectedJob.description}
            </Typography>
          </fieldset>
          <fieldset style={{ marginBottom: "15px" }}>
            <legend style={{ fontSize: "16px", fontWeight: "bold"}}>Period</legend>
            <Typography variant="subtitle1">
              Start Date: {selectedJob.startDate?.toDateString()}
            </Typography>
            <Typography variant="subtitle1">
              End Date: {selectedJob.startDate?.toDateString()}
            </Typography>
          </fieldset>
          <Button
            onClick={handleCloseModal}
            variant="contained"
            color="secondary"
          >
            Close
          </Button>
        </Box>
      </Modal>
      )}
    </div>
  );
};

export default Scheduler;
