"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
  Box,
  Typography,
  useTheme,
  TextField,
  Button,
  Modal,
} from "@mui/material";
import { Formik } from "formik";
import { tokens } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";

type AddCrewFormProps = {
  crews: Crew[];
  setCrews: Dispatch<SetStateAction<Crew[]>>;
};

const AddCrewForm = ({ crews, setCrews }: AddCrewFormProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormSubmit = (values: InitialValues): void => {
    handleClose();
    postCrew(values);
  };

  const postCrew = async (requestBody: InitialValues) => {
    const response = await fetch("https://tasknexus123.azurewebsites.net/api/crews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
      throw new Error("Failed to add crew");
    }

    const data = await response.json();
    const newCrew: Crew = await data;
    setCrews((prevCrews) => [...prevCrews, newCrew]);
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  interface InitialValues {
    name: string;
  }

  const initialValues: InitialValues = {
    name: "",
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
        color="secondary"
        sx={{ color: "white", background: colors.greenAccent[700] }}
      >
        Add Crew
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Crew Details
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
                  </Box>
                  <Box display="flex" justifyContent="space-between" mt="20px">
                    <Button
                      onClick={handleClose}
                      variant="contained"
                      color="secondary"
                      sx={{
                        color: "white",
                        background: colors.redAccent[500],
                      }}
                    >
                      Close
                    </Button>
                    <Button
                      type="submit"
                      color="secondary"
                      variant="contained"
                      sx={{
                        color: "white",
                        background: colors.greenAccent[700],
                      }}
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

export default AddCrewForm;
