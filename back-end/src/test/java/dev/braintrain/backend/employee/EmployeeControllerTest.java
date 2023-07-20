package dev.braintrain.backend.employee;

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
class EmployeeControllerTest {

    @Value("${server.port}")
    private int port;

    @Autowired
    RestTemplate restTemplate;

    @Test
    void getEmployeeMappingShouldReturnEmployeeList() {
        String uri = "http://localhost:%s/api/employees".formatted(port);
        ResponseEntity<EmployeeResponseDTO> exchange = restTemplate.exchange(uri, HttpMethod.GET, HttpEntity.EMPTY, EmployeeResponseDTO.class);
        assertThat(exchange.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(exchange.hasBody()).isTrue();
        assertThat(exchange.getBody().employeeList()).isNotNull();
    }

    @Test
    void getEmployeeByIdMappingShouldReturnOneEmployee() {
        String uriPost = "http://localhost:%s/api/employees".formatted(port);
        EmployeeRequestDTO employee = new EmployeeRequestDTO("John", "John@hotmail.com", 98765432L);
        ResponseEntity<Employee> postExchange = restTemplate.exchange(uriPost, HttpMethod.POST, new HttpEntity<>(employee), Employee.class);

        String uri = "http://localhost:%s/api/employees/%s".formatted(port,postExchange.getBody().getId());
        ResponseEntity<Employee> exchange = restTemplate.exchange(uri, HttpMethod.GET, HttpEntity.EMPTY, Employee.class);
        assertThat(exchange.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(exchange.hasBody()).isTrue();
        assertThat(exchange.getBody()).isNotNull();
    }

    @Test
    void shouldCreateJobForPostRequest() {
        String uri = "http://localhost:%s/api/employees".formatted(port);
        EmployeeRequestDTO employee = new EmployeeRequestDTO("John", "John@hotmail.com", 98765432L);
        ResponseEntity<Employee> exchange = restTemplate.exchange(uri, HttpMethod.POST, new HttpEntity<>(employee), Employee.class);
        assertThat(exchange.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(exchange.hasBody()).isTrue();
        assertThat(exchange.getHeaders().getLocation()).isNotNull();
        assertThat(exchange.getBody()).isNotNull();
    }

}