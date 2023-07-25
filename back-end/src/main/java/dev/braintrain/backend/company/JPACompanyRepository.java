package dev.braintrain.backend.company;

import org.springframework.data.repository.CrudRepository;

public interface JPACompanyRepository extends CrudRepository<Company, Long> {
}
