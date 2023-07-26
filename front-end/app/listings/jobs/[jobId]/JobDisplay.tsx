"use client";
import { Box, Button, IconButton, MenuItem, Modal, Select, TextField, Typography, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Jobs from "../page";
import { describe } from "node:test";
import { ArrowBack, Description } from "@mui/icons-material";
import { tokens } from "@/app/theme";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

type JobDisplayProps = {
  jobId: string,
}

const style = {
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

const JobDisplay = ({ jobId }: JobDisplayProps) => {
  const [job, setJob] = useState<Job>();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [crews, setCrews] = useState<Crew[]>();
  const [companies, setCompanies] = useState<Company[]>();

  const handleFormSubmit = async (values: InitialValues) => {
    alert(JSON.stringify(values, undefined, 2));
    handleClose();
    const res = await editJob(values);
    setJob(res);

  };

  useEffect(() => {
    getJob();
    getCompanies();
    getCrew();
  }, []);

  const getCompanies = async () => {
    const response = await fetch("http://localhost:8080/api/companies");
    if (!response.ok) {
      throw new Error("Failed to add job");
    }
    const data = await response.json();
    setCompanies(data);
  }

  const getCrew = async () => {
    const response = await fetch("http://localhost:8080/api/crews");
    if (!response.ok) {
      throw new Error("Failed to add job");
    }
    const data = await response.json();
    setCrews(data);
  }

  interface InitialValues {
    name: string | undefined;
    description: string | undefined,
    status: string | undefined,
    companyId: number | undefined,
    crewId: number | undefined
    startDate: string | undefined,
    endDate: string | undefined
  }

  const initialValues: InitialValues = {
    name: job?.name,
    description: job?.description,
    status: job?.status,
    companyId: job?.company?.id,
    crewId: job?.crew?.id,
    startDate: job?.startDate,
    endDate: job?.endDate
  };

  const downloadFile = () => {
    const byteCharacters = atob(job?.fileData || "");
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" }); 
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${job?.name}.pdf`; 
    a.click();


    URL.revokeObjectURL(url);
  };

  const getJob = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/jobs/${jobId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Job = await response.json();
      console.log(data)
      setJob(data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  const deleteJob = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/jobs/${jobId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const editJob = async (requestBody: InitialValues) => {
    const editedJob: JobRequest = {
      id: job?.id,
      name: requestBody.name,
      description: requestBody.description,
      status: requestBody.status,
      companyId: requestBody.companyId,
      crewId: requestBody.crewId,
      startDate: requestBody.startDate,
      endDate: requestBody.endDate
    }

    const response = await fetch(`http://localhost:8080/api/jobs/${jobId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(editedJob),
    });
    if (!response.ok) {
      throw new Error("Failed to add job");
    }
    return await response.json();
  };

  const handleDelete = async () => {
    await deleteJob();
    router.push('/listings/jobs');

  }
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <>
      <Box display="flex" flexDirection="row" marginBottom="2rem" justifyContent="space-between">
        <IconButton
          onClick={() => router.push("/listings/jobs")}
        >
          <ArrowBack fontSize="large" />
        </IconButton>
        <Typography variant="h1" component="h1" fontWeight="500">
          Job
        </Typography>
        <Box visibility="hidden">
          <ArrowBack fontSize="large" />
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="center" margin="auto" width="100%" gap="10px" maxWidth="600px">
        <Typography variant="h2" component="h2" alignSelf="center">
          {job?.name}
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            onClick={handleDelete}
            variant="contained"
            color="error"
            sx={{ color: "white", background: colors.redAccent[700] }}
            startIcon={<DeleteIcon />}>
            Delete
          </Button>
          <Button
            onClick={handleOpen}
            variant="contained"
            color="warning"
            startIcon={<EditIcon />}
            sx={{ color: "white", background: colors.grey[700] }}
          >
            Edit
          </Button>
        </Stack>
        <fieldset className="custom-fieldset">
          <legend className="custom-legend"> Description</legend>
          <Typography variant="subtitle1" gutterBottom>
            {job?.description}
          </Typography>
        </fieldset>
        <fieldset>
          <legend>Status</legend>
          <Typography variant="subtitle1" gutterBottom>
            {job?.status}
          </Typography>
        </fieldset>
        <fieldset>
          <legend>Company</legend>
          <Typography variant="subtitle1" gutterBottom>
            {job?.company?.name}
          </Typography>
        </fieldset>
        <fieldset>
          <legend>Crew</legend>
          <Typography variant="subtitle1" gutterBottom>
            {job?.crew?.name}
          </Typography>
        </fieldset>
        <fieldset>
          <legend>Period</legend>
          <Typography variant="subtitle1">
            Start Date: {job?.startDate}
          </Typography>
          <Typography variant="subtitle1">
            End Date:  {job?.endDate}
          </Typography>
        </fieldset>
        <Box display="flex" justifyContent="center" mt="20px">
          <Button
            color="secondary"
            variant="contained"
            onClick={downloadFile}
            startIcon={<FileDownloadIcon />}
          >
            Download
          </Button>
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Job Details
            </Typography>
            <Box>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Box
                      display="grid"
                      gap="30px"
                      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                      sx={{
                        "& > div": {
                          gridColumn: isNonMobile ? undefined : "span 4",
                        },
                      }}
                    >
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        name="name"
                        error={!!touched.name && !!errors.name}
                        helperText={touched.name && errors.name}
                        sx={{ gridColumn: "span 4" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Descritpion"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.description}
                        name="description"
                        error={!!touched.description && !!errors.description}
                        helperText={touched.description && errors.description}
                        sx={{ gridColumn: "span 4" }}
                      />
                      <Select name="status" defaultValue={"Not Assigned"} onChange={handleChange} sx={{ gridColumn: "span 4" }}>
                        {/* Add the default option */}
                        <MenuItem value="Not Assigned">
                          Not Assigned
                        </MenuItem>
                        <MenuItem value="In progress">In progress</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                      </Select>
                      <Select name="crewId" defaultValue={"Select Crew"} onChange={handleChange} sx={{ gridColumn: "span 4" }}>
                        {/* Add the default option */}
                        <MenuItem value="Select Crew">Select Crew</MenuItem>
                        {/* Populate the select box with crew names */}
                        {crews?.map((crew) => (
                          <MenuItem key={crew.id} value={crew.id}>
                            {crew.name}
                          </MenuItem>
                        ))}
                      </Select>
                      <Select name="companyId" defaultValue={"Select Company"} onChange={handleChange} sx={{ gridColumn: "span 4" }}>
                        {/* Add the default option */}
                        <MenuItem value="Select Company">Select Company</MenuItem>

                        {/* Populate the select box with crew names */}
                        {companies?.map((company) => (
                          <MenuItem key={company.id} value={company.id}>
                            {company.name}
                          </MenuItem>
                        ))}
                      </Select>

                    </Box>
                    <Box display="flex" justifyContent="end" mt="20px">
                      <Button type="submit" color="secondary" variant="contained">
                        Edit
                      </Button>
                    </Box>
                  </form>
                )}
              </Formik>
            </Box>
          </Box>
        </Modal>
      </Box>
    </>
  )
}

export default JobDisplay