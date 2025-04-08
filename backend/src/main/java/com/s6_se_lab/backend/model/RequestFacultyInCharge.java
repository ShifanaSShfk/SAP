package com.s6_se_lab.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "request_faculty_in_charge")
public class RequestFacultyInCharge {

    @EmbeddedId
    private RequestFacultyId id;

    @ManyToOne
    @MapsId("requestId")
    @JoinColumn(name = "request_id")
    private Request request;

    @ManyToOne
    @MapsId("facultyId")
    @JoinColumn(name = "faculty_id")
    private Faculty faculty;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", columnDefinition = "ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending'")
    private Status status = Status.Pending;

    @Column(name = "rejection_reason", length = 1000)
    private String rejectionReason;

    public enum Status {
        Pending, Approved, Rejected;

        public String getDisplayValue() {
            return this.name();
        }
    }

    public RequestFacultyInCharge() {}

    public RequestFacultyInCharge(Request request, Faculty faculty) {
        this.id = new RequestFacultyId(request.getRequestId(), faculty.getFacultyId());
        this.request = request;
        this.faculty = faculty;
    }

    // Getters and Setters
    public RequestFacultyId getId() {
        return id;
    }

    public void setId(RequestFacultyId id) {
        this.id = id;
    }

    public Request getRequest() {
        return request;
    }

    public void setRequest(Request request) {
        this.request = request;
    }

    public Faculty getFaculty() {
        return faculty;
    }

    public void setFaculty(Faculty faculty) {
        this.faculty = faculty;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }
}
