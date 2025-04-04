package com.s6_se_lab.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "request")
public class Request {

    public enum Status {
        Pending("Pending"),
        Approved("Approved"),
        Rejected("Rejected");

        private final String displayValue;

        Status(String displayValue) {
            this.displayValue = displayValue;
        }

        public String getDisplayValue() {
            return displayValue;
        }

        public static Status fromValue(String value) {
            for (Status status : Status.values()) {
                if (status.displayValue.equalsIgnoreCase(value)) {
                    return status;
                }
            }
            throw new IllegalArgumentException("Unknown status value: " + value);
        }
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    private Long requestId;

    @Column(name = "created_at", nullable = false, columnDefinition = "DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6)")
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "event_id", nullable = true, foreignKey = @ForeignKey(name = "fk_request_event"))
    private Event event;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false, foreignKey = @ForeignKey(name = "fk_request_student"))
    private Student student;

    @Column(name = "faculty_advisor_id", length = 255)
    private String facultyAdvisorId;

    @Column(name = "proof_document", length = 255)
    private String proofDocument;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, columnDefinition = "ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending'")
    private Status status = Status.Pending;

    @Column(name = "activity_points", nullable = false, columnDefinition = "INT DEFAULT 0")
    private int activityPoints = 0;

    @Column(name = "event_date", nullable = false)
    private LocalDate eventDate;

    @Column(name = "event_name", nullable = false, length = 255)
    private String eventName;

    @Column(name = "event_time", nullable = false)
    private LocalTime eventTime;

    @Column(name = "event_type", nullable = false, length = 255)
    private String eventType;

    @Column(name = "location", nullable = false, length = 255)
    private String location;

    @Column(name = "rejection_reason", length = 1000)
    private String rejectionReason;

    @Enumerated(EnumType.STRING)
    @Column(name = "fa_status", nullable = false, columnDefinition = "ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending'")
    private Status FAStatus = Status.Pending;

    @ManyToMany
    @JoinTable(
        name = "request_faculty_in_charge",
        joinColumns = @JoinColumn(name = "request_id"),
        inverseJoinColumns = @JoinColumn(name = "faculty_id")
    )
    private Set<Faculty> facultyInCharge = new HashSet<>();

    public Request() {}

    // Getters and Setters
    public Long getRequestId() {
        return requestId;
    }

    public void setRequestId(Long requestId) {
        this.requestId = requestId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public String getProofDocument() {
        return proofDocument;
    }

    public void setProofDocument(String proofDocument) {
        this.proofDocument = proofDocument;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public int getActivityPoints() {
        return activityPoints;
    }

    public void setActivityPoints(int activityPoints) {
        this.activityPoints = activityPoints;
    }

    public LocalDate getEventDate() {
        return eventDate;
    }

    public void setEventDate(LocalDate eventDate) {
        this.eventDate = eventDate;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public LocalTime getEventTime() {
        return eventTime;
    }

    public void setEventTime(LocalTime eventTime) {
        this.eventTime = eventTime;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Set<Faculty> getFacultyInCharge() {
        return facultyInCharge;
    }

    public void setFacultyInCharge(Set<Faculty> facultyInCharge) {
        this.facultyInCharge = facultyInCharge;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }

    public Status getFAStatus() {
        return status;
    }

    public void setFAStatus(Status status) {
        this.status = status;
    }
}