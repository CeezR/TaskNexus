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
import { type } from "os";

type Employee = {
  id: number | undefined;
  name: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
};

type AddEntityFormProps = {
  setEmployees: Dispatch<SetStateAction<Employee[]>>;
};

const AddEmployeeForm = ({ setEmployees }: AddEntityFormProps) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormSubmit = (values: InitialValues): void => {
    alert(JSON.stringify(values, undefined, 2));
    handleClose();
    postEmployee(values);
  };

  const postEmployee = async (requestBody: InitialValues) => {
    const response = await fetch("http://localhost:8080/api/employees", {
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
    const newEmployee: Employee = await data;
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  interface InitialValues {
    name: string;
    email: string;
    phoneNumber: string;
  }

  const initialValues: InitialValues = {
    name: "",
    email: "",
    phoneNumber: "",
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
        variant="outlined"
        sx={{ color: "white", background: "red" }}
      >
        Add Employee
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Employee Details
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
                      label="Email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Phone Number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.phoneNumber}
                      name="phoneNumber"
                      error={!!touched.phoneNumber && !!errors.phoneNumber}
                      helperText={touched.phoneNumber && errors.phoneNumber}
                      sx={{ gridColumn: "span 4" }}
                    />
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px">
                    <Button type="submit" color="secondary" variant="contained">
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

export default AddEmployeeForm;
