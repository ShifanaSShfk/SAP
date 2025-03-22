package com.s6_se_lab.backend.service;

import com.s6_se_lab.backend.model.Student;
import com.s6_se_lab.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Optional<Student> getStudentById(String studentId) {
        return studentRepository.findById(studentId);
    }

    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }

    public Student updateStudent(String studentId, Student studentDetails) {
        Student student = studentRepository.findById(studentId).orElseThrow(() -> new RuntimeException("Student not found"));
        student.setStudentName(studentDetails.getStudentName());
        student.setTotalPoints(studentDetails.getTotalPoints());
        student.setDepartmentPoints(studentDetails.getDepartmentPoints());
        student.setInstitutionalPoints(studentDetails.getInstitutionalPoints());
        student.setFacultyAdvisorId(studentDetails.getFacultyAdvisorId());
        return studentRepository.save(student);
    }

    public void deleteStudent(String studentId) {
        studentRepository.deleteById(studentId);
    }
}