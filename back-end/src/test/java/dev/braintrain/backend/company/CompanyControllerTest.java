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
    void shouldCreateJobForPostRequest() {
        String uri = "http://localhost:%s/api/companies".formatted(port);
        RequestCompanyDTO company = new RequestCompanyDTO("TestName");
        ResponseEntity<Company> exchange = restTemplate.exchange(uri, HttpMethod.POST, new HttpEntity<>(company), Company.class);
        assertThat(exchange.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(exchange.hasBody()).isTrue();
        assertThat(exchange.getHeaders().getLocation()).isNotNull();
        assertThat(exchange.getBody()).isNotNull();
    }
}