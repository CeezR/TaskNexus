package dev.braintrain.backend.job;

import org.springframework.web.multipart.MultipartFile;

public record RequestJobDTO(String name, String description, String status, String crewId, String companyId, String startDate, String endDate, MultipartFile[] files) {
}
