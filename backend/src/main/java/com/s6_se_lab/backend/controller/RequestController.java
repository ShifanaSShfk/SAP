package com.s6_se_lab.backend.controller;


import com.s6_se_lab.backend.dto.FacultyIdsRequest;
import com.s6_se_lab.backend.model.Request;
import com.s6_se_lab.backend.model.RequestFacultyInCharge;
import com.s6_se_lab.backend.service.RequestService;
import com.s6_se_lab.backend.service.RequestFacultyInChargeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
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

    @Autowired
    private RequestFacultyInChargeService requestFacultyInChargeService;

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

    @PostMapping("/{requestId}/add-faculties")
public ResponseEntity<?> addFacultiesInCharge(@PathVariable Long requestId, @RequestBody FacultyIdsRequest body) {
    System.out.println("Received Faculty IDs: " + body.getFacultyIds());
    requestFacultyInChargeService.addFacultiesInCharge(requestId, body.getFacultyIds());
    return ResponseEntity.ok().build();
}

    @PutMapping("/{requestId}/approve")
public ResponseEntity<String> approveRequest(
        @PathVariable Long requestId,
        @RequestHeader String facultyId) {

    requestFacultyInChargeService.updateStatusA(requestId, facultyId, RequestFacultyInCharge.Status.Approved);
    return ResponseEntity.ok("Request approved by faculty");
}

    

@PutMapping("/{requestId}/reject")
public ResponseEntity<Request> rejectRequest(
    @PathVariable Long requestId,
    @RequestHeader String facultyId,
    @RequestBody Map<String, String> requestBody) {
    
    String reason = requestBody.get("reason");
    Request request = requestService.rejectRequest(requestId, reason);
    requestFacultyInChargeService.updateStatusR(requestId, facultyId, RequestFacultyInCharge.Status.Rejected, reason);
    return ResponseEntity.ok(request);
}

@PutMapping("/{requestId}/faapprove")
public ResponseEntity<String> faapproveRequest(
        @PathVariable Long requestId) {

    requestService.updateFAStatusA(requestId, Request.Status.Approved);
    return ResponseEntity.ok("Request approved by faculty");
}

    

@PutMapping("/{requestId}/fareject")
public ResponseEntity<String> farejectRequest(
    @PathVariable Long requestId,
    @RequestBody Map<String, String> requestBody) {
    
    String reason = requestBody.get("reason");
    requestService.updateFAStatusR(requestId, Request.Status.Rejected, reason);
    return ResponseEntity.ok("Request rejected by faculty");
}

@GetMapping("/{requestId}")
public ResponseEntity<Map<String, Object>> getRequestDetails(@PathVariable Long requestId, @RequestHeader String facultyId) {
    Map<String, Object> requestDetails = requestService.getRequestWithDetails(requestId, facultyId);
    return ResponseEntity.ok(requestDetails);
}


@GetMapping("/student/{studentId}")
public ResponseEntity<List<Map<String, Object>>> getStudentRequests(@PathVariable String studentId) {
    try {
        List<Map<String, Object>> requests = requestService.getStudentRequests(studentId);
        return ResponseEntity.ok(requests);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}

@PostMapping("/{requestId}/upload")
    public ResponseEntity<String> uploadRequestFile(
            @PathVariable Long requestId,
            @RequestParam("file") MultipartFile file,
            @RequestHeader("facultyId") String facultyId) {

        try {
            requestService.saveRequestFile(requestId, file, facultyId);
            return ResponseEntity.ok("File uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed: " + e.getMessage());
        }
    }


}