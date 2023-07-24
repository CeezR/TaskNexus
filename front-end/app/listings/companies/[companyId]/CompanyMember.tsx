import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Box, FormControl, InputLabel, useTheme} from "@mui/material";
import { tokens } from "@/app/theme";


const CompanyMember = ({ companyId, onUpdateCompany }: { companyId: string; onUpdateCompany: () => void }) => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [selectedJobs, setSelectedJobs] = useState<Job[]>([]);
    const [currentSelection, setCurrentSelection] = useState<Job | null>(null);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        getJobs();
    }, []);

    const getJobs = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/jobs`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data: JobListResponse = await response.json();
            setJobs(data.jobList);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleSelectJob = (job: Job) => {
        setCurrentSelection(job);
    };

    const availableJobs = jobs.filter(
        (job) => !selectedJobs.some((selected) => selected.id === job.id)
    );

    const handleAddAndAssignJob = async () => {
        if (currentSelection) {
            try {
                const updatedSelectedJobs = [...selectedJobs, currentSelection];
                setSelectedJobs(updatedSelectedJobs);
                setCurrentSelection(null);

                if (updatedSelectedJobs.length === 0) {
                    alert("No jobs selected.");
                    return;
                }

                const response = await fetch(`http://localhost:8080/api/companies/addJobs`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: companyId,
                        jobIds: updatedSelectedJobs.map((job) => job.id),
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to assign jobs to company.");
                }
                onUpdateCompany();
                alert("Jobs successfully assigned to the company.");
                setSelectedJobs([]);
            } catch (error) {
                console.error(error);
                alert("An error occurred while assigning jobs to the company.");
            }
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Select Company Members</h2>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div>
                        <Box >
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Company Member</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={currentSelection ? currentSelection.id?.toString() : ""}
                                    label="Select Company Member"
                                    onChange={(e) => {
                                        const selectedId = parseInt(e.target.value);
                                        const selectedJob = availableJobs.find(
                                            (job) => job.id === selectedId
                                        );
                                        if (selectedJob) {
                                            handleSelectJob(selectedJob);
                                        }
                                    }}
                                >
                                    {availableJobs.map((job) => (
                                        <MenuItem key={job.id} value={job.id?.toString()}>
                                            {job.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Button 
                            variant="contained" 
                            onClick={handleAddAndAssignJob} 
                            color="secondary"
                            sx={{ color: "white", background: colors.greenAccent[700] }}
                        >
                            Add
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};



export default CompanyMember;
