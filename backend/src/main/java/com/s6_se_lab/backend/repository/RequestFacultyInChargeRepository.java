package com.s6_se_lab.backend.repository;

import com.s6_se_lab.backend.model.RequestFacultyInCharge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RequestFacultyInChargeRepository extends JpaRepository<RequestFacultyInCharge, com.s6_se_lab.backend.model.RequestFacultyId> {

    // Find by both requestId and facultyId without needing RequestFacultyId
    Optional<RequestFacultyInCharge> findByRequest_RequestIdAndFaculty_FacultyId(Long requestId, String facultyId);

    long countByRequest_RequestId(Long requestId);

long countByRequest_RequestIdAndStatus(Long requestId, RequestFacultyInCharge.Status status);

List<RequestFacultyInCharge> findByRequest_RequestId(Long requestId);

}
