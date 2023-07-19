package dev.braintrain.backend.job;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*")
public class JobController {

    private final JobService service;

    @Autowired
    public JobController(JobService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<JobResponseDTO> getAll() {
        return ResponseEntity.ok(new JobResponseDTO(service.findAll()));
    }

    @GetMapping("/{jobId}")
    public ResponseEntity<Job> getJob(@PathVariable String jobId) {
        Job job = service.findById(Long.valueOf(jobId)).orElse(null);
        if(job == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(job);
    }

    @PostMapping
    public ResponseEntity<Job> createJob(@RequestBody RequestJobDTO jobRequest) {
        Job saveJob = service.save(jobRequest);
        URI location  = URI.create("/api/jobs/" + saveJob.getId());
        return ResponseEntity.created(location).body(saveJob);
    }

    @PutMapping("/{jobId}")
    public ResponseEntity<Job> updateJob(@PathVariable Long jobId, @RequestBody RequestJobDTO jobUpdateRequest) {
        Job job = service.findById(jobId).orElse(null);
        if(job == null) {
            return ResponseEntity.notFound().build();
        }
        Job updatedJob = service.save(jobUpdateRequest);
        return ResponseEntity.ok().body(updatedJob);

    }

    @DeleteMapping("/{jobId}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long jobId) {
        service.delete(jobId);
        return ResponseEntity.noContent().build();
    }


}
