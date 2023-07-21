package dev.braintrain.backend.job;

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

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@ActiveProfiles("test")
class JobControllerTest {

    @Value("${server.port}")
    private int port;

    @Autowired
    RestTemplate restTemplate;

    @Test
    void getJobMappingShouldReturnJobList() {
        String uri = "http://localhost:%s/api/jobs".formatted(port);
        ResponseEntity<JobResponseDTO> exchange = restTemplate.exchange(uri, HttpMethod.GET, HttpEntity.EMPTY, JobResponseDTO.class);
        assertThat(exchange.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(exchange.hasBody()).isTrue();
        assertThat(exchange.getBody().jobList()).isNotNull();
    }

    @Test
    void getJobByIdMappingShouldReturnOneJob() {
        String uriPost = "http://localhost:%s/api/jobs".formatted(port);
        RequestJobDTO job = new RequestJobDTO("TestName", "", "");
        ResponseEntity<Job> postExchange = restTemplate.exchange(uriPost, HttpMethod.POST, new HttpEntity<>(job), Job.class);

        String uri = "http://localhost:%s/api/jobs/%s".formatted(port,postExchange.getBody().getId());
        ResponseEntity<Job> exchange = restTemplate.exchange(uri, HttpMethod.GET, HttpEntity.EMPTY, Job.class);
        assertThat(exchange.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(exchange.hasBody()).isTrue();
        assertThat(exchange.getBody()).isNotNull();
    }

    @Test
    void shouldCreateJobForPostRequest() {
        String uri = "http://localhost:%s/api/jobs".formatted(port);
        RequestJobDTO job = new RequestJobDTO("TestName", "", "");
        ResponseEntity<Job> exchange = restTemplate.exchange(uri, HttpMethod.POST, new HttpEntity<>(job), Job.class);
        assertThat(exchange.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(exchange.hasBody()).isTrue();
        assertThat(exchange.getHeaders().getLocation()).isNotNull();
        assertThat(exchange.getBody()).isNotNull();
    }

    @Test
    void shouldUpdateJobForPutRequest() {
        String postUri = "http://localhost:%s/api/jobs".formatted(port);
        RequestJobDTO job = new RequestJobDTO("TestName", "", "");
        ResponseEntity<Job> postExchange = restTemplate.exchange(postUri, HttpMethod.POST, new HttpEntity<>(job), Job.class);

        String uri = "http://localhost:%s/api/jobs/%s".formatted(port, postExchange.getBody().getId());
        RequestJobDTO updatedJob = new RequestJobDTO("Not Developer", "", "");
        ResponseEntity<Job> exchange = restTemplate.exchange(uri, HttpMethod.PUT, new HttpEntity<>(updatedJob), Job.class);
        assertThat(exchange.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(exchange.hasBody()).isTrue();
        assertThat(exchange.getBody().getName()).isEqualTo("Not Developer");
    }

    @Test
    void shouldReturnNoContentWhenDeletingJob() {
        String postUri = "http://localhost:%s/api/jobs".formatted(port);
        RequestJobDTO job = new RequestJobDTO("TestName", "", "");
        ResponseEntity<Job> postExchange = restTemplate.exchange(postUri, HttpMethod.POST, new HttpEntity<>(job), Job.class);

        String uri = "http://localhost:%s/api/jobs/%s".formatted(port, postExchange.getBody().getId());
        ResponseEntity<Void> exchange = restTemplate.exchange(uri, HttpMethod.DELETE, HttpEntity.EMPTY, Void.class);
        assertThat(exchange.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
    }

    @Test
    void shouldReturnNoContentWhenDeletingNonExistingJob() {
        String postUri = "http://localhost:%s/api/jobs".formatted(port);

        String uri = "http://localhost:%s/api/jobs/%s".formatted(port, -1);
        ResponseEntity<Void> exchange = restTemplate.exchange(uri, HttpMethod.DELETE, HttpEntity.EMPTY, Void.class);
        assertThat(exchange.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
    }
}