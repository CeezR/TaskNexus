package dev.braintrain.backend.company;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.braintrain.backend.job.Job;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "company_name", nullable = false)
    private String name;

    @Column(name = "created_date", nullable = true, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    @Column(name = "updated_date", nullable = true)
    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedDate;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Job> jobs = new ArrayList<>();

    public Company(String name) {
        this.name = name;
    }

    public Company() {
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
    public List<Job> getJobs() {
        return jobs;
    }

    public void setJobs(List<Job> jobs) {
        this.jobs = jobs;
    }

    public void addJob(Job job) {
        jobs.add(job);
        job.setCompany(this);
    }
    public void removeJob(Job job) {
        jobs.remove(job);
        job.setCompany(null);
    }

    @PrePersist
    protected void onCreate() {
        if (createdDate == null) {
            createdDate = new Date();
        }
    }
}
