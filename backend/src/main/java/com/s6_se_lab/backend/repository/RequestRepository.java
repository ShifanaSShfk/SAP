package com.s6_se_lab.backend.repository;

import com.s6_se_lab.backend.model.Request;
import com.s6_se_lab.backend.model.Request.Status;


import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {

    List<Request> findByStudentStudentId(String studentId);

    List<Request> findByEventEventId(Long eventId);

    List<Request> findByStatus(Status status);

    // @Query("SELECT r FROM Request r JOIN r.facultyInCharge fc WHERE fc.facultyId = :facultyId")
    // List<Request> findByFacultyInChargeId(String facultyId);

    @Query("SELECT DISTINCT r FROM Request r JOIN r.facultyInCharge f WHERE f.facultyId = :facultyId")
List<Request> findByFacultyInChargeId(String facultyId);

@Query("SELECT r FROM Request r JOIN r.facultyInCharge f WHERE f.facultyId = :facultyId")
List<Request> findByFacultyInChargeFacultyId(@Param("facultyId") String facultyId);

@Query("SELECT r FROM Request r WHERE r.student.studentId = :studentId ORDER BY r.createdAt DESC")
List<Request> findByStudentIdOrderByCreatedAtDesc(@Param("studentId") String studentId);

@Query("SELECT r FROM Request r WHERE r.student.studentId = :studentId AND r.status = :status ORDER BY r.createdAt DESC")
List<Request> findByStudentIdAndStatusOrderByCreatedAtDesc(
    @Param("studentId") String studentId, 
    @Param("status") Status status);

@Query("SELECT r FROM Request r WHERE r.student.studentId = :studentId ORDER BY r.createdAt DESC")
List<Request> findByStudentStudentIdOrderByCreatedAtDesc(@Param("studentId") String studentId);

Optional<Request> findByRequestId(Long requestId);
}