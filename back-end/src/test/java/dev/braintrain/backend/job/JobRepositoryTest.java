package dev.braintrain.backend.job;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class JobRepositoryTest {

    @Autowired
    JobRepository repository;

    @Test
    void shouldReturnListOfJobs() {
        List<Job> jobs = repository.findAll();
        assertThat(jobs).isNotNull();
        assertThat(jobs.size()).isEqualTo(3);
    }

    @Test
    void shouldReturnNewlyCreateJob() {
        Job job = new Job("Developer");
        Job createJob = repository.save(job);
        assertThat(createJob).isNotNull();
    }

    @Test
    void shouldCreateNewJob() {
        Job job = new Job("Developer");
        int jobCount = repository.findAll().size();
        Job createJob = repository.save(job);
        assertThat(createJob).isNotNull();
        assertThat(repository.findAll().size()).isEqualTo(jobCount + 1);
    }

}