package dev.braintrain.backend.company;

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

    @GetMapping("/{id}")
    public ResponseEntity<Company> getAll(@PathVariable Long id) {
        Company company = service.findById(id).orElse(null);
        if(company == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(company);
    }

    @PostMapping
    public ResponseEntity<Company> createCompany(@RequestBody RequestCompanyDTO companyRequest) {
        Company saveCompany = service.save(companyRequest);
        URI location  = URI.create("/api/companies/" + saveCompany.getId());
        return ResponseEntity.created(location).body(saveCompany);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Company> updateCompany(@PathVariable Long id, @RequestBody Company requestCompany) {
        Company company = service.findById(id).orElse(null);
        if(company == null) {
            return ResponseEntity.notFound().build();
        }
        Company updatedCompany = service.save(requestCompany);
        return ResponseEntity.ok().body(updatedCompany);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompany(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }


}
