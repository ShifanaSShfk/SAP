package com.s6_se_lab.backend.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import com.s6_se_lab.backend.model.Event;
import com.s6_se_lab.backend.service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.*;
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

    @GetMapping("/all")
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

@PostMapping("/uploadPoster")
    public ResponseEntity<String> uploadPoster(@RequestParam("file") MultipartFile file) {
        try {
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path uploadPath = Paths.get("uploads/posters"); // folder to save posters
            Files.createDirectories(uploadPath); // creates folder if not exists

            Path filePath = uploadPath.resolve(fileName);
            Files.write(filePath, file.getBytes());

            return ResponseEntity.ok(fileName); // Return just the filename or full URL if needed

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Poster upload failed.");
        }
    }

@GetMapping("/posters/{filename:.+}")
public ResponseEntity<Resource> getPoster(@PathVariable String filename) {
    String UPLOAD_DIR = "uploads/posters";

    try {
        // Securely resolve the file path
        Path filePath = Paths.get(UPLOAD_DIR).resolve(filename).normalize();
        Path uploadPath = Paths.get(UPLOAD_DIR).toAbsolutePath();

        if (!filePath.toAbsolutePath().startsWith(uploadPath)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Resource resource = new UrlResource(filePath.toUri());

        if (!resource.exists() || !resource.isReadable()) {
            return ResponseEntity.notFound().build();
        }

        String contentType = Files.probeContentType(filePath);
        if (contentType == null) {
            contentType = "application/octet-stream"; // Fallback
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                .body(resource);

    } catch (MalformedURLException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    } catch (IOException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
}


}