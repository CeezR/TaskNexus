package dev.braintrain.backend.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    private final EmployeeRepository repository;

    @Autowired
    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    public List<Employee> findAllEmployees() {
        return repository.findAllEmployees();
    }

    public Optional<Employee> findEmployeeById(Long employeeId) {
        return repository.findEmployeeById(employeeId);
    }

    public Employee saveEmployee(EmployeeRequestDTO employee) {
        return repository.saveEmployee(new Employee(employee.name(), employee.email(), employee.phoneNumber()));
    }

    public Employee saveEmployee(Employee employee) {
        return repository.saveEmployee(employee);
    }

    public void deleteEmployee(Long jobId) {
        repository.deleteEmployeeById(jobId);
    }
}
