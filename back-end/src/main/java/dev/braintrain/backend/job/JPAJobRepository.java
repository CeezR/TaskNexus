package dev.braintrain.backend.job;

import org.springframework.data.repository.CrudRepository;

public interface JPAJobRepository extends CrudRepository<Job, Long> {
}
