package dev.braintrain.backend.company;

import dev.braintrain.backend.crew.Crew;
import dev.braintrain.backend.crew.CrewResponseDTO;
import dev.braintrain.backend.crew.CrewService;
import dev.braintrain.backend.crew.EmployeeDTO;
import dev.braintrain.backend.employee.Employee;
import dev.braintrain.backend.job.Job;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CompanyService {

    private final CompanyRepository repo;

    @Autowired
    public CompanyService(CompanyRepository repo) {
        this.repo = repo;
    }

    public List<CompanyResponseDTO> findAll() {
        List<Company> companies = repo.findAll();
        return companies.stream()
                .map(company -> new CompanyResponseDTO(
                        company.getId(),
                        company.getName(),
                        mapJobToDTOs(company.getJobs()))
                        ).collect(Collectors.toList());
    }

    private List<JobDTO> mapJobToDTOs(List<Job> jobs) {
        return jobs.stream()
                .map(job -> new JobDTO(job.getId(), job.getName(), job.getDescription(), job.getStatus()))
                .collect(Collectors.toList());
    }

    public Company save(RequestCompanyDTO companyRequest) {
        return repo.save(new Company(companyRequest.name()));
    }

    public Company save(Company company) {
        return repo.save(company);
    }

//    public Optional<Company> findById(Long id) {
//        return repo.findById(id);
//    }

    public Optional<Company> findByIdWithOutTransforamtion(Long companyId) {
        return repo.findById(companyId);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public CompanyResponseDTO findById(Long id) {
        Optional<Company> company = repo.findById(id);
        List<JobDTO> jobDTOS = null;
        if(company.isPresent()){
            if(company.get().getJobs() != null){
                jobDTOS = convertToDTOList(company.get().getJobs());
            }
            return new CompanyResponseDTO(company.get().getId(), company.get().getName(), jobDTOS);
        }else{
            return null;
        }
    }

    public static List<JobDTO> convertToDTOList(List<Job> jobs) {
        return jobs.stream()
                .map(CompanyService::convertToDTO)
                .collect(Collectors.toList());
    }

    public static JobDTO convertToDTO(Job job) {
        return new JobDTO(
                job.getId(),
                job.getName(),
                job.getDescription(),
                job.getStatus()
        );
    }
}
