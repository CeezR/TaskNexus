package dev.braintrain.backend.integrationtest;

import dev.braintrain.backend.crew.Crew;
import dev.braintrain.backend.crew.CrewRepository;
import dev.braintrain.backend.job.Job;
import dev.braintrain.backend.job.JobRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@ActiveProfiles("test")
public class EntityIntegrationTest {

    @Autowired
    JobRepository jobRepository;

    @Autowired
    CrewRepository crewRepository;
    @Test
    void shouldCreateNewJobWithValidCrew() {
        Crew crew = crewRepository.save(new Crew("Luke"));
        Job job = new Job("Developer", "", "", crew, null);
        assertThat(job).isNotNull();
        assertThat(job.getCrew().getId()).isEqualTo(crew.getId());
    }
}
