package com.s6_se_lab.backend.repository;

import com.s6_se_lab.backend.model.RequestFile;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestFileRepository extends JpaRepository<RequestFile, Long> {
    // This method retrieves all files for a given request ID uploaded by the student
    List<RequestFile> findByRequest_RequestIdAndUploadedBy(Long requestId, RequestFile.UploadedBy uploadedBy);

    List<RequestFile> findByRequest_RequestId(Long requestId);

}
