package com.s6_se_lab.backend.controller;

import com.s6_se_lab.backend.model.Faculty;
import com.s6_se_lab.backend.model.User;
import com.s6_se_lab.backend.service.FacultyService;
import com.s6_se_lab.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/faculty")
public class FacultyController {

    @Autowired
    private FacultyService facultyService;

    @Autowired
    private AuthService userService;

    @GetMapping
    public List<Faculty> getAllFaculty() {
        return facultyService.getAllFaculty();
    }

    @GetMapping("/{facultyId}")
    public ResponseEntity<?> getFacultyById(@PathVariable String facultyId) {
        Optional<Faculty> facultyOpt = facultyService.getFacultyById(facultyId);

        if (!facultyOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Faculty faculty = facultyOpt.get();
        Optional<User> userOpt = userService.getUserById(facultyId);

        Map<String, Object> response = new HashMap<>();
        response.put("facultyId", faculty.getFacultyId());
        response.put("facultyName", faculty.getFacultyName());
        response.put("isFacultyAdvisor", faculty.isFacultyAdvisor());
        response.put("department", faculty.getDepartment());
        response.put("designation", faculty.getDesignation());
        response.put("facultyRoom", faculty.getFacultyRoom());
        response.put("email", userOpt.map(User::getEmail).orElse(null));

        return ResponseEntity.ok(response);
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