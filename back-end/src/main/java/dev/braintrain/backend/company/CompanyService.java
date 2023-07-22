package dev.braintrain.backend.company;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {

    private final CompanyRepository repo;

    @Autowired
    public CompanyService(CompanyRepository repo) {
        this.repo = repo;
    }

    public List<Company> findAll() {
        return repo.findAll();
    }

    public Company save(RequestCompanyDTO companyRequest) {
        return repo.save(new Company(companyRequest.name()));
    }

    public Company save(Company company) {
        return repo.save(company);
    }

    public Optional<Company> findById(Long id) {
        return repo.findById(id);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
