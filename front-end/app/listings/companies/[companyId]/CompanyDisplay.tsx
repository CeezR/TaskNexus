"use client";
import { Box, Button, Modal, TextField, Typography, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "@/app/theme";

type CompanyDisplayProps = {
  companyId : string
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

const CompanyDisplay = ({companyId} : CompanyDisplayProps) => {
  const [company, setCompany] = useState<Company>();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleFormSubmit = async (values: InitialValues) => {
      alert(JSON.stringify(values, undefined, 2));
      handleClose();
      const res = await editCompany(values);
      setCompany(res);
  };

  useEffect(() => {
    getCompany();
  }, []);


  interface InitialValues {
    name: string | undefined;
    // lastName: string;
    // email: string;
    // contact: string;
    // address1: string;
    // address2: string;
  }

  const initialValues: InitialValues = {
    name: company?.name,
    // lastName: "",
    // email: "",
    // contact: "",
    // address1: "",
    // address2: "",
  };

  const getCompany = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/companies/${companyId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Company = await response.json();
      setCompany(data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  const deleteCompany = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/companies/${companyId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const editCompany = async (requestBody: InitialValues) => {
    const editedCompany: Company = {
      id: company?.id,
      name: requestBody.name
    }
  
    const response = await fetch(`http://localhost:8080/api/companies/${companyId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        
        body: JSON.stringify(editedCompany),
    });
    if (!response.ok) {
        throw new Error("Failed to add company");
    }
    return await response.json();
  };

  const handleDelete = async () => {
    await deleteCompany();
    router.push('/listings/companies');

  }
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <>
    <h1>Company</h1>
      <h2>{company?.name}</h2>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Company Details
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

export default CompanyDisplay