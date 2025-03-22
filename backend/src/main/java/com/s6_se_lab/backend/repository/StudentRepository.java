package com.s6_se_lab.backend.repository;

import com.s6_se_lab.backend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, String> {
}