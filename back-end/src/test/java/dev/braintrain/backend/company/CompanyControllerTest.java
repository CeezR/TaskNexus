package dev.braintrain.backend.company;

import dev.braintrain.backend.job.Job;
import dev.braintrain.backend.job.JobResponseDTO;
import dev.braintrain.backend.job.RequestJobDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.client.RestTemplate;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@ActiveProfiles("test")
class CompanyControllerTest {
    @Value("${server.port}")
    private int port;

    @Autowired
    RestTemplate restTemplate;

    @Test
    void getAll() {
        String uri = "http://localhost:%s/api/companies".formatted(port);
        ResponseEntity<CompanyResponseDTO> exchange = restTemplate.exchange(uri, HttpMethod.GET, HttpEntity.EMPTY, CompanyResponseDTO.class);
        assertThat(exchange.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(exchange.hasBody()).isTrue();
        assertThat(exchange.getBody().companyList()).isNotNull();
    }

    @Test
    void getCompanyByIdMappingShouldReturnOneCompany() {
        String uriPost = "http://localhost:%s/api/companies".formatted(port);
        RequestCompanyDTO company = new RequestCompanyDTO("TestName");
        ResponseEntity<Company> postExchange = restTemplate.exchange(uriPost, HttpMethod.POST, new HttpEntity<>(company), Company.class);

        String uri = "http://localhost:%s/api/companies/%s".formatted(port,postExchange.getBody().getId());
        ResponseEntity<Company> exchange = restTemplate.exchange(uri, HttpMethod.GET, HttpEntity.EMPTY, Company.class);
        assertThat(exchange.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(exchange.hasBody()).isTrue();
        assertThat(exchange.getBody()).isNotNull();
    }

    @Test
    void shouldCreateJobForPostRequest() {
        String uri = "http://localhost:%s/api/companies".formatted(port);
        RequestCompanyDTO company = new RequestCompanyDTO("TestName");
        ResponseEntity<Company> exchange = restTemplate.exchange(uri, HttpMethod.POST, new HttpEntity<>(company), Company.class);
        assertThat(exchange.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(exchange.hasBody()).isTrue();
        assertThat(exchange.getHeaders().getLocation()).isNotNull();
        assertThat(exchange.getBody()).isNotNull();
    }

    @Test
    void shouldUpdateCompanyForPutRequest() {
        String postUri = "http://localhost:%s/api/companies".formatted(port);
        RequestCompanyDTO company = new RequestCompanyDTO("TestName");
        ResponseEntity<Company> postExchange = restTemplate.exchange(postUri, HttpMethod.POST, new HttpEntity<>(company), Company.class);

        String uri = "http://localhost:%s/api/companies/%s".formatted(port, postExchange.getBody().getId());
        RequestCompanyDTO updatedCompany = new RequestCompanyDTO("Not Developer");
        ResponseEntity<Company> exchange = restTemplate.exchange(uri, HttpMethod.PUT, new HttpEntity<>(updatedCompany), Company.class);
        assertThat(exchange.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(exchange.hasBody()).isTrue();
        assertThat(exchange.getBody().getName()).isEqualTo("Not Developer");
    }

    @Test
    void shouldReturnNoContentWhenDeletingJob() {
        String postUri = "http://localhost:%s/api/companies".formatted(port);
        RequestCompanyDTO company = new RequestCompanyDTO("TestName");
        ResponseEntity<Company> postExchange = restTemplate.exchange(postUri, HttpMethod.POST, new HttpEntity<>(company), Company.class);

        String uri = "http://localhost:%s/api/companies/%s".formatted(port, postExchange.getBody().getId());
        ResponseEntity<Void> exchange = restTemplate.exchange(uri, HttpMethod.DELETE, HttpEntity.EMPTY, Void.class);
        assertThat(exchange.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
    }

    @Test
    void shouldReturnNoContentWhenDeletingNonExistingJob() {
        String postUri = "http://localhost:%s/api/companies".formatted(port);

        String uri = "http://localhost:%s/api/companies/%s".formatted(port, -1);
        ResponseEntity<Void> exchange = restTemplate.exchange(uri, HttpMethod.DELETE, HttpEntity.EMPTY, Void.class);
        assertThat(exchange.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
    }
}