"use client";
import { Box, Button, IconButton, Modal, TextField, Typography, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import CrewMember from "./CrewMember";
import EmployeeTable from "./EmployeeTable";
import { ArrowBack } from "@mui/icons-material";
import { tokens } from "@/app/theme";


type CrewDisplayProps = {
  crewId: string
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

const CrewDisplay = ({ crewId }: CrewDisplayProps) => {
  const [crew, setCrew] = useState<Crew>();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleFormSubmit = async (values: InitialValues) => {

    const res = await editCrew(values);
    setCrew(res);
    handleClose();
    getCrew();
  };

  useEffect(() => {
    getCrew();
  }, [crewId]);


  interface InitialValues {
    name: string | undefined;
  }

  const initialValues: InitialValues = {
    name: crew?.name,
  };

  const getCrew = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/crews/${crewId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Crew = await response.json();
      setCrew(data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  const deleteCrew = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/crews/${crewId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const editCrew = async (requestBody: InitialValues) => {
    const editedCrew: Crew = {
      id: crew?.id,
      name: requestBody.name
    }

    const response = await fetch(`http://localhost:8080/api/crews/${crewId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(editedCrew),
    });
    if (!response.ok) {
      throw new Error("Failed to add crew");
    }
    return await response.json();
  };

  const handleDelete = async () => {
    await deleteCrew();
    router.push('/listings/crews');

  }

  const handleDeleteEmployee = async (employeeId: number) => {
    try {
      const requestBody = {
        id: crewId,
        employeeIds: [employeeId],
      };
      const response = await fetch(
        `http://localhost:8080/api/crews/removeEmployees`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete employee");
      }

      getCrew();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateCrew = async () => {

    const updatedCrew = await getCrew();
    if (updatedCrew) {
      setCrew(updatedCrew);
    }
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <>
      <Box display="flex" flexDirection="row" marginBottom="2rem" justifyContent="space-between">
        <IconButton
          onClick={() => router.push("/listings/crews")}
        >
          <ArrowBack fontSize="large" />
        </IconButton>
        <Typography variant="h3" component="h1" fontWeight="500" alignSelf="center">
          Crew
        </Typography>
        <Box visibility="hidden">
          <ArrowBack fontSize="large" />
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="center" margin="auto" width="100%" gap="10px" maxWidth="600px">
      <Typography variant="h2" component="h2" alignSelf="center">
          {crew?.name}
        </Typography>
        <Stack direction="row" spacing={2} alignSelf="center">
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
        <CrewMember crewId={crewId} onUpdateCrew={handleUpdateCrew} />
        {crew?.employees && crew.employees.length > 0 && (
          <Box mt={2}>
            <Typography variant="h2" component="h2" alignSelf="center">
              Crew Members
            </Typography>
            <EmployeeTable employees={crew.employees} onDeleteEmployee={handleDeleteEmployee} />
          </Box>
        )}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Crew Details
            </Typography>
            <Box mt={2}>
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

                    </Box>
                    <Box display="flex" justifyContent="end" mt={2}>
                      <Button
                        type="submit"
                        color="warning"
                        variant="contained"
                        sx={{ color: "white", background: colors.grey[700] }}
                      >
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

export default CrewDisplay;

