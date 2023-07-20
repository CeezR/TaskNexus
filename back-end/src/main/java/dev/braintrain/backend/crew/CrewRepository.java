package dev.braintrain.backend.crew;

import dev.braintrain.backend.job.Job;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class CrewRepository {

    private final CrewJPARepository repo;
    @Autowired
    public CrewRepository(CrewJPARepository repo) {
        this.repo = repo;
    }

    public List<Crew> findAll() {
        return Streamable.of(repo.findAll()).toList();
    }

    public Crew save(Crew crew) {
        return repo.save(crew);
    }
    public Optional<Crew> findById(Long crewId) {
        return repo.findById(crewId);
    }

    public void deleteById(Long crewId) {
        try {
            repo.deleteById(crewId);
        } catch (Exception ignored) {}

    }

}
