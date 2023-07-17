package dev.braintrain.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class TestController {

    @Autowired
    MainRepository repository;

    @GetMapping
    public ResponseEntity<TestEntity> getTest() {
        return ResponseEntity.ok(repository.findById(1L));
    }
}
