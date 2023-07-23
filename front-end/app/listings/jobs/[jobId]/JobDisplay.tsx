"use client";
import { Box, Button, MenuItem, Modal, Select, TextField, Typography, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Jobs from "../page";
import { describe } from "node:test";
import { Description } from "@mui/icons-material";
import { tokens } from "@/app/theme";

type JobDisplayProps = {
  jobId : string
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

const JobDisplay = ({jobId} : JobDisplayProps) => {
  const [job, setJob] = useState<Job>();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleFormSubmit = async (values: InitialValues) => {
      alert(JSON.stringify(values, undefined, 2));
      handleClose();
      const res = await editJob(values);
      setJob(res);
  };

  useEffect(() => {
    getJob();
  }, []);


  interface InitialValues {
    name: string | undefined;
    description: string | undefined,
    status: string | undefined
    // contact: string;
    // address1: string;
    // address2: string;
  }

  const initialValues: InitialValues = {
    name: job?.name,
    description: job?.description,
    status: job?.status
    // contact: "",
    // address1: "",
    // address2: "",
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
    const editedJob: Job = {
      id: job?.id,
      name: requestBody.name,
      description: requestBody.description,
      status: requestBody.status

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
    <h1>Job</h1>
      <Stack direction="row" spacing={2}>
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
      <h2>Name: {job?.name}</h2>
      <h2>Description: {job?.description}</h2>
      <h2>Status: {job?.status}</h2>
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
                    <Select name="status" defaultValue={"To be completed"} onChange={handleChange} sx={{ gridColumn: "span 4" }}>
                      {/* Add the default option */}
                      <MenuItem value="To be completed">
                        To be completed
                      </MenuItem>
                      <MenuItem value="In progress">In progress</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
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
    </>
  )
}

export default JobDisplay