"use client";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";

type EmployeeDisplayProps = {
  employeeId: string;
};

type Employee = {
  id: number | undefined;
  name: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
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

const EmployeeDisplay = ({ employeeId }: EmployeeDisplayProps) => {
  const [employee, setEmployee] = useState<Employee>();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormSubmit = async (values: InitialValues) => {
    alert(JSON.stringify(values, undefined, 2));
    handleClose();
    const res = await editEmployee(values);
    setEmployee(res);
  };

  useEffect(() => {
    getEmployee();
  }, []);

  interface InitialValues {
    name: string | undefined;
    email: string | undefined;
    phoneNumber: string | undefined;
  }

  const initialValues: InitialValues = {
    name: employee?.name,
    email: employee?.email,
    phoneNumber: employee?.phoneNumber,
  };

  const getEmployee = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/employees/${employeeId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Employee = await response.json();
      setEmployee(data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  const deleteEmployee = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/employees/${employeeId}`,
        {
          method: "DELETE",
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const editEmployee = async (requestBody: InitialValues) => {
    const editedEmployee: Employee = {
      id: employee?.id,
      name: requestBody.name,
      email: requestBody.email,
      phoneNumber: requestBody.phoneNumber,
    };

    const response = await fetch(
      `http://localhost:8080/api/employees/${employeeId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(editedEmployee),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to add employee");
    }
    return await response.json();
  };

  const handleDelete = async () => {
    await deleteEmployee();
    router.push("/listings/employees");
  };
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <>
      <h1>Employee</h1>
      <h2>{employee?.name}</h2>
      <Stack direction="row" spacing={2}>
        <Button
          onClick={handleDelete}
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
        <Button
          onClick={handleOpen}
          variant="outlined"
          color="warning"
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
      </Stack>
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
                      Edit
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      </Modal>
      <img height={"100px"} src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"></img>
      <p>Phone: {employee?.phoneNumber}</p>
      <p>Email: {employee?.email}</p>
    </>
  );
};

export default EmployeeDisplay;
