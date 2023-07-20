package dev.braintrain.backend.employee;

import dev.braintrain.backend.job.Job;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class EmployeeRepositoryTest {

    @Autowired
    EmployeeRepository repository;

    @Test
    void shouldReturnListOfEmployees() {
        List<Employee> employees = repository.findAllEmployees();
        assertThat(employees).isNotNull();
    }

    @Test
    void shouldCreateNewEmployee() {
        Employee employee = new Employee("John", "John@hotmail.com");
        int employeeCount = repository.findAllEmployees().size();
        Employee createEmployee = repository.saveEmployee(employee);
        assertThat(createEmployee).isNotNull();
        assertThat(repository.findAllEmployees().size()).isEqualTo(employeeCount + 1);
    }
}