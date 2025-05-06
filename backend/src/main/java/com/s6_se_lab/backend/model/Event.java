package com.s6_se_lab.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "event")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_id")
    private Long eventId;

    @NotBlank
    @Column(name = "event_name")
    private String eventName;

    @NotBlank
    @Column(name = "event_type")
    private String eventType;

    @NotNull
    @Column(name = "event_date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate eventStartDate;

    @NotNull
    @Column(name = "event_end_date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate eventEndDate;

    @NotNull
    @Column(name = "event_time")
    @JsonFormat(pattern = "HH:mm")
    private LocalTime eventStartTime;

    @NotNull
    @Column(name = "event_end_time")
    @JsonFormat(pattern = "HH:mm")
    private LocalTime eventEndTime;

    @NotBlank
    private String location;

    @NotNull
    @Column(name = "activity_points")
    private int activityPoints;

    @NotNull
    @Column(name = "event_description", columnDefinition = "TEXT")
    private String description;

    @ManyToMany
    @JoinTable(
        name = "event_faculty",
        joinColumns = @JoinColumn(name = "event_id"),
        inverseJoinColumns = @JoinColumn(name = "faculty_id")
    )
    private Set<Faculty> faculties = new HashSet<>();

    @Column(name = "poster_url")
    private String posterUrl;

}