package dev.braintrain.backend.employee;

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
        EmployeeRequestDTO employee = new EmployeeRequestDTO("John", "John@hotmail.com", "98765432", "1");
        ResponseEntity<Employee> postExchange = restTemplate.exchange(uriPost, HttpMethod.POST, new HttpEntity<>(employee), Employee.class);

        String uri = "http://localhost:%s/api/employees/%s".formatted(port,postExchange.getBody().getId());
        ResponseEntity<Employee> exchange = restTemplate.exchange(uri, HttpMethod.GET, HttpEntity.EMPTY, Employee.class);
        assertThat(exchange.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(exchange.hasBody()).isTrue();
        assertThat(exchange.getBody()).isNotNull();
    }

    @Test
    void shouldCreateEmployeeForPostRequest() {
        String uri = "http://localhost:%s/api/employees".formatted(port);
        EmployeeRequestDTO employee = new EmployeeRequestDTO("John", "John@hotmail.com", "98765432", "1");
        ResponseEntity<Employee> exchange = restTemplate.exchange(uri, HttpMethod.POST, new HttpEntity<>(employee), Employee.class);
        assertThat(exchange.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(exchange.hasBody()).isTrue();
        assertThat(exchange.getHeaders().getLocation()).isNotNull();
        assertThat(exchange.getBody()).isNotNull();
    }

    @Test
    void shouldCreateEmployeeForPostRequestWithNoCrewId() {
        String uri = "http://localhost:%s/api/employees".formatted(port);
        EmployeeRequestDTO employee = new EmployeeRequestDTO("John", "John@hotmail.com", "98765432", "");
        ResponseEntity<Employee> exchange = restTemplate.exchange(uri, HttpMethod.POST, new HttpEntity<>(employee), Employee.class);
        assertThat(exchange.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(exchange.hasBody()).isTrue();
        assertThat(exchange.getHeaders().getLocation()).isNotNull();
        assertThat(exchange.getBody()).isNotNull();
    }

    @Test
    void shouldReturnNoContentWhenDeletingEmployee() {
        String uriPost = "http://localhost:%s/api/employees".formatted(port);
        EmployeeRequestDTO employee = new EmployeeRequestDTO("John", "John@hotmail.com", "98765432", "1");
        ResponseEntity<Employee> postExchange = restTemplate.exchange(uriPost, HttpMethod.POST, new HttpEntity<>(employee), Employee.class);

        String uri = "http://localhost:%s/api/employees/%s".formatted(port, postExchange.getBody().getId());
        ResponseEntity<Void> exchange = restTemplate.exchange(uri, HttpMethod.DELETE, HttpEntity.EMPTY, Void.class);
        assertThat(exchange.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
    }

    @Test
    void shouldReturnNoContentWhenDeletingNonExistingEmployee() {
        String uri = "http://localhost:%s/api/jobs/%s".formatted(port, -1);
        ResponseEntity<Void> exchange = restTemplate.exchange(uri, HttpMethod.DELETE, HttpEntity.EMPTY, Void.class);
        assertThat(exchange.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
    }

    @Test
    void shouldUpdateEmployeeForPutRequest() {
        String uriPost = "http://localhost:%s/api/employees".formatted(port);
        EmployeeRequestDTO employee = new EmployeeRequestDTO("John", "John@hotmail.com", "98765432", "1");
        ResponseEntity<Employee> postExchange = restTemplate.exchange(uriPost, HttpMethod.POST, new HttpEntity<>(employee), Employee.class);

        String uri = "http://localhost:%s/api/employees/%s".formatted(port, postExchange.getBody().getId());
        EmployeeRequestDTO updatedEmployee = new EmployeeRequestDTO("Bill", "John@hotmail.com", "98765432", "1");
        ResponseEntity<Employee> exchange = restTemplate.exchange(uri, HttpMethod.PUT, new HttpEntity<>(updatedEmployee), Employee.class);
        assertThat(exchange.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(exchange.hasBody()).isTrue();
        assertThat(exchange.getBody().getName()).isEqualTo("Bill");
    }

}