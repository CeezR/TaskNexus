package dev.braintrain.backend.crew;

import dev.braintrain.backend.job.Job;
import dev.braintrain.backend.job.JobResponseDTO;
import dev.braintrain.backend.job.JobService;
import dev.braintrain.backend.job.RequestJobDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/crews")
@CrossOrigin(origins = "*")
public class CrewController {

    private final CrewService service;

    @Autowired
    public CrewController(CrewService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<CrewResponseDTO> getAllCrews() {
        return ResponseEntity.ok(new CrewResponseDTO(service.findAll()));
    }

//    @GetMapping("/{crewId}")
//    public ResponseEntity<Crew> getCrew(@PathVariable String crewId) {
//        Crew crew = service.findById(Long.valueOf(crewId)).orElse(null);
//        if(crew == null) {
//            return ResponseEntity.notFound().build();
//        }
//        return ResponseEntity.ok(crew);
//    }

    @PostMapping
    public ResponseEntity<Crew> createCrew(@RequestBody CrewRequestDTO crewRequest) {
        Crew saveCrew = service.save(crewRequest);
        URI location  = URI.create("/api/crews/" + saveCrew.getId());
        return ResponseEntity.created(location).body(saveCrew);
    }
}
