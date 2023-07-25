package dev.braintrain.backend.employee;

import org.springframework.data.repository.CrudRepository;

public interface JPAEmployeeRepository extends CrudRepository<Employee, Long> {
}
