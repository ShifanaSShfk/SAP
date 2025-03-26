package com.s6_se_lab.backend.controller;

import com.s6_se_lab.backend.model.Request;
import com.s6_se_lab.backend.service.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class RequestController {

    @Autowired
    private RequestService requestService;

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
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate eventDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime eventTime,
            @RequestParam String location,
            @RequestParam int activityPoints,
            @RequestParam List<String> facultyInChargeIds,
            @RequestParam MultipartFile proofFile) throws IOException {
        Request request = requestService.createCustomRequest(
                name, rollNumber, eventName, eventType,
                eventDate, eventTime, location, activityPoints,
                facultyInChargeIds, proofFile);
        return ResponseEntity.ok(request);
    }
}