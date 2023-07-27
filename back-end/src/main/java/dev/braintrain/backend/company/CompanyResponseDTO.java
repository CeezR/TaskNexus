package dev.braintrain.backend.company;

import java.util.List;

public record CompanyResponseDTO(long id, String name, String email, String phoneNumber, List<JobDTO> jobs) {
}
