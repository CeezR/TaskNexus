package dev.braintrain.backend.crew;

import javax.persistence.*;

@Entity
public class Crew {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "crew_name", nullable = false)
    private String name;

    public Crew(String name) {
        this.name = name;
    }

    public Crew() {
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
}

