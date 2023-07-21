import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";


const CrewMember = ({ crewId }: { crewId: string }) => {
    const [employees, setEmployee] = useState<Employee[]>([]);
    const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);
    const [currentSelection, setCurrentSelection] = useState<Employee | null>(null);

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

    const handleAddEmployee = () => {
        if (currentSelection) {
            setSelectedEmployees([...selectedEmployees, currentSelection]);
            setCurrentSelection(null);
        }
    };

    const availableEmployees = employees.filter(
        (employee) => !selectedEmployees.some((selected) => selected.id === employee.id)
    );

    const assignEmployeesToCrew = async () => {
        if (currentSelection) {
            setSelectedEmployees([...selectedEmployees, currentSelection]);
            setCurrentSelection(null);
        }
        if (selectedEmployees.length === 0) {
            alert("No employees selected.");
            return;
        }
        
        try {
            const response = await fetch(`http://localhost:8080/api/crews/addEmployees`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: crewId,
                    employeeIds: selectedEmployees.map((employee) => employee.id),
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to assign employees to crew.");
            }
            alert("Employees successfully assigned to the crew.");
            setSelectedEmployees([]);
        } catch (error) {
            console.error(error);
            alert("An error occurred while assigning employees to the crew.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Select Crew Members</h2>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div>
                        <Select
                            value={currentSelection ? currentSelection.id.toString() : ""}
                            onChange={(e) => {
                                const selectedId = parseInt(e.target.value);
                                const selectedEmployee = availableEmployees.find(
                                    (employee) => employee.id === selectedId
                                );
                                if (selectedEmployee) {
                                    handleSelectEmployee(selectedEmployee);
                                }
                            }}
                            style={{ minWidth: "200px" }}
                        >
                            {/* Add the default option */}
                            <MenuItem value="">
                                Select Crew Member
                            </MenuItem>
                            {availableEmployees.map((employee) => (
                                <MenuItem key={employee.id} value={employee.id.toString()}>
                                    {employee.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <Button variant="contained" onClick={handleAddEmployee}>
                            Add
                        </Button>
                        <Button variant="contained" onClick={assignEmployeesToCrew}>
                            Assign Employee to Crew
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};



export default CrewMember;
