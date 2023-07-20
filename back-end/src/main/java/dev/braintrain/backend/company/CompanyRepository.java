package dev.braintrain.backend.company;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class CompanyRepository {
    private final JPACompanyRepository repo;

    @Autowired
    public CompanyRepository(JPACompanyRepository repo) {
        this.repo = repo;
    }
}
