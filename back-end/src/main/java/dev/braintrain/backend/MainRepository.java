package dev.braintrain.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

@Repository
public class MainRepository {
    @Autowired
    JPATestRepository jpaTestRepository;


    public TestEntity findById(Long i) {
        return jpaTestRepository.findById(i).orElse(null);
    }
}
