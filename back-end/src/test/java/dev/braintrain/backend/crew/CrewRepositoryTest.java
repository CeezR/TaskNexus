package dev.braintrain.backend.crew;

import dev.braintrain.backend.job.Job;
import dev.braintrain.backend.job.JobRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CrewRepositoryTest {

    @Autowired
    CrewRepository repository;

    @Test
    void shouldReturnListOfJobs() {
        List<Job> jobs = repository.findAll();
        assertThat(jobs).isNotNull();
    }

}