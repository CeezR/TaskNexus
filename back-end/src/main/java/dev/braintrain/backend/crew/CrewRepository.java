package dev.braintrain.backend.crew;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Repository;

import java.util.List;

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
}
