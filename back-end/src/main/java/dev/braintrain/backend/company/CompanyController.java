package dev.braintrain.backend.company;

import dev.braintrain.backend.crew.Crew;
import dev.braintrain.backend.employee.Employee;
import dev.braintrain.backend.job.Job;
import dev.braintrain.backend.job.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/companies")
@CrossOrigin(origins = "*")
public class CompanyController {
    private final CompanyService companyService;
    private final JobService jobService;

    @Autowired
    public CompanyController(CompanyService service, JobService jobService) {
        this.companyService = service;
        this.jobService = jobService;
    }

    @GetMapping
    public ResponseEntity<List<CompanyResponseDTO>> getAll() {
        return ResponseEntity.ok(companyService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompanyResponseDTO> getAll(@PathVariable String id) {
        CompanyResponseDTO responseDTO = companyService.findById(Long.valueOf(id));
        if(responseDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(responseDTO);
    }

    @PostMapping
    public ResponseEntity<Company> createCompany(@RequestBody RequestCompanyDTO companyRequest) {
        Company saveCompany = companyService.save(companyRequest);
        URI location  = URI.create("/api/companies/" + saveCompany.getId());
        return ResponseEntity.created(location).body(saveCompany);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Company> updateCompany(@PathVariable String id, @RequestBody Company requestCompany) {
        CompanyResponseDTO responseDTO = companyService.findById(Long.valueOf(id));
        if(responseDTO == null) {
            return ResponseEntity.notFound().build();
        }
        Company updatedCompany = companyService.save(requestCompany);
        return ResponseEntity.ok().body(updatedCompany);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompany(@PathVariable Long id) {
        companyService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/addJobs")
    public ResponseEntity<Company> addJobToCompany(@RequestBody JobMemberDTO jobMemberDTO) {
        Company company = companyService.findByIdWithOutTransforamtion(jobMemberDTO.id().longValue()).orElse(null);
        if (company == null) {
            return ResponseEntity.notFound().build();
        }

        for (Long jobId : jobMemberDTO.jobIds()) {
            Job job = jobService.findById(jobId).orElse(null);
            if (job != null) {
                company.addJob(job);
            }
        }

        Company updatedCompany = companyService.save(company);
        return ResponseEntity.ok(updatedCompany);
    }

    @DeleteMapping("/removeJobs")
    public ResponseEntity<Company> removeJobFromCompany( @RequestBody JobMemberDTO jobMemberDTO) {
        Company company = companyService.findByIdWithOutTransforamtion(jobMemberDTO.id().longValue()).orElse(null);
        if (company == null) {
            return ResponseEntity.notFound().build();
        }

        for (Long jobId : jobMemberDTO.jobIds().toArray(new Long[0])) {
            Job job = jobService.findById(jobId).orElse(null);
            if (job != null && job.getCompany() == company) {
                company.removeJob(job);
            }
        }

        Company updatedCompany = companyService.save(company);
        return ResponseEntity.ok(updatedCompany);
    }


}
