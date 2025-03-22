package com.s6_se_lab.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "event")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_id") // Explicitly map the column name
    private Long eventId; // Renamed to follow Java naming conventions

    @NotBlank
    @Column(name = "event_name")
    private String eventName;

    @NotBlank
    @Column(name = "event_type")
    private String eventType;

    @NotNull
    @Column(name = "event_date")
    private LocalDate eventDate;

    @NotNull
    @Column(name = "event_time")
    private LocalTime eventTime;

    @NotBlank
    private String location;

    @NotBlank
    @Column(name = "faculty_in_charge_id")
    private String facultyInChargeId;

    @NotNull
    @Column(name = "activity_points")
    private int activityPoints;

    // Default constructor (required for JPA)
    public Event() {}

    // Parameterized constructor
    public Event(String eventName, String eventType, LocalDate eventDate, LocalTime eventTime, String location, String facultyInChargeId, int activityPoints) {
        this.eventName = eventName;
        this.eventType = eventType;
        this.eventDate = eventDate;
        this.eventTime = eventTime;
        this.location = location;
        this.facultyInChargeId = facultyInChargeId;
        this.activityPoints = activityPoints;
    }

    // Getters and Setters
    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public LocalDate getEventDate() {
        return eventDate;
    }

    public void setEventDate(LocalDate eventDate) {
        this.eventDate = eventDate;
    }

    public LocalTime getEventTime() {
        return eventTime;
    }

    public void setEventTime(LocalTime eventTime) {
        this.eventTime = eventTime;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getFacultyInChargeId() {
        return facultyInChargeId;
    }

    public void setFacultyInChargeId(String facultyInChargeId) {
        this.facultyInChargeId = facultyInChargeId;
    }

    public int getActivityPoints() {
        return activityPoints;
    }

    public void setActivityPoints(int activityPoints) {
        this.activityPoints = activityPoints;
    }
}