package dev.braintrain.backend.crew;

import dev.braintrain.backend.job.JobResponseDTO;
import dev.braintrain.backend.job.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
