package com.s6_se_lab.backend.repository;

import com.s6_se_lab.backend.model.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {

    // Find all requests by student ID
    List<Request> findByStudentStudentId(String studentId);

    // Find all requests by event ID
    List<Request> findByEventEventId(Long eventId);

    // Find all requests by status
    List<Request> findByStatus(Request.Status status);

    // Find all requests by faculty advisor ID
    List<Request> findByFacultyAdvisorId(String facultyAdvisorId); // Corrected method name

    // Find all requests by faculty in charge ID
    List<Request> findByFacultyInChargeId(String facultyInChargeId); // Corrected method name
}