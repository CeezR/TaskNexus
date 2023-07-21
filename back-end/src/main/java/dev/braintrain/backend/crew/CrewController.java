package dev.braintrain.backend.crew;

import dev.braintrain.backend.employee.Employee;
import dev.braintrain.backend.employee.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/crews")
@CrossOrigin(origins = "*")
public class CrewController {

    private final CrewService service;
    private final EmployeeService employeeService;

    @Autowired
    public CrewController(CrewService service, EmployeeService employeeService) {
        this.service = service;
        this.employeeService = employeeService;
    }

    @GetMapping
    public ResponseEntity<List<CrewResponseDTO>> getAllCrews() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{crewId}")
    public ResponseEntity<CrewResponseDTO> getCrew(@PathVariable String crewId) {
        CrewResponseDTO resp = service.findById(Long.valueOf(crewId));
        if(resp == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(resp);
    }

    @PostMapping
    public ResponseEntity<Crew> createCrew(@RequestBody CrewRequestDTO crewRequest) {
        Crew saveCrew = service.save(crewRequest);
        URI location  = URI.create("/api/crews/" + saveCrew.getId());
        return ResponseEntity.created(location).body(saveCrew);
    }

    @PutMapping("/{crewId}")
    public ResponseEntity<Crew> updateCrew(@PathVariable Long crewId, @RequestBody Crew crewUpdate) {
        CrewResponseDTO resp = service.findById(crewId);
        if(resp == null) {
            return ResponseEntity.notFound().build();
        }
        Crew updatedCrew = service.save(crewUpdate);
        return ResponseEntity.ok().body(updatedCrew);
    }

    @DeleteMapping("/{crewId}")
    public ResponseEntity<Void> deleteCrew(@PathVariable Long crewId) {
        service.delete(crewId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/addEmployees")
    public ResponseEntity<Crew> addEmployeesToCrew(@RequestBody CrewMemberDTO crewMemberDTO) {
        Crew crew = service.findByIdWithOutTransforamtion(crewMemberDTO.id().longValue()).orElse(null);
        if (crew == null) {
            return ResponseEntity.notFound().build();
        }

        for (Long employeeId : crewMemberDTO.employeeIds()) {
            Employee employee = employeeService.findEmployeeById(employeeId).orElse(null);
            if (employee != null) {
                crew.addEmployee(employee);
            }
        }

        Crew updatedCrew = service.save(crew);
        return ResponseEntity.ok(updatedCrew);
    }

    @DeleteMapping("/removeEmployees")
    public ResponseEntity<Crew> removeEmployeesFromCrew( @RequestBody CrewMemberDTO crewMemberDTO) {
        Crew crew = service.findByIdWithOutTransforamtion(crewMemberDTO.id().longValue()).orElse(null);
        if (crew == null) {
            return ResponseEntity.notFound().build();
        }

        for (Long employeeId : crewMemberDTO.employeeIds().toArray(new Long[0])) {
            Employee employee = employeeService.findEmployeeById(employeeId).orElse(null);
            if (employee != null && employee.getCrew() == crew) {
                crew.removeEmployee(employee);
            }
        }

        Crew updatedCrew = service.save(crew);
        return ResponseEntity.ok(updatedCrew);
    }
}
