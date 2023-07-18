"use client"
import React from 'react'
import {
    Box,
    Typography,
    useTheme,
    TextField,
    Button,
    Modal,
} from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";


const AddEntityForm = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleFormSubmit = (values: InitialValues): void => {
        alert(JSON.stringify(values, undefined, 2));
        handleClose();
    };

    const isNonMobile = useMediaQuery("(min-width:600px)");


    interface InitialValues {
        firstName: string;
        // lastName: string;
        // email: string;
        // contact: string;
        // address1: string;
        // address2: string;
    }

    const initialValues: InitialValues = {
        firstName: "",
        // lastName: "",
        // email: "",
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
                                            label="First Name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.firstName}
                                            name="firstName"
                                            error={!!touched.firstName && !!errors.firstName}
                                            helperText={touched.firstName && errors.firstName}
                                            sx={{ gridColumn: "span 2" }}
                                        />
                                        {/* <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="Last Name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.lastName}
                                            name="lastName"
                                            error={!!touched.lastName && !!errors.lastName}
                                            helperText={touched.lastName && errors.lastName}
                                            sx={{ gridColumn: "span 2" }}
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
                                        <Button type="submit" color="secondary" variant="contained">
                                            Create New User
                                        </Button>
                                    </Box>
                                </form>
                            )}
                        </Formik>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}

export default AddEntityForm