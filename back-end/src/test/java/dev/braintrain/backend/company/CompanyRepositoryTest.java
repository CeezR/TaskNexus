package dev.braintrain.backend.company;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class CompanyRepositoryTest {

    @Autowired
    CompanyRepository repo;

    @Test
    void findAllShouldReturnListOfCompanies() {
        List<Company> companies = repo.findAll();
        assertThat(companies).isNotNull();
    }

    @Test
    void saveShouldAddToDB() {
        int companyCount = repo.findAll().size();

        repo.save(new Company("Test Company", "", ""));

        assertThat(repo.findAll().size()).isEqualTo( companyCount + 1);
    }

    @Test
    void findByIdShouldReturnCompanyWithSpecifiedID() {
        Company savedCompany = repo.save(new Company("Company", "", ""));
        Company foundCompany = repo.findById(savedCompany.getId()).orElse(null);
        assertThat(foundCompany).isNotNull();
        assertThat(foundCompany.getId()).isEqualTo(savedCompany.getId());

    }

    @Test
    void deleteByIdShouldDeleteCompanyFromDB() {
        Company savedCompany = repo.save(new Company("Company", "", ""));
        int companyCount = repo.findAll().size();

        repo.deleteById(savedCompany.getId());

        assertThat(repo.findAll().size()).isEqualTo(companyCount - 1);
    }
}