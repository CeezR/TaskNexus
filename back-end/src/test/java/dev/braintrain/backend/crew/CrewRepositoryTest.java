package dev.braintrain.backend.crew;

import dev.braintrain.backend.job.Job;
import dev.braintrain.backend.job.JobRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CrewRepositoryTest {

    @Autowired
    CrewRepository repository;

    @Test
    void shouldReturnJobById() {
        Crew job = new Crew("Developer");
        Crew createCrew = repository.save(crew);
        assertThat(repository.findById(createCrew.getId())).isNotNull();
    }

}