package dev.braintrain.backend.company;

import dev.braintrain.backend.job.Job;
import dev.braintrain.backend.job.RequestJobDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/companies")
@CrossOrigin(origins = "*")
public class CompanyController {
    private final CompanyService service;

    @Autowired
    public CompanyController(CompanyService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<CompanyResponseDTO> getAll() {
        return ResponseEntity.ok(new CompanyResponseDTO(service.findAll()));
    }

    @PostMapping
    public ResponseEntity<Company> createJob(@RequestBody RequestCompanyDTO companyRequest) {
        Company saveCompany = service.save(companyRequest);
        URI location  = URI.create("/api/companies/" + saveCompany.getId());
        return ResponseEntity.created(location).body(saveCompany);
    }


}
