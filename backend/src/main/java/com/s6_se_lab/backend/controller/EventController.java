package com.s6_se_lab.backend.controller;

import com.s6_se_lab.backend.model.Event;
import com.s6_se_lab.backend.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {
    @Autowired
    private EventService eventService;

    /**
     * Get all events.
     * @return List of all events.
     */
    @GetMapping
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    /**
     * Get events for a specific date.
     * @param date The date to fetch events for (in "yyyy-MM-dd" format).
     * @return List of events for the specified date.
     */
    // @GetMapping("/by-date")
    // public ResponseEntity<List<Event>> getEventsByDate(@RequestParam String date) {
    //     LocalDate eventDate = LocalDate.parse(date);
    //     List<Event> events = eventService.getEventsByDate(eventDate);
    //     return ResponseEntity.ok(events);
    // }

    /**
     * Get an event by ID.
     * @param eventId The ID of the event.
     * @return The event if found, or 404 Not Found.
     */
    @GetMapping("/{eventId}")
    public ResponseEntity<Event> getEventById(@PathVariable Long eventId) {
        return eventService.getEventById(eventId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Create a new event.
     * @param event The event to create.
     * @return The created event with HTTP status 201 Created.
     */
    @PostMapping
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        Event createdEvent = eventService.createEvent(event);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdEvent);
    }

    /**
     * Update an existing event.
     * @param eventId The ID of the event to update.
     * @param eventDetails The updated event details.
     * @return The updated event.
     */
    @PutMapping("/{eventId}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long eventId, @RequestBody Event eventDetails) {
        return ResponseEntity.ok(eventService.updateEvent(eventId, eventDetails));
    }

    /**
     * Delete an event by ID.
     * @param eventId The ID of the event to delete.
     * @return HTTP status 204 No Content.
     */
    @DeleteMapping("/{eventId}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long eventId) {
        eventService.deleteEvent(eventId);
        return ResponseEntity.noContent().build();
    }
}