package dev.braintrain.backend.employee;

import dev.braintrain.backend.crew.Crew;

import javax.persistence.*;

@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(name = "employee_name", nullable = false)
    private String name;
    @Column(name = "employee_email")
    private String email;
    @Column(name = "employee_phone_number")
    private String phoneNumber;

    @ManyToOne
    @JoinColumn(name = "crew_id", nullable = true, columnDefinition = "BIGINT DEFAULT NULL")
    private Crew crew;

    public Crew getCrew() {
        return crew;
    }

    public void setCrew(Crew crew) {
        this.crew = crew;
    }

    public Employee(String name, String email, String phoneNumber) {
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

    public Employee() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
