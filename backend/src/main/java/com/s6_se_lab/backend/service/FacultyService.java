package com.s6_se_lab.backend.service;

import com.s6_se_lab.backend.model.Faculty;
import com.s6_se_lab.backend.repository.FacultyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FacultyService {
    @Autowired
    private FacultyRepository facultyRepository;

    public List<Faculty> getAllFaculty() {
        return new ArrayList<>(facultyRepository.findAll());
    }

    public Optional<Faculty> getFacultyById(String facultyId) {
        return facultyRepository.findById(facultyId);
    }

    public Faculty createFaculty(Faculty faculty) {
        if (facultyRepository.existsById(faculty.getFacultyId())) {
            throw new RuntimeException("Faculty with ID " + faculty.getFacultyId() + " already exists.");
        }
        return facultyRepository.save(faculty);
    }

    public Faculty updateFaculty(String facultyId, Faculty facultyDetails) {
        Faculty faculty = facultyRepository.findById(facultyId)
                .orElseThrow(() -> new RuntimeException("Faculty not found with ID: " + facultyId));

        faculty.setFacultyName(facultyDetails.getFacultyName());
        faculty.setIsFacultyAdvisor(facultyDetails.isFacultyAdvisor());
        faculty.setDepartment(facultyDetails.getDepartment());
        faculty.setDesignation(facultyDetails.getDesignation());
        faculty.setFacultyRoom(facultyDetails.getFacultyRoom());

        return facultyRepository.save(faculty);
    }

    public void deleteFaculty(String facultyId) {
        if (!facultyRepository.existsById(facultyId)) {
            throw new RuntimeException("Faculty not found with ID: " + facultyId);
        }
        facultyRepository.deleteById(facultyId);
    }
}