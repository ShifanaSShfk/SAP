package com.s6_se_lab.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "student")
@Data // Lombok annotation for getters, setters, toString, equals, and hashCode
@NoArgsConstructor // Lombok annotation for default constructor
@AllArgsConstructor // Lombok annotation for parameterized constructor
public class Student {

    @Id
    @Column(name = "student_id")
    private String studentId;

    @NotBlank
    @Column(name = "student_name")
    private String studentName;

    @NotNull
    @Column(name = "total_points")
    private int totalPoints;

    @NotNull
    @Column(name = "department_points")
    private int departmentPoints;

    @NotNull
    @Column(name = "institutional_points")
    private int institutionalPoints;

    @NotBlank
    @Column(name = "faculty_advisor_id")
    private String facultyAdvisorId;
}