package dev.braintrain.backend.job;

import dev.braintrain.backend.crew.Crew;

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

    @ManyToOne
    @JoinColumn(name = "crew_id")
    private Crew crew;

    public Job(String name, String description, String status, Crew crew) {
        this.name = name;
        this.description = description;
        this.status = status;
        this.crew = crew;
    }

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

    public Crew getCrew() {
        return crew;
    }

    public void setCrew(Crew crew) {
        this.crew = crew;
    }
}
