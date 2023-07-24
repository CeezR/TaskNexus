package dev.braintrain.backend.job;

import dev.braintrain.backend.company.Company;
import dev.braintrain.backend.company.CompanyRepository;
import dev.braintrain.backend.crew.Crew;
import dev.braintrain.backend.crew.CrewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobService {

    private final JobRepository repo;
    private final CrewRepository crewRepository;
    private final CompanyRepository companyRepository;

    @Autowired
    public JobService(JobRepository repo, CrewRepository crewRepository, CompanyRepository companyRepository) {
        this.repo = repo;
        this.crewRepository = crewRepository;
        this.companyRepository = companyRepository;
    }

    public List<Job> findAll() {
        return repo.findAll();
    }

    public Job save(RequestJobDTO jobRequest) {
        System.out.println(jobRequest);
        Crew crew = crewRepository.findById(Long.valueOf(jobRequest.crewId())).orElse(null);
        Company company = companyRepository.findById(Long.valueOf(jobRequest.companyId())).orElse(null);

        return repo.save(new Job(
                jobRequest.name(),
                jobRequest.description(),
                jobRequest.status(),
                crew,
                company));
    }

    public Job save(Job job) {
        return repo.save(job);
    }

    public Optional<Job> findById(Long jobId) {
        return repo.findById(jobId);
    }

    public void delete(Long jobId) {
        repo.deleteById(jobId);
    }
}
