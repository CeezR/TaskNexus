package dev.braintrain.backend.employee;

import dev.braintrain.backend.crew.Crew;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

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

    @Column(name = "created_date", nullable = true, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    @Column(name = "updated_date", nullable = true)
    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedDate;

    @ManyToOne
    @JoinColumn(name = "crew_id", nullable = true, columnDefinition = "BIGINT DEFAULT NULL")
    private Crew crew;

    public Crew getCrew() {
        return crew;
    }

    public void setCrew(Crew crew) {
        this.crew = crew;
    }

    public Employee(String name, String email, String phoneNumber, Crew crew) {
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.crew = crew;
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

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public Date getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(Date updatedDate) {
        this.updatedDate = updatedDate;
    }

    @PrePersist
    protected void onCreate() {
        if (createdDate == null) {
            createdDate = new Date();
        }
    }
}
