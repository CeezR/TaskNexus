package dev.braintrain.backend.crew;

import java.util.List;

public record CrewResponseDTO(long id, String name, List<EmployeeDTO> employees) {
}
