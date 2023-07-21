package dev.braintrain.backend.job;

import javax.persistence.*;

@Entity
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "job_name", nullable = false)
    private String name;

    @Column(name = "job_description", nullable = false)
    private String description;
    
    @Column(name = "job_status", nullable = false)
    private String status;

    public Job(String name, String description, String status) {
        this.name = name;
        this.description = description;
        this.status = status;
    }

    public Job() {

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
