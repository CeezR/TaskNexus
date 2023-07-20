package dev.braintrain.backend.crew;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CrewService {

    private final CrewRepository repo;

    @Autowired
    public CrewService(CrewRepository repo) {
        this.repo = repo;
    }

    public List<Crew> findAll() {
        return repo.findAll();
    }

    public Crew save(CrewRequestDTO crewRequest) {
        return repo.save(new Crew(crewRequest.name()));
    }

    public Crew save(Crew crew) {
        return repo.save(crew);
    }

    public Optional<Crew> findById(Long crewId) {
        return repo.findById(crewId);
    }

    public void delete(Long crewId) {
        repo.deleteById(crewId);
    }
}
