package dev.braintrain.backend.company;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record JobMemberDTO(Long id, List<Long> jobIds) {
}
