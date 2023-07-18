package dev.braintrain.backend.job;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    private final JobRepository repo;

    @Autowired
    public JobService(JobRepository repo) {
        this.repo = repo;
    }

    public List<Job> findAll() {
        return repo.findAll();
    }

    public Job save(RequestJobDTO jobRequest) {
        return repo.save(new Job(jobRequest.name()));
    }
}
