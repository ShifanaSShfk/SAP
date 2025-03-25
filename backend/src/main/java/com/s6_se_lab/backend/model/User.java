package com.s6_se_lab.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @Column(name = "id", length = 15, nullable = false)
    private String id;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "role", nullable = false)
    private String role; // student, faculty, or admin

    @Column(name = "is_faculty_advisor", columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean isFacultyAdvisor = false;

    @Column(name = "name")
    private String name;

    @Column(name = "department")
    private String department;

    // Required no-arg constructor
    public User() {
    }

    // All-args constructor
    public User(String id, String email, String password, String role, 
               Boolean isFacultyAdvisor, String name, String department) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
        this.isFacultyAdvisor = isFacultyAdvisor;
        this.name = name;
        this.department = department;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    // public Boolean getIsFacultyAdvisor() {
    //     return isFacultyAdvisor;
    // }

    // public void setIsFacultyAdvisor(Boolean isFacultyAdvisor) {
    //     this.isFacultyAdvisor = isFacultyAdvisor;
    // }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

     // public Boolean getIsFacultyAdvisor() {
    //     return isFacultyAdvisor;
    // }

    // public void setIsFacultyAdvisor(Boolean isFacultyAdvisor) {
    //     this.isFacultyAdvisor = isFacultyAdvisor;
    // }public String getDepartment() {
    //     return department;
    // }

    public void setDepartment(String department) {
        this.department = department;
    }

    // toString method for debugging
    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", email='" + email + '\'' +
                ", role='" + role + '\'' +
                ", isFacultyAdvisor=" + isFacultyAdvisor +
                ", name='" + name + '\'' +
                ", department='" + department + '\'' +
                '}';
    }
}