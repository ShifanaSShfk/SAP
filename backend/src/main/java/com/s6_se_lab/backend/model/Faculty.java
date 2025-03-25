package com.s6_se_lab.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "faculty")
@Getter
@Setter
@NoArgsConstructor
public class Faculty {
    
    @Id
    @Column(name = "faculty_id", nullable = false)
    private String facultyId;

    @NotBlank
    @Column(name = "faculty_name", nullable = false)
    private String facultyName;

    @Column(name = "is_faculty_advisor")
    private Boolean isFacultyAdvisor; // Changed to match DB column and added proper getter

    @NotBlank
    @Column(name = "department", nullable = false)
    private String department;

    @NotBlank
    @Column(name = "designation", nullable = false)
    private String designation;

    @Column(name = "faculty_room")
    private String facultyRoom;

    // Parameterized constructor
    public Faculty(String facultyId, String facultyName, Boolean isFacultyAdvisor, 
                  String department, String designation, String facultyRoom) {
        this.facultyId = facultyId;
        this.facultyName = facultyName;
        this.isFacultyAdvisor = isFacultyAdvisor;
        this.department = department;
        this.designation = designation;
        this.facultyRoom = facultyRoom;
    }

    // Custom getter for faculty advisor status to ensure proper JSON serialization
    public Boolean isFacultyAdvisor() {
        return isFacultyAdvisor;
    }
}