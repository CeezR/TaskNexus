package dev.braintrain.backend.crew;

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
class CrewControllerTest {

    @Value("${server.port}")
    private int port;

    @Autowired
    RestTemplate restTemplate;

    @Test
    void getCrewMappingShouldReturnCrewList() {
        String uri = "http://localhost:%s/api/crews".formatted(port);
        ResponseEntity<CrewResponseDTO> exchange = restTemplate.exchange(uri, HttpMethod.GET, HttpEntity.EMPTY, CrewResponseDTO.class);
        assertThat(exchange.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(exchange.hasBody()).isTrue();
        assertThat(exchange.getBody().crewList()).isNotNull();
    }

    @Test
    void shouldCreateCrewForPostRequest() {
        String uri = "http://localhost:%s/api/crews".formatted(port);
        CrewRequestDTO crew = new CrewRequestDTO("TestName");
        ResponseEntity<Crew> exchange = restTemplate.exchange(uri, HttpMethod.POST, new HttpEntity<>(crew), Crew.class);
        assertThat(exchange.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(exchange.hasBody()).isTrue();
        assertThat(exchange.getHeaders().getLocation()).isNotNull();
        assertThat(exchange.getBody()).isNotNull();
    }

    @Test
    void getCrewByIdMappingShouldReturnOneCrew() {
        String uriPost = "http://localhost:%s/api/crews".formatted(port);
        CrewRequestDTO crew = new CrewRequestDTO("TestName");
        ResponseEntity<Crew> postExchange = restTemplate.exchange(uriPost, HttpMethod.POST, new HttpEntity<>(crew), Crew.class);

        String uri = "http://localhost:%s/api/crews/%s".formatted(port,postExchange.getBody().getId());
        ResponseEntity<Crew> exchange = restTemplate.exchange(uri, HttpMethod.GET, HttpEntity.EMPTY, Crew.class);
        assertThat(exchange.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(exchange.hasBody()).isTrue();
        assertThat(exchange.getBody()).isNotNull();
    }

    @Test
    void shouldUpdateCrewForPutRequest() {
        String postUri = "http://localhost:%s/api/crews".formatted(port);
        CrewRequestDTO crew = new CrewRequestDTO("TestName");
        ResponseEntity<Crew> postExchange = restTemplate.exchange(postUri, HttpMethod.POST, new HttpEntity<>(crew), Crew.class);

        String uri = "http://localhost:%s/api/crews/%s".formatted(port, postExchange.getBody().getId());
        CrewRequestDTO updatedCrew = new CrewRequestDTO("Fantastic-four");
        ResponseEntity<Crew> exchange = restTemplate.exchange(uri, HttpMethod.PUT, new HttpEntity<>(updatedCrew), Crew.class);
        assertThat(exchange.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(exchange.hasBody()).isTrue();
        assertThat(exchange.getBody().getName()).isEqualTo("Fantastic-four");
    }

    @Test
    void shouldReturnNoContentWhenDeletingCrew() {
        String postUri = "http://localhost:%s/api/crews".formatted(port);
        CrewRequestDTO crew = new CrewRequestDTO("TestName");
        ResponseEntity<Crew> postExchange = restTemplate.exchange(postUri, HttpMethod.POST, new HttpEntity<>(crew), Crew.class);

        String uri = "http://localhost:%s/api/crews/%s".formatted(port, postExchange.getBody().getId());
        ResponseEntity<Void> exchange = restTemplate.exchange(uri, HttpMethod.DELETE, HttpEntity.EMPTY, Void.class);
        assertThat(exchange.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
    }

    @Test
    void shouldReturnNoContentWhenDeletingNonExistingCrew() {
        String postUri = "http://localhost:%s/api/crews".formatted(port);

        String uri = "http://localhost:%s/api/crews/%s".formatted(port, -1);
        ResponseEntity<Void> exchange = restTemplate.exchange(uri, HttpMethod.DELETE, HttpEntity.EMPTY, Void.class);
        assertThat(exchange.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
    }

}