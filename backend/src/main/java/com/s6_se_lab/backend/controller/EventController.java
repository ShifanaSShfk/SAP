package com.s6_se_lab.backend.controller;

import com.s6_se_lab.backend.model.Event;
import com.s6_se_lab.backend.service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/events")
public class EventController {
    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/{eventId}")
    public ResponseEntity<Event> getEventById(@PathVariable Long eventId) {
        return ResponseEntity.ok(eventService.getEventById(eventId));
    }

    @GetMapping("/by-date")
    public ResponseEntity<List<Event>> getEventsByDate(
            @RequestParam int year,
            @RequestParam int month) {
        return ResponseEntity.ok(eventService.getEventsByYearAndMonth(year, month));
    }

    @GetMapping("/faculty/{facultyId}")
    public ResponseEntity<List<Event>> getEventsByFaculty(
            @PathVariable String facultyId) {
        return ResponseEntity.ok(eventService.getEventsByFaculty(facultyId));
    }

    @GetMapping("/faculty/{facultyId}/by-date/{date}")
    public ResponseEntity<List<Event>> getEventsByFacultyAndDate(
            @PathVariable String facultyId,
            @PathVariable LocalDate date) {
        return ResponseEntity.ok(eventService.getEventsByFacultyAndDate(facultyId, date));
    }

    @PostMapping
    public ResponseEntity<Event> createEvent(
            @RequestBody Event event,
            @RequestParam Set<String> facultyIds) {
        return ResponseEntity.ok(eventService.createEvent(event, facultyIds));
    }

    @PutMapping("/{eventId}")
    public ResponseEntity<Event> updateEvent(
            @PathVariable Long eventId,
            @RequestBody Event eventDetails,
            @RequestParam(required = false) Set<String> facultyIds) {
        return ResponseEntity.ok(eventService.updateEvent(eventId, eventDetails, facultyIds));
    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long eventId) {
        eventService.deleteEvent(eventId);
        return ResponseEntity.noContent().build();
    }
}