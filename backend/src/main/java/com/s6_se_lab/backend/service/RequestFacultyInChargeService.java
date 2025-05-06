package com.s6_se_lab.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.s6_se_lab.backend.model.RequestFacultyInCharge;
import com.s6_se_lab.backend.repository.FacultyRepository;
import com.s6_se_lab.backend.repository.RequestFacultyInChargeRepository;
import com.s6_se_lab.backend.model.Faculty;
import com.s6_se_lab.backend.model.Request;
import com.s6_se_lab.backend.model.RequestFacultyId;
import com.s6_se_lab.backend.repository.RequestRepository;

import jakarta.transaction.Transactional;

    @Service
public class RequestFacultyInChargeService {

    @Autowired
    private RequestFacultyInChargeRepository requestFacultyInChargeRepository;

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private FacultyRepository facultyRepository;

    @Transactional
public void updateStatusA(Long requestId, String facultyId, RequestFacultyInCharge.Status status) {
    // Step 1: Update this faculty’s approval
    RequestFacultyInCharge rfic = requestFacultyInChargeRepository
        .findByRequest_RequestIdAndFaculty_FacultyId(requestId, facultyId)
        .orElseThrow(() -> new RuntimeException("Faculty-Request mapping not found"));

    rfic.setStatus(status);
    requestFacultyInChargeRepository.save(rfic);

    // Step 2: Check if all faculties have approved
    long totalCount = requestFacultyInChargeRepository.countByRequest_RequestId(requestId);
    long approvedCount = requestFacultyInChargeRepository.countByRequest_RequestIdAndStatus(
        requestId, RequestFacultyInCharge.Status.Approved
    );

    // Step 3: If all approved, update the request status
    if (totalCount == approvedCount) {
        Request request = requestRepository.findById(requestId)
            .orElseThrow(() -> new RuntimeException("Request not found"));

        request.setStatus(Request.Status.Approved);
        requestRepository.save(request);
    }
}

    public void updateStatusR(Long requestId, String facultyId, RequestFacultyInCharge.Status status, String reason) {
        RequestFacultyInCharge rfic = requestFacultyInChargeRepository
            .findByRequest_RequestIdAndFaculty_FacultyId(requestId, facultyId)
            .orElseThrow(() -> new RuntimeException("Faculty-Request mapping not found"));

        rfic.setStatus(status);
        rfic.setRejectionReason(reason);
        requestFacultyInChargeRepository.save(rfic);
    }
    
    public void addFacultiesInCharge(Long requestId, List<String> facultyIds) {
        Request request = requestRepository.findById(requestId)
            .orElseThrow(() -> new RuntimeException("Request not found with id: " + requestId));
    
        for (String facultyId : facultyIds) {
            Faculty faculty = facultyRepository.findById(facultyId)
                .orElseThrow(() -> new RuntimeException("Faculty not found with id: " + facultyId));
    
            RequestFacultyInCharge inCharge = new RequestFacultyInCharge();
            
            // 👉 THIS LINE IS MISSING
            inCharge.setId(new RequestFacultyId(request.getRequestId(), faculty.getFacultyId()));
            
            inCharge.setRequest(request);
            inCharge.setFaculty(faculty);
            inCharge.setStatus(RequestFacultyInCharge.Status.Pending);
    
            System.out.println("Saving Faculty InCharge: " + inCharge);
    
            requestFacultyInChargeRepository.save(inCharge);
        }
    }
    
    
}