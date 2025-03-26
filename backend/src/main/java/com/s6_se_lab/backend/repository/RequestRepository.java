package com.s6_se_lab.backend.repository;

import com.s6_se_lab.backend.model.Request;
import com.s6_se_lab.backend.model.Request.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {

    List<Request> findByStudentStudentId(String studentId);

    List<Request> findByEventEventId(Long eventId);

    List<Request> findByStatus(Status status);

    @Query("SELECT r FROM Request r JOIN r.facultyAdvisors fa WHERE fa.facultyId = :facultyId")
    List<Request> findByFacultyAdvisorId(String facultyId);

    @Query("SELECT r FROM Request r JOIN r.facultyInCharge fc WHERE fc.facultyId = :facultyId")
    List<Request> findByFacultyInChargeId(String facultyId);
}