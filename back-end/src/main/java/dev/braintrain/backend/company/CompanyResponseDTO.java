package dev.braintrain.backend.company;

import java.util.List;

public record CompanyResponseDTO(long id, String name, List<JobDTO> jobs) {
}
