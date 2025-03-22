package com.s6_se_lab.backend.controller;

import com.s6_se_lab.backend.model.Faculty;
import com.s6_se_lab.backend.service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faculty")
public class FacultyController {
    @Autowired
    private FacultyService facultyService;

    @GetMapping
    public List<Faculty> getAllFaculty() {
        return facultyService.getAllFaculty();
    }

    @GetMapping("/{facultyId}")
    public ResponseEntity<Faculty> getFacultyById(@PathVariable String facultyId) {
        return facultyService.getFacultyById(facultyId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Faculty createFaculty(@RequestBody Faculty faculty) {
        return facultyService.createFaculty(faculty);
    }

    @PutMapping("/{facultyId}")
    public ResponseEntity<Faculty> updateFaculty(@PathVariable String facultyId, @RequestBody Faculty facultyDetails) {
        return ResponseEntity.ok(facultyService.updateFaculty(facultyId, facultyDetails));
    }

    @DeleteMapping("/{facultyId}")
    public ResponseEntity<Void> deleteFaculty(@PathVariable String facultyId) {
        facultyService.deleteFaculty(facultyId);
        return ResponseEntity.noContent().build();
    }
}