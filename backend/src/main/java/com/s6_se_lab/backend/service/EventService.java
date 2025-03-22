package com.s6_se_lab.backend.service;

import com.s6_se_lab.backend.model.Event;
import com.s6_se_lab.backend.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Optional<Event> getEventById(Long eventId) {
        return eventRepository.findById(eventId);
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEvent(Long eventId, Event eventDetails) {
        Event event = eventRepository.findById(eventId).orElseThrow(() -> new RuntimeException("Event not found"));
        event.setEventName(eventDetails.getEventName());
        event.setEventType(eventDetails.getEventType());
        event.setEventDate(eventDetails.getEventDate());
        event.setEventTime(eventDetails.getEventTime());
        event.setLocation(eventDetails.getLocation());
        event.setFacultyInChargeId(eventDetails.getFacultyInChargeId());
        event.setActivityPoints(eventDetails.getActivityPoints());
        return eventRepository.save(event);
    }

    public void deleteEvent(Long eventId) {
        eventRepository.deleteById(eventId);
    }

    // Fetch events for a specific date
    // public List<Event> getEventsByDate(LocalDate date) {
    //     return eventRepository.findByEventDate(date);
    // }

}