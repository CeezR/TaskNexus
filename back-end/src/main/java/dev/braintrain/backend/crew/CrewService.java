package dev.braintrain.backend.crew;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
