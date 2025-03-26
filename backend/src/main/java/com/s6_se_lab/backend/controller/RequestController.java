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
import java.util.Map;

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

    @GetMapping("/faculty/{facultyId}")
    public ResponseEntity<List<Map<String, Object>>> getRequestsByFacultyInCharge(@PathVariable String facultyId) {
        List<Map<String, Object>> requests = requestService.getRequestsWithStudentDetailsByFacultyId(facultyId);
        return ResponseEntity.ok(requests);
    }


@PutMapping("/{requestId}/approve")
public ResponseEntity<Request> approveRequest(@PathVariable Long requestId) {
    Request request = requestService.approveRequest(requestId);
    return ResponseEntity.ok(request);
}

@PutMapping("/{requestId}/reject")
public ResponseEntity<Request> rejectRequest(
    @PathVariable Long requestId,
    @RequestBody Map<String, String> requestBody) {
    
    String reason = requestBody.get("reason");
    Request request = requestService.rejectRequest(requestId, reason);
    return ResponseEntity.ok(request);
}

@GetMapping("/{requestId}")
public ResponseEntity<Map<String, Object>> getRequestDetails(@PathVariable Long requestId) {
    Map<String, Object> requestDetails = requestService.getRequestWithDetails(requestId);
    return ResponseEntity.ok(requestDetails);
}
}