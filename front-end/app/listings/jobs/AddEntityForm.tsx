"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  TextField,
  Button,
  Modal,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import { Formik } from "formik";
import { tokens } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { type } from "os";

type AddEntityFormProps = {
  jobs: Job[];
  setJobs: Dispatch<SetStateAction<Job[]>>;
  crews: Crew[];
};

const AddEntityForm = ({ jobs, setJobs, crews }: AddEntityFormProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleFormSubmit = (values: InitialValues): void => {
    alert(JSON.stringify(values, undefined, 2));
    handleClose();
    postJob(values);
  };

  const postJob = async (requestBody: InitialValues) => {
    const response = await fetch("http://localhost:8080/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
      throw new Error("Failed to add job");
    }

    const data = await response.json();
    const newJob: Job = await data;
    setJobs((prevJobs) => [...prevJobs, newJob]);
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");


  interface InitialValues {
    name: string;
    description: string;
    status: string;
    crewId: number;
    // contact: string;
    // address1: string;
    // address2: string;
  }

  const initialValues: InitialValues = {
    name: "",
    description: "",
    status: "Not Assigned",
    crewId: 123
    // contact: "",
    // address1: "",
    // address2: "",
  };

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
  return (
    <Box>
      <Button
        onClick={handleOpen}
        variant="contained"
        color='secondary'
        sx={{ color: "white", background: colors.greenAccent[700] }}
      >
        Add Job
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Job Details
          </Typography>
          <Box>
            <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
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

                    <Select name="crews" defaultValue={"Select Crew"} onChange={handleChange} sx={{ gridColumn: "span 4" }}>
                      {/* Add the default option */}
                      <MenuItem value="Select Crew">Select Crew</MenuItem>

                      {/* Populate the select box with crew names */}
                      {crews.map((crew) => (
                        <MenuItem key={crew.id} value={crew.id}>
                          {crew.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {/* <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="Contact Number"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.contact}
                                            name="contact"
                                            error={!!touched.contact && !!errors.contact}
                                            helperText={touched.contact && errors.contact}
                                            sx={{ gridColumn: "span 4" }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="Address 1"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.address1}
                                            name="address1"
                                            error={!!touched.address1 && !!errors.address1}
                                            helperText={touched.address1 && errors.address1}
                                            sx={{ gridColumn: "span 4" }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="Address 2"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.address2}
                                            name="address2"
                                            error={!!touched.address2 && !!errors.address2}
                                            helperText={touched.address2 && errors.address2}
                                            sx={{ gridColumn: "span 4" }}
                                        /> */}
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px">
                    <Button
                      type="submit"
                      color="secondary"
                      variant="contained"
                      sx={{ color: "white", background: colors.greenAccent[700] }}
                    >
                      Submit
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddEntityForm;
