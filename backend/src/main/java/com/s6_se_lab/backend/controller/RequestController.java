package com.s6_se_lab.backend.controller;

import com.s6_se_lab.backend.model.Request;
import com.s6_se_lab.backend.repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/requests")
public class RequestController {

    @Autowired
    private RequestRepository requestRepository;

    // 1️⃣ Submit a new request with file upload support
    @PostMapping(value = "/submit", consumes = "multipart/form-data")
    public ResponseEntity<String> submitRequest(
            @RequestParam("studentId") String studentId,
            @RequestParam("eventId") Long eventId,
            @RequestParam("requestType") String requestType,
            @RequestParam("requestDetails") String requestDetails,
            @RequestParam(value = "file", required = false) MultipartFile file) {

        try {
            Request request = new Request();
            request.setStudentId(studentId);
            request.setEventId(eventId);
            request.setRequestType(requestType);
            request.setRequestDetails(requestDetails);

            // Handle file if provided
            if (file != null && !file.isEmpty()) {
                request.setFileName(file.getOriginalFilename());
                request.setFileData(file.getBytes());
            }

            requestRepository.save(request);
            return ResponseEntity.ok("Request submitted successfully!");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error saving request.");
        }
    }

    // 2️⃣ Fetch all requests
    @GetMapping
    public ResponseEntity<List<Request>> getAllRequests() {
        List<Request> requests = requestRepository.findAll();
        return ResponseEntity.ok(requests);
    }

    // 3️⃣ Fetch a single request by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getRequestById(@PathVariable Long id) {
        Optional<Request> request = requestRepository.findById(id);
        return request.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 4️⃣ Update a request status (Approve/Reject)
    @PutMapping("/{id}")
    public ResponseEntity<String> updateRequestStatus(
            @PathVariable Long id,
            @RequestParam String status,
            @RequestParam(required = false) String rejectionReason) {

        Optional<Request> optionalRequest = requestRepository.findById(id);

        if (optionalRequest.isPresent()) {
            Request request = optionalRequest.get();
            try {
                Request.Status newStatus = Request.Status.valueOf(status.toUpperCase());
                request.setStatus(newStatus);
                if (newStatus == Request.Status.REJECTED) {
                    request.setRejectionReason(rejectionReason);
                }
                requestRepository.save(request);
                return ResponseEntity.ok("Request status updated successfully!");
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body("Invalid status. Use PENDING, APPROVED, or REJECTED.");
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 5️⃣ Delete a request
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRequest(@PathVariable Long id) {
        if (requestRepository.existsById(id)) {
            requestRepository.deleteById(id);
            return ResponseEntity.ok("Request deleted successfully!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
