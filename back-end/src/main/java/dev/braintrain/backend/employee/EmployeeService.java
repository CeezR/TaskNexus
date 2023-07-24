package dev.braintrain.backend.employee;

import dev.braintrain.backend.crew.Crew;
import dev.braintrain.backend.crew.CrewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    private final EmployeeRepository repository;
    private final CrewRepository crewRepository;

    @Autowired
    public EmployeeService(EmployeeRepository repository, CrewRepository crewRepository) {
        this.repository = repository;
        this.crewRepository = crewRepository;
    }

    public List<Employee> findAllEmployees() {
        return repository.findAllEmployees();
    }

    public Optional<Employee> findEmployeeById(Long employeeId) {
        return repository.findEmployeeById(employeeId);
    }

    public Employee saveEmployee(EmployeeRequestDTO employee) {
        Crew crew = crewRepository.findById(Long.valueOf(employee.crewId())).orElse(null);
        return repository.saveEmployee(new Employee(employee.name(), employee.email(), employee.phoneNumber(), crew));
    }

    public Employee saveEmployee(Employee employee) {
        return repository.saveEmployee(employee);
    }

    public void deleteEmployee(Long jobId) {
        repository.deleteEmployeeById(jobId);
    }
}
