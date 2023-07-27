import React, { useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  TextField,
  Button,
  Modal,
  Select,
  MenuItem,
} from "@mui/material";
import { Formik } from "formik";
import { tokens } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import DropZone from "@/components/DropZone";

type AddEntityFormProps = {
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  crews: Crew[];
  companies: Company[];
};

const AddEntityForm: React.FC<AddEntityFormProps> = ({
  companies,
  setJobs,
  crews,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileSelect = (files: FileList) => {
    setSelectedFiles(files);
  };

  const handleFormSubmit = async (values: InitialValues): Promise<void> => {
    const formData = new FormData();
    if (selectedFiles != null && selectedFiles.length > 0) {
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("files", selectedFiles[i]);
      }
    }

    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("status", values.status);
    formData.append("companyId", values.companyId);
    formData.append("crewId", values.crewId);
    formData.append("startDate", values.startDate);
    formData.append("endDate", values.endDate);

    try {
      const response = await fetch("http://localhost:8080/api/jobs", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add job");
      }

      const data = await response.json();
      const newJob: Job = await data;
      setJobs((prevJobs) => [...prevJobs, newJob]);
      handleClose();
    } catch (error) {
      console.error("Error while submitting the form:", error);
    }
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  interface InitialValues {
    name: string;
    description: string;
    status: string;
    companyId: string;
    crewId: string;
    startDate: string;
    endDate: string;
  }

  const initialValues: InitialValues = {
    name: "",
    description: "",
    status: "Not Assigned",
    companyId: "",
    crewId: "",
    startDate: "",
    endDate: "",
  };

  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

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
                    gridTemplateColumns="repeat(8, minmax(0, 1fr))"
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
                      sx={{ gridColumn: "span 8" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.description}
                      name="description"
                      error={!!touched.description && !!errors.description}
                      helperText={touched.description && errors.description}
                      sx={{ gridColumn: "span 8" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="date"
                      label="Start date"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.startDate}
                      name="startDate"
                      error={!!touched.startDate && !!errors.startDate}
                      helperText={touched.startDate && errors.startDate}
                      sx={{ gridColumn: "span 4" }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        placeholder: "",
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="date"
                      label="End date"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.endDate}
                      name="endDate"
                      error={!!touched.endDate && !!errors.endDate}
                      helperText={touched.endDate && errors.endDate}
                      sx={{ gridColumn: "span 4" }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        placeholder: "",
                      }}
                    />
                    <Select
                      name="status"
                      defaultValue={"Not Assigned"}
                      onChange={handleChange}
                      sx={{ gridColumn: "span 8" }}
                    >
                      <MenuItem value="Not Assigned">Not Assigned</MenuItem>
                      <MenuItem value="In progress">In progress</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                    </Select>

                    <Select
                      name="crewId"
                      defaultValue={"Select Crew"}
                      onChange={handleChange}
                      sx={{ gridColumn: "span 4" }}
                    >
                      <MenuItem value="Select Crew">Select Crew</MenuItem>
                      {crews.map((crew) => (
                        <MenuItem key={crew.id} value={crew.id}>
                          {crew.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <Select
                      name="companyId"
                      defaultValue={"Select Company"}
                      onChange={handleChange}
                      sx={{ gridColumn: "span 4" }}
                    >
                      <MenuItem value="Select Company">Select Company</MenuItem>
                      {companies.map((company) => (
                        <MenuItem key={company.id} value={company.id}>
                          {company.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <DropZone
                      handleFileSelect={handleFileSelect}
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

export default AddEntityForm;
