import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

type Employee = {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
};

type EmployeeListResponse = {
    employeeList: Employee[];
};

const CrewMember = ({ crewId }: { crewId: string }) => {
    const [employees, setEmployee] = useState<Employee[]>([]);
    const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);
    const [currentSelection, setCurrentSelection] = useState<Employee | null>(null);

    useEffect(() => {
        // Fetch employees from backend when the component mounts
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

    const handleDeleteEmployee = (employeeId: number) => {
        const updatedSelectedEmployees = selectedEmployees.filter(
            (employee) => employee.id !== employeeId
        );
        setSelectedEmployees(updatedSelectedEmployees);
    };

    // Filter out selected employees from the drop-down options
    const availableEmployees = employees.filter(
        (employee) => !selectedEmployees.some((selected) => selected.id === employee.id)
    );

    const assignEmployeesToCrew = async () => {
        if (selectedEmployees.length === 0) {
          alert("No employees selected.");
          return;
        }
        alert(JSON.stringify(selectedEmployees, undefined, 2))
        try {
          const response = await fetch(`http://localhost:8080/api/crews/add/member`, {
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
                    {selectedEmployees.length > 0 && (
                        <div>
                            <h3>Selected Employees:</h3>
                            <ul>
                                {selectedEmployees.map((employee) => (
                                    <li key={employee.id}>
                                        {employee.name}{" "}
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                            onClick={() => handleDeleteEmployee(employee.id)}
                                            startIcon={<DeleteIcon />}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </Grid>
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
                            Assign Employees to Crew
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};



export default CrewMember;
