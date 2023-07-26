import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Box, FormControl, InputLabel, useTheme } from "@mui/material";
import { tokens } from "@/app/theme";


const CrewMember = ({ crewId, onUpdateCrew }: { crewId: string; onUpdateCrew: () => void }) => {
    const [employees, setEmployee] = useState<Employee[]>([]);
    const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);
    const [currentSelection, setCurrentSelection] = useState<Employee | null>(null);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        getEmployees();
    }, []);

    const getEmployees = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/employees`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data: EmployeeListResponse = await response.json();
            setEmployee(data.employeeList);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleSelectEmployee = (employee: Employee) => {
        setCurrentSelection(employee);
    };

    const availableEmployees = employees.filter(
        (employee) => !selectedEmployees.some((selected) => selected.id === employee.id)
    );

    const handleAddAndAssignEmployee = async () => {
        if (currentSelection) {
            try {
                const updatedSelectedEmployees = [...selectedEmployees, currentSelection];
                setSelectedEmployees(updatedSelectedEmployees);
                setCurrentSelection(null);

                if (updatedSelectedEmployees.length === 0) {
                    alert("No employees selected.");
                    return;
                }

                const response = await fetch(`http://localhost:8080/api/crews/addEmployees`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: crewId,
                        employeeIds: updatedSelectedEmployees.map((employee) => employee.id),
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to assign employees to crew.");
                }
                onUpdateCrew();
                alert("Employees successfully assigned to the crew.");
                setSelectedEmployees([]);
            } catch (error) {
                console.error(error);
                alert("An error occurred while assigning employees to the crew.");
            }
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <div>
                    <Box display="flex" flexDirection="column" gap="1rem">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Crew Member</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={currentSelection ? currentSelection.id?.toString() : ""}
                                label="Select Crew Member"
                                onChange={(e) => {
                                    const selectedId = parseInt(e.target.value);
                                    const selectedEmployee = availableEmployees.find(
                                        (employee) => employee.id === selectedId
                                    );
                                    if (selectedEmployee) {
                                        handleSelectEmployee(selectedEmployee);
                                    }
                                }}
                            >
                                {availableEmployees.map((employee) => (
                                    <MenuItem key={employee.id} value={employee.id?.toString()}>
                                        {employee.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Box display="flex" justifyContent="center">
                            <Button
                                variant="contained"
                                onClick={handleAddAndAssignEmployee}
                                color="secondary"
                                sx={{ color: "white", background: colors.greenAccent[700], padding: ".5rem 2rem" }}
                            >
                                Add
                            </Button>
                        </Box>
                    </Box>
                </div>
            </Grid>
        </Grid>
    );
};



export default CrewMember;
