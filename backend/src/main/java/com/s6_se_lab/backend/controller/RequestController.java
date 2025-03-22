package com.s6_se_lab.backend.controller;

import com.s6_se_lab.backend.model.Request;
import com.s6_se_lab.backend.service.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;

@RestController
@RequestMapping("/api/requests") // Base path for all endpoints in this controller
public class RequestController {

    @Autowired
    private RequestService requestService;

    // Endpoint to create a request for a predefined event
    @PostMapping("/event")
    public ResponseEntity<Request> createEventRequest(
            @RequestParam String name,
            @RequestParam String rollNumber,
            @RequestParam Long eventId,
            @RequestParam MultipartFile proofFile) throws IOException {
        Request request = requestService.createEventRequest(name, rollNumber, eventId, proofFile);
        return ResponseEntity.ok(request);
    }

    @PostMapping("/custom")
public ResponseEntity<Request> createCustomRequest(
        @RequestParam String name,
        @RequestParam String rollNumber,
        @RequestParam String eventName,
        @RequestParam String eventType,
        @RequestParam LocalDate eventDate,
        @RequestParam LocalTime eventTime,
        @RequestParam String location,
        @RequestParam int activityPoints,
        @RequestParam String facultyInChargeId, // New parameter
        @RequestParam MultipartFile proofFile) throws IOException {
    Request request = requestService.createCustomRequest(name, rollNumber, eventName, eventType, eventDate, eventTime, location, activityPoints, facultyInChargeId, proofFile);
    return ResponseEntity.ok(request);
}
}