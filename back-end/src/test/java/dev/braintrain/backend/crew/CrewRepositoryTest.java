package dev.braintrain.backend.crew;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.List;
import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest
class CrewRepositoryTest {

    @Autowired
    CrewRepository repository;

    @Test
    void shouldReturnListOfCrews() {
        List<Crew> crews = repository.findAll();
        assertThat(crews).isNotNull();
    }

    @Test
    void shouldReturnNewlyCreateCrew() {
        Crew crew = new Crew("Brain-Train");
        Crew createCrew = repository.save(crew);
        assertThat(createCrew).isNotNull();
    }

    @Test
    void shouldCreateNewCrew() {
        Crew crew = new Crew("brain-train");
        int crewCount = repository.findAll().size();
        Crew createCrew = repository.save(crew);
        assertThat(createCrew).isNotNull();
        assertThat(repository.findAll().size()).isEqualTo(crewCount + 1);
    }
    @Test
    void shouldUpdateCrew() {
        Crew crew = new Crew("brain-train");
        Crew createdCrew = repository.save(crew);
        createdCrew.setName("fantastic-four");
        Crew updatedCrew = repository.save(crew);
        assertThat(updatedCrew).isNotNull();
        assertThat(updatedCrew.getName()).isEqualTo("fantastic-four");
    }

    @Test
    void shouldDeleteCrew() {
        Crew crew = new Crew("brain-train");
        Crew createdCrew = repository.save(crew);
        repository.deleteById(createdCrew.getId());
        Crew findCrew = repository.findById(createdCrew.getId()).orElse(null);
        assertThat(findCrew).isNull();

    }
}