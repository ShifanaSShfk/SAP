package com.s6_se_lab.backend.service;

import com.s6_se_lab.backend.model.Event;
import com.s6_se_lab.backend.model.Faculty;
import com.s6_se_lab.backend.repository.EventRepository;
import com.s6_se_lab.backend.repository.FacultyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;
    private final FacultyRepository facultyRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event getEventById(Long eventId) {
        return eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + eventId));
    }

    public Event createEvent(Event event, Set<String> facultyIds) {
        // Validate and get all faculty members
        Set<Faculty> faculties = facultyIds.stream()
                .map(id -> facultyRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Faculty not found with id: " + id)))
                .collect(Collectors.toSet());
        
        event.setFaculties(faculties);
        return eventRepository.save(event);
    }

    public Event updateEvent(Long eventId, Event eventDetails, Set<String> facultyIds) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + eventId));

        // Update basic event details
        event.setEventName(eventDetails.getEventName());
        event.setEventType(eventDetails.getEventType());
        event.setEventStartDate(eventDetails.getEventStartDate());
        event.setEventEndDate(eventDetails.getEventEndDate());
        event.setEventStartTime(eventDetails.getEventStartTime());
        event.setEventEndTime(eventDetails.getEventEndTime());
        event.setLocation(eventDetails.getLocation());
        event.setActivityPoints(eventDetails.getActivityPoints());
        event.setDescription(eventDetails.getDescription());

        // Update associated faculty if provided
        if (facultyIds != null && !facultyIds.isEmpty()) {
            Set<Faculty> faculties = facultyIds.stream()
                    .map(id -> facultyRepository.findById(id)
                            .orElseThrow(() -> new RuntimeException("Faculty not found with id: " + id)))
                    .collect(Collectors.toSet());
            event.setFaculties(faculties);
        }

        return eventRepository.save(event);
    }

    public void deleteEvent(Long eventId) {
        if (!eventRepository.existsById(eventId)) {
            throw new RuntimeException("Event not found with id: " + eventId);
        }
        eventRepository.deleteById(eventId);
    }

    public List<Event> getEventsByFaculty(String facultyId) {
        return eventRepository.findByFacultyId(facultyId);
    }

    public List<Event> getEventsByYearAndMonth(int year, int month) {
        return eventRepository.findByYearAndMonth(year, month);
    }

    public List<Event> getEventsByFacultyAndDate(String facultyId, LocalDate date) {
        return eventRepository.findByFacultyAndDate(facultyId, date);
    }

    public List<Event> getUpcomingEvents(int limit) {
        LocalDate today = LocalDate.now();
        return eventRepository.findByEventStartDateGreaterThanEqualOrderByEventStartDateAsc(today)
                .stream()
                .limit(limit)
                .collect(Collectors.toList());
    }
}