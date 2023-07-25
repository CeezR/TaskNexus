package dev.braintrain.backend.company;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class CompanyRepository {
    private final JPACompanyRepository repo;

    @Autowired
    public CompanyRepository(JPACompanyRepository repo) {
        this.repo = repo;
    }

    public List<Company> findAll() {
        return Streamable.of(repo.findAll()).toList();
    }

    public Company save(Company company) {
        return repo.save(company);
    }

    public Optional<Company> findById(Long id) {
        return repo.findById(id);
    }

    public void deleteById(Long id) {
        try {
            repo.deleteById(id);
        } catch (Exception ignored) {}

    }
}
