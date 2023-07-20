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
        List<Employee> employees = repository.findAll();
        assertThat(employees).isNotNull();
    }
}