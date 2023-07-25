package dev.braintrain.backend.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;


@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "*")
public class EmployeeController {

    private final EmployeeService service;

    @Autowired
    public EmployeeController(EmployeeService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<EmployeeResponseDTO> getAllEmployees() {
        return ResponseEntity.ok().body(new EmployeeResponseDTO(service.findAllEmployees()));
    }

    @GetMapping("/{employeeId}")
    public ResponseEntity<Employee> getEmployee(@PathVariable String employeeId) {
        Employee employee = service.findEmployeeById(Long.valueOf(employeeId)).orElse(null);
        if(employee == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(employee);
    }

    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody EmployeeRequestDTO employeeRequest) {
        Employee saveEmployee = service.saveEmployee(employeeRequest);
        URI location  = URI.create("/api/employees/" + saveEmployee.getId());
        return ResponseEntity.created(location).body(saveEmployee);
    }

    @DeleteMapping("/{employeeId}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long employeeId) {
        service.deleteEmployee(employeeId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{employeeId}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long employeeId, @RequestBody EmployeeRequestDTO employeeRequest) {
        Employee employee = service.findEmployeeById(employeeId).orElse(null);
        if(employee == null) {
            return ResponseEntity.notFound().build();
        }
        Employee updatedEmployee = service.updateEmployee(employee, employeeRequest);
        return ResponseEntity.ok().body(updatedEmployee);

    }
}
