package dev.braintrain.backend.job;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class JobRepository {
    private final JPAJobRepository repo;

    @Autowired
    public JobRepository(JPAJobRepository repo) {
        this.repo = repo;
    }

    public List<Job> findAll() {
        return null;
    }
}
