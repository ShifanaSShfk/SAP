package com.s6_se_lab.backend.controller;

import com.s6_se_lab.backend.model.Student;
import com.s6_se_lab.backend.model.User;
import com.s6_se_lab.backend.repository.StudentRepository;
import com.s6_se_lab.backend.service.StudentService;
import com.s6_se_lab.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private AuthService userService; // Inject UserService

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{studentId}")
    public ResponseEntity<?> getStudentById(@PathVariable String studentId) {
    Optional<Student> studentOpt = studentService.getStudentById(studentId);

    if (!studentOpt.isPresent()) {
        return ResponseEntity.notFound().build();
    }

    Student student = studentOpt.get();
    Optional<User> userOpt = userService.getUserById(studentId);

    Map<String, Object> response = new HashMap<>();
    response.put("studentName", student.getStudentName());
    response.put("studentId", student.getStudentId());
    response.put("department", student.getDepartment());
    response.put("section", student.getSection());
    response.put("contactNumber", student.getContactNumber());
    response.put("facultyAdvisorId", student.getFacultyAdvisorId());
    response.put("institutionalPoints", student.getInstitutionalPoints());
    response.put("departmentPoints", student.getDepartmentPoints());
    response.put("totalPoints", student.getTotalPoints());
    response.put("email", userOpt.map(User::getEmail).orElse(null));

    return ResponseEntity.ok(response);
}


    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentService.createStudent(student);
    }

    @PutMapping("/{studentId}")
    public ResponseEntity<Student> updateStudent(@PathVariable String studentId, @RequestBody Student studentDetails) {
        return ResponseEntity.ok(studentService.updateStudent(studentId, studentDetails));
    }

    @DeleteMapping("/{studentId}")
    public ResponseEntity<Void> deleteStudent(@PathVariable String studentId) {
        studentService.deleteStudent(studentId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/by-fa/{facultyAdvisorId}")
    public List<Student> getStudentsByFacultyAdvisor(@PathVariable String facultyAdvisorId) {
        return studentRepository.findByFacultyAdvisorId(facultyAdvisorId);
    }

    @GetMapping("/top")
    public List<Student> getTopStudents() {
        return studentService.getTopStudentsByTotalPoints();
}
}
