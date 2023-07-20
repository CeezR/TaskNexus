package dev.braintrain.backend.employee;

import dev.braintrain.backend.job.Job;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class EmployeeRepository {

    private final JPAEmployeeRepository repository;

    @Autowired
    public EmployeeRepository(JPAEmployeeRepository repository) {
        this.repository = repository;
    }

    public List<Employee> findAllEmployees() {
        return Streamable.of(repository.findAll()).toList();
    }

    public Employee saveEmployee(Employee employee) {
        return repository.save(employee);
    }

    public Optional<Employee> findEmployeeById(Long employeeId) {
        return repository.findById(employeeId);
    }
}
