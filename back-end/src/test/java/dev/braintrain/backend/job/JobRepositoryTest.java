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

}