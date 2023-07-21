package dev.braintrain.backend.crew;

import dev.braintrain.backend.employee.Employee;
import dev.braintrain.backend.employee.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CrewService {

    private final CrewRepository repo;
    private final EmployeeService employeeService;

    @Autowired
    public CrewService(CrewRepository repo, EmployeeService employeeService) {
        this.repo = repo;
        this.employeeService = employeeService;
    }

    public List<CrewResponseDTO> findAll() {
        List<Crew> crews = repo.findAll();
        List<CrewResponseDTO> crewResponseDTOs = crews.stream()
                .map(crew -> new CrewResponseDTO(crew.getId(), crew.getName(), mapEmployeesToDTOs(crew.getEmployees())))
                .collect(Collectors.toList());
        return crewResponseDTOs;
    }

    private List<EmployeeDTO> mapEmployeesToDTOs(List<Employee> employees) {
        return employees.stream()
                .map(employee -> new EmployeeDTO(employee.getId(), employee.getName(), employee.getEmail(), employee.getPhoneNumber()))
                .collect(Collectors.toList());
    }

    public Crew save(CrewRequestDTO crewRequest) {
        return repo.save(new Crew(crewRequest.name(), null));
    }

    public Crew save(Crew crew) {
        return repo.save(crew);
    }

    public CrewResponseDTO findById(Long crewId) {
        Optional<Crew> crew = repo.findById(crewId);
        List<EmployeeDTO> employeeDTOs = null;
        if(crew.isPresent()){
            if(crew.get().getEmployees() != null){
                employeeDTOs = convertToDTOList(crew.get().getEmployees());
            }
            return new CrewResponseDTO(crew.get().getId(), crew.get().getName(), employeeDTOs);
        }else{
            return null;
        }
    }

    public Optional<Crew> findByIdWithOutTransforamtion(Long crewId) {
        return repo.findById(crewId);
    }

    public void delete(Long crewId) {
        repo.deleteById(crewId);
    }

    public static List<EmployeeDTO> convertToDTOList(List<Employee> employees) {
        return employees.stream()
                .map(CrewService::convertToDTO)
                .collect(Collectors.toList());
    }

    public static EmployeeDTO convertToDTO(Employee employee) {
        return new EmployeeDTO(
                employee.getId(),
                employee.getName(),
                employee.getEmail(),
                employee.getPhoneNumber()
        );
    }

}
