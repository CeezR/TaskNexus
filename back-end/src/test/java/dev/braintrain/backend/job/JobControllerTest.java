package dev.braintrain.backend.job;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.*;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@ActiveProfiles("test")
class JobControllerTest {

    @Value("${server.port}")
    private int port;

    @Autowired
    RestTemplate restTemplate;

    private static MultiValueMap<String, Object> modelAttribute;

    @BeforeAll
    static void setup() {
        modelAttribute = new LinkedMultiValueMap<>();
        modelAttribute.add("name", "TestName");
        modelAttribute.add("description", "");
        modelAttribute.add("status", "");
        modelAttribute.add("crewId", "1");
        modelAttribute.add("companyId", "1");
        modelAttribute.add("startDate", "");
        modelAttribute.add("endDate", "");
        modelAttribute.add("files", null);
    }

    @Test
    void getJobMappingShouldReturnJobList() {
        String uri = "http://localhost:%s/api/jobs".formatted(port);
        ResponseEntity<JobResponseDTO> exchange = restTemplate.exchange(uri, HttpMethod.GET, HttpEntity.EMPTY, JobResponseDTO.class);
        assertThat(exchange.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(exchange.hasBody()).isTrue();
        assertThat(exchange.getBody().jobList()).isNotNull();
    }

    @Test
    void shouldCreateJobForPostRequest() {
        String uriPost = "http://localhost:%s/api/jobs".formatted(port);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(modelAttribute, headers);

        ResponseEntity<Job> postExchange = restTemplate.exchange(uriPost, HttpMethod.POST, requestEntity, Job.class);

        String uri = "http://localhost:%s/api/jobs/%s".formatted(port, postExchange.getBody().getId());
        ResponseEntity<Job> exchange = restTemplate.exchange(uri, HttpMethod.GET, HttpEntity.EMPTY, Job.class);
        assertThat(exchange.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(exchange.hasBody()).isTrue();
        assertThat(exchange.getBody()).isNotNull();
    }

    @Test
    void shouldUpdateJobForPutRequest() {
        String uriPost = "http://localhost:%s/api/jobs".formatted(port);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(modelAttribute, headers);
        ResponseEntity<Job> postExchange = restTemplate.exchange(uriPost, HttpMethod.POST, requestEntity, Job.class);

        String uri = "http://localhost:%s/api/jobs/%s".formatted(port, postExchange.getBody().getId());
        RequestJobDTO updatedJob = new RequestJobDTO("Not Developer", "", "", "1", "1", "", "", null);
        ResponseEntity<Job> exchange = restTemplate.exchange(uri, HttpMethod.PUT, new HttpEntity<>(updatedJob), Job.class);
        assertThat(exchange.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(exchange.hasBody()).isTrue();
        assertThat(exchange.getBody().getName()).isEqualTo("Not Developer");
    }

    @Test
    void shouldReturnNoContentWhenDeletingJob() {
        String uriPost = "http://localhost:%s/api/jobs".formatted(port);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(modelAttribute, headers);
        ResponseEntity<Job> postExchange = restTemplate.exchange(uriPost, HttpMethod.POST, requestEntity, Job.class);

        String uri = "http://localhost:%s/api/jobs/%s".formatted(port, postExchange.getBody().getId());
        ResponseEntity<Void> exchange = restTemplate.exchange(uri, HttpMethod.DELETE, HttpEntity.EMPTY, Void.class);
        assertThat(exchange.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
    }

    @Test
    void shouldReturnNoContentWhenDeletingNonExistingJob() {
        String uri = "http://localhost:%s/api/jobs/%s".formatted(port, -1);
        ResponseEntity<Void> exchange = restTemplate.exchange(uri, HttpMethod.DELETE, HttpEntity.EMPTY, Void.class);
        assertThat(exchange.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
    }
}