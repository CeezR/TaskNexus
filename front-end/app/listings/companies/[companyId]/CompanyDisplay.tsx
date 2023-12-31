"use client";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import CompanyMember from "./CompanyMember";
import JobTable from "./JobTable";
import { ArrowBack } from "@mui/icons-material";
import { tokens } from "@/app/theme";

type CompanyDisplayProps = {
  companyId: string;
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

const CompanyDisplay = ({ companyId }: CompanyDisplayProps) => {
  const [company, setCompany] = useState<Company>();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleFormSubmit = async (values: InitialValues) => {
    const res = await editCompany(values);
    setCompany(res);
    handleClose();
    getCompany();
  };

  useEffect(() => {
    getCompany();
  }, [companyId]);

  interface InitialValues {
    name: string | undefined;
    email: string | undefined;
    phoneNumber: string | undefined;
  }

  const initialValues: InitialValues = {
    name: company?.name,
    email: company?.email,
    phoneNumber: company?.phoneNumber,
  };

  const getCompany = async () => {
    try {
      const response = await fetch(
        `https://tasknexus123.azurewebsites.net/api/companies/${companyId}`
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
      const response = await fetch(
        `https://tasknexus123.azurewebsites.net/api/companies/${companyId}`,
        {
          method: "DELETE",
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const editCompany = async (requestBody: InitialValues) => {
    const editedCompany: Company = {
      id: company?.id,
      name: requestBody.name,
      email: requestBody.email,
      phoneNumber: requestBody.phoneNumber,
    };

    const response = await fetch(
      `https://tasknexus123.azurewebsites.net/api/companies/${companyId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(editedCompany),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to add company");
    }
    return await response.json();
  };

  const handleDelete = async () => {
    await deleteCompany();
    router.push("/listings/companies");
  };

  const handleDeleteJob = async (jobId: number) => {
    try {
      const requestBody = {
        id: companyId,
        jobIds: [jobId],
      };
      const response = await fetch(
        `https://tasknexus123.azurewebsites.net/api/companies/removeJobs`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete job");
      }

      getCompany();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateCompany = async () => {
    const updatedCompany = await getCompany();
    if (updatedCompany) {
      setCompany(updatedCompany);
    }
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        marginBottom="2rem"
        justifyContent="space-between"
      >
        <IconButton onClick={() => router.push("/listings/companies")}>
          <ArrowBack fontSize="large" />
        </IconButton>
        <Typography
          variant="h3"
          component="h1"
          fontWeight="500"
          alignSelf="center"
        >
          Company
        </Typography>
        <Box visibility="hidden">
          <ArrowBack fontSize="large" />
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        margin="auto"
        width="100%"
        gap="10px"
        maxWidth="600px"
      >
        <Typography variant="h2" component="h2" alignSelf="center">
          {company?.name}
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            onClick={handleDelete}
            variant="contained"
            color="error"
            sx={{ color: "white", background: colors.redAccent[700] }}
            startIcon={<DeleteIcon />}
          >
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
          <legend className="custom-legend">Phone</legend>
          <Typography variant="subtitle1" gutterBottom>
            {company?.phoneNumber}
          </Typography>
        </fieldset>
        <fieldset className="custom-fieldset">
          <legend className="custom-legend">Email</legend>
          <Typography variant="subtitle1" gutterBottom>
            {company?.email}
          </Typography>
        </fieldset>

        <CompanyMember
          companyId={companyId}
          onUpdateCompany={handleUpdateCompany}
        />
        {company?.jobs && company.jobs.length > 0 && (
          <Box mt={2}>
            <Typography variant="h2" component="h2" alignSelf="center">
              Company Jobs
            </Typography>
            <JobTable jobs={company.jobs} onDeleteJob={handleDeleteJob} />
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
              Edit Company Details
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
  );
};

export default CompanyDisplay;
