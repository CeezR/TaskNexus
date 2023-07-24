package dev.braintrain.backend.job;

import dev.braintrain.backend.company.Company;
import dev.braintrain.backend.crew.Crew;

public record RequestJobDTO(String name, String description, String status, String crewId, String companyId) {
}
