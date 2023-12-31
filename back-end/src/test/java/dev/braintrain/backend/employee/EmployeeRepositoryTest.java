package dev.braintrain.backend.employee;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;


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
    void shouldReturnEmployeeById() {
        Employee employee = new Employee("John", "John@hotmail.com", "98765432", null);
        Employee createEmployee = repository.saveEmployee(employee);
        assertThat(repository.findEmployeeById(createEmployee.getId())).isNotNull();
    }

    @Test
    void shouldCreateNewEmployee() {
        Employee employee = new Employee("John", "John@hotmail.com", "98765432", null);
        int employeeCount = repository.findAllEmployees().size();
        Employee createEmployee = repository.saveEmployee(employee);
        assertThat(createEmployee).isNotNull();
        assertThat(repository.findAllEmployees().size()).isEqualTo(employeeCount + 1);
    }

    @Test
    void shouldDeleteJob() {
        Employee employee = new Employee("John", "John@hotmail.com", "98765432", null);
        Employee createdEmployee = repository.saveEmployee(employee);
        repository.deleteEmployeeById(createdEmployee.getId());
        Employee findEmployee = repository.findEmployeeById(createdEmployee.getId()).orElse(null);
        assertThat(findEmployee).isNull();
    }
}