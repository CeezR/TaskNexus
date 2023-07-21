package dev.braintrain.backend.crew;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;
@JsonInclude(JsonInclude.Include.NON_NULL)
public record CrewMemberDTO(Long id, List<Long> employeeIds){
}
