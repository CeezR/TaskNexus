"use client";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer, Event } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "react-modal";
import styles from "./style.module.css";

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
        title: `${job.crew?.name} - ${job.name}`,
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
      <Modal
        isOpen={!!selectedJob}
        onRequestClose={handleCloseModal}
        contentLabel="Job Details"
        className={styles.modal}
        overlayClassName={styles["modal-overlay"]}
        ariaHideApp={false}
      >
        {selectedJob && (
          <div>
            <h2>
              {selectedJob.crew?.name} {selectedJob.name}
            </h2>
            <h3>Company: {selectedJob.company?.name}</h3>
            <p>Description: {selectedJob.description}</p>
            <p>Start Date: {selectedJob.startDate?.toDateString()}</p>
            <p>End Date: {selectedJob.endDate?.toDateString()}</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Scheduler;
