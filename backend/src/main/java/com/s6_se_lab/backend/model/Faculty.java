package com.s6_se_lab.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "faculty")
public class Faculty {
    @Id
    @Column(name = "faculty_id") // Explicitly map the column name
    private String facultyId; // Renamed to follow Java naming conventions

    @NotBlank
    @Column(name = "faculty_name")
    private String facultyName;

    @NotNull
    @Column(name = "is_faculty_advisor")
    private boolean isFacultyAdvisor;

    @NotBlank
    private String department;

    // Default constructor (required for JPA)
    public Faculty() {}

    // Parameterized constructor
    public Faculty(String facultyId, String facultyName, boolean isFacultyAdvisor, String department) {
        this.facultyId = facultyId;
        this.facultyName = facultyName;
        this.isFacultyAdvisor = isFacultyAdvisor;
        this.department = department;
    }

    // Getters and Setters
    public String getFacultyId() {
        return facultyId;
    }

    public void setFacultyId(String facultyId) {
        this.facultyId = facultyId;
    }

    public String getFacultyName() {
        return facultyName;
    }

    public void setFacultyName(String facultyName) {
        this.facultyName = facultyName;
    }

    public boolean isFacultyAdvisor() {
        return isFacultyAdvisor;
    }

    public void setFacultyAdvisor(boolean isFacultyAdvisor) {
        this.isFacultyAdvisor = isFacultyAdvisor;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
}