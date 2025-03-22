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

    public FacultyService(FacultyRepository facultyRepository) {
        this.facultyRepository = facultyRepository;
    }

    /**
     * Get all faculty members.
     * @return List of all faculty members.
     */
    public List<Faculty> getAllFaculty() {
        return new ArrayList<>(facultyRepository.findAll()); // ✅ Convert Iterable to List
    }

    /**
     * Get a faculty member by ID.
     * @param facultyId The ID of the faculty member.
     * @return Optional containing the faculty member if found.
     */
    public Optional<Faculty> getFacultyById(String facultyId) {
        return facultyRepository.findById(facultyId);
    }

    /**
     * Create a new faculty member.
     * @param faculty The faculty member to create.
     * @return The created faculty member.
     */
    public Faculty createFaculty(Faculty faculty) {
        // Check if faculty with the same ID already exists
        if (facultyRepository.existsById(faculty.getFacultyId())) {
            throw new RuntimeException("Faculty with ID " + faculty.getFacultyId() + " already exists.");
        }
        return facultyRepository.save(faculty);
    }

    /**
     * Update an existing faculty member.
     * @param facultyId The ID of the faculty member to update.
     * @param facultyDetails The updated faculty details.
     * @return The updated faculty member.
     */
    public Faculty updateFaculty(String facultyId, Faculty facultyDetails) {
        Faculty faculty = facultyRepository.findById(facultyId)
                .orElseThrow(() -> new RuntimeException("Faculty not found with ID: " + facultyId));

        // Update fields
        faculty.setFacultyName(facultyDetails.getFacultyName());
        faculty.setFacultyAdvisor(facultyDetails.isFacultyAdvisor()); // Corrected method name
        faculty.setDepartment(facultyDetails.getDepartment());

        return facultyRepository.save(faculty);
    }

    /**
     * Delete a faculty member by ID.
     * @param facultyId The ID of the faculty member to delete.
     */
    public void deleteFaculty(String facultyId) {
        if (!facultyRepository.existsById(facultyId)) {
            throw new RuntimeException("Faculty not found with ID: " + facultyId);
        }
        facultyRepository.deleteById(facultyId);
    }
}