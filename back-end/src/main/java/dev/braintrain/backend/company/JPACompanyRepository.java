package dev.braintrain.backend.company;

import dev.braintrain.backend.job.Job;
import org.springframework.data.repository.CrudRepository;

public interface JPACompanyRepository extends CrudRepository<Company, Long> {
}
