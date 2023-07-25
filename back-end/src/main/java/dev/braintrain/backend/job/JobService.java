package dev.braintrain.backend.job;

import dev.braintrain.backend.company.Company;
import dev.braintrain.backend.company.CompanyRepository;
import dev.braintrain.backend.crew.Crew;
import dev.braintrain.backend.crew.CrewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
        Company company = jobRequest.companyId().isEmpty() ? null : companyRepository.findById(Long.valueOf(jobRequest.companyId())).orElse(null);
        Crew crew = jobRequest.crewId().isEmpty() ? null : crewRepository.findById(Long.valueOf(jobRequest.crewId())).orElse(null);

        LocalDate startDate = jobRequest.startDate().isEmpty() ? null : LocalDate.parse(jobRequest.startDate() ,DateTimeFormatter.ISO_LOCAL_DATE);
        LocalDate endDate = jobRequest.endDate().isEmpty() ? null : LocalDate.parse(jobRequest.endDate() ,DateTimeFormatter.ISO_LOCAL_DATE);

        return repo.save(new Job(
                jobRequest.name(),
                jobRequest.description(),
                jobRequest.status(),
                crew,
                company,
                startDate,
                endDate));
    }

    public Job update(Job job, RequestJobDTO jobRequest) {
        Company company = jobRequest.companyId().isEmpty() ? null : companyRepository.findById(Long.valueOf(jobRequest.companyId())).orElse(null);
        Crew crew = jobRequest.crewId().isEmpty() ? null : crewRepository.findById(Long.valueOf(jobRequest.crewId())).orElse(null);

        job.setName(jobRequest.name());
        job.setDescription(jobRequest.description());
        job.setStatus(jobRequest.status());
        job.setCrew(crew);
        job.setCompany(company);

        return repo.save(job);

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
