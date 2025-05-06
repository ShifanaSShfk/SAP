package com.s6_se_lab.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "request_files")
public class RequestFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Link to Request table
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "request_id", nullable = false)
    private Request request;

    // Who uploaded the file (student/faculty)
    @Enumerated(EnumType.STRING)
    @Column(name = "uploaded_by", nullable = false)
    private UploadedBy uploadedBy;

    // Faculty who uploaded (optional, only when uploaded_by = FACULTY)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "faculty_id")
    private Faculty faculty;

    // Just the file name (path can be constructed later)
    @Column(name = "file_name", nullable = false)
    private String fileName;

    // Timestamp of upload
    @Column(name = "uploaded_at", nullable = false)
    private LocalDateTime uploadedAt = LocalDateTime.now();

    // Enum to indicate who uploaded
    public enum UploadedBy {
        STUDENT,
        FACULTY
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Request getRequest() {
        return request;
    }

    public void setRequest(Request request) {
        this.request = request;
    }

    public UploadedBy getUploadedBy() {
        return uploadedBy;
    }

    public void setUploadedBy(UploadedBy uploadedBy) {
        this.uploadedBy = uploadedBy;
    }

    public Faculty getFaculty() {
        return faculty;
    }

    public void setFaculty(Faculty faculty) {
        this.faculty = faculty;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public LocalDateTime getUploadedAt() {
        return uploadedAt;
    }

    public void setUploadedAt(LocalDateTime uploadedAt) {
        this.uploadedAt = uploadedAt;
    }
}
