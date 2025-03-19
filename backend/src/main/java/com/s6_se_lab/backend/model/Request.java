package com.s6_se_lab.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "student_requests")
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    private Long requestId;  // Primary Key

    @Column(name = "student_id", nullable = false, length = 9)
    private String studentId;

    @Column(name = "event_id")
    private Integer eventId;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", columnDefinition = "enum('Pending','Approved','Rejected') default 'Pending'")
    private Status status = Status.PENDING;

    @Column(name = "submission_date", updatable = false)
    private LocalDateTime submissionDate = LocalDateTime.now();

    @Column(name = "approved_date")
    private Date approvedDate;

    @Column(name = "rejection_reason", columnDefinition = "TEXT")
    private String rejectionReason;

    @Column(name = "required_approvals", nullable = false)
    private int requiredApprovals = 0;

    @Column(name = "event_date")
    private Date eventDate;

    @Column(name = "event_name")
    private String eventName;

    @Column(name = "event_time")
    private String eventTime;

    @Column(name = "faculty_advisor_name")
    private String facultyAdvisorName;

    @Column(name = "faculty_name")
    private String facultyName;

    @Column(name = "location")
    private String location;

    @Column(name = "student_name")
    private String studentName;

    @Column(name = "faculty")
    private String faculty;

    @Column(name = "category")
    private String category;

    @Column(name = "date")
    private String date;

    @Column(name = "description")
    private String description;

    @Column(name = "name")
    private String name;

    @Column(name = "points")
    private Integer points;

    @Column(name = "proof_file_path")
    private String proofFilePath;

    @Column(name = "time")
    private String time;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "request_details", length = 500)
    private String requestDetails;

    @Column(name = "request_type")
    private String requestType;

    // Enum for status
    public enum Status {
        PENDING, APPROVED, REJECTED
    }

    // Default constructor (Required by JPA)
    public Request() {}

    // Constructor for initialization
    public Request(String studentId, Integer eventId, String requestType, String requestDetails) {
        this.studentId = studentId;
        this.eventId = eventId;
        this.requestType = requestType;
        this.requestDetails = requestDetails;
        this.status = Status.PENDING;
        this.submissionDate = LocalDateTime.now();
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getRequestId() { return requestId; }
    public void setRequestId(Long requestId) { this.requestId = requestId; }

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public Integer getEventId() { return eventId; }
    //public void setEventId(Long eventId2) { this.eventId = eventId2; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public LocalDateTime getSubmissionDate() { return submissionDate; }
    public void setSubmissionDate(LocalDateTime submissionDate) { this.submissionDate = submissionDate; }

    public Date getApprovedDate() { return approvedDate; }
    public void setApprovedDate(Date approvedDate) { this.approvedDate = approvedDate; }

    public String getRejectionReason() { return rejectionReason; }
    public void setRejectionReason(String rejectionReason) { this.rejectionReason = rejectionReason; }

    public int getRequiredApprovals() { return requiredApprovals; }
    public void setRequiredApprovals(int requiredApprovals) { this.requiredApprovals = requiredApprovals; }

    public Date getEventDate() { return eventDate; }
    public void setEventDate(Date eventDate) { this.eventDate = eventDate; }

    public String getEventName() { return eventName; }
    public void setEventName(String eventName) { this.eventName = eventName; }

    public String getEventTime() { return eventTime; }
    public void setEventTime(String eventTime) { this.eventTime = eventTime; }

    public String getFacultyAdvisorName() { return facultyAdvisorName; }
    public void setFacultyAdvisorName(String facultyAdvisorName) { this.facultyAdvisorName = facultyAdvisorName; }

    public String getFacultyName() { return facultyName; }
    public void setFacultyName(String facultyName) { this.facultyName = facultyName; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getFaculty() { return faculty; }
    public void setFaculty(String faculty) { this.faculty = faculty; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Integer getPoints() { return points; }
    public void setPoints(Integer points) { this.points = points; }

    public String getProofFilePath() { return proofFilePath; }
    public void setProofFilePath(String proofFilePath) { this.proofFilePath = proofFilePath; }

    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getRequestDetails() { return requestDetails; }
    public void setRequestDetails(String requestDetails) { this.requestDetails = requestDetails; }

    public String getRequestType() { return requestType; }
    public void setRequestType(String requestType) { this.requestType = requestType; }

    public void setEventId(Long eventId2) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setEventId'");
    }

    public void setFileName(String originalFilename) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setFileName'");
    }

    public void setFileData(byte[] bytes) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setFileData'");
    }
}
