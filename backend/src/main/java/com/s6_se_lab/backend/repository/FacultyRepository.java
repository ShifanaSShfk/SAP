package com.s6_se_lab.backend.repository;

import com.s6_se_lab.backend.model.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacultyRepository extends JpaRepository<Faculty, String> {
}
