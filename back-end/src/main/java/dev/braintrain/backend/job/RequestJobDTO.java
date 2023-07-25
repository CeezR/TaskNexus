package dev.braintrain.backend.job;

public record RequestJobDTO(String name, String description, String status, String crewId, String companyId) {
}
