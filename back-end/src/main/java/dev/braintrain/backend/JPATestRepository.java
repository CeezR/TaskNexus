package dev.braintrain.backend;

import org.springframework.data.repository.CrudRepository;

public interface JPATestRepository extends CrudRepository<TestEntity, Long> {
}
