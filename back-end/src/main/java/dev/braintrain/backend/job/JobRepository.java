package dev.braintrain.backend.job;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class JobRepository {
    private final JPAJobRepository repo;

    @Autowired
    public JobRepository(JPAJobRepository repo) {
        this.repo = repo;
    }

    public List<Job> findAll() {
        return Streamable.of(repo.findAll()).toList();
    }

    public Job save(Job job) {
        return repo.save(job);
    }

    public Optional<Job> findById(Long jobId) {
        return repo.findById(jobId);
    }

    public void deleteById(Long jobId) {
        try {
            repo.deleteById(jobId);
        } catch (Exception ignored) {}

    }


}
