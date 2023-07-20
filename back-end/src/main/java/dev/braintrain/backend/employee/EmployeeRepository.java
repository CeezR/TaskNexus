package dev.braintrain.backend.employee;

import dev.braintrain.backend.job.Job;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class EmployeeRepository {

    private final JPAEmployeeRepository repository;

    @Autowired
    public EmployeeRepository(JPAEmployeeRepository repository) {
        this.repository = repository;
    }


    public List<Employee> findAll() {
        return Streamable.of(repository.findAll()).toList();
    }
}
