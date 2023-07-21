package dev.braintrain.backend.crew;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.braintrain.backend.employee.Employee;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Crew {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "crew_name", nullable = false)
    private String name;


    @OneToMany(mappedBy = "crew", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Employee> employees = new ArrayList<>();


    // Getter and setter for employees
    public List<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(List<Employee> employees) {
        this.employees = employees;
    }

    public void addEmployee(Employee employee) {
        employees.add(employee);
        employee.setCrew(this);
    }

    public void removeEmployee(Employee employee) {
        employees.remove(employee);
        employee.setCrew(null);
    }

    public Crew() {
    }
    public Crew( String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Crew(String name, List<Employee> employees) {
        this.name = name;
        this.employees = employees;
    }
}

