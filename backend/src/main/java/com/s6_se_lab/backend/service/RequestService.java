package com.s6_se_lab.backend.service;

import com.s6_se_lab.backend.model.Event;
import com.s6_se_lab.backend.model.Request;
import com.s6_se_lab.backend.model.Student;
import com.s6_se_lab.backend.repository.EventRepository;
import com.s6_se_lab.backend.repository.RequestRepository;
import com.s6_se_lab.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class RequestService {

    private static final Logger logger = Logger.getLogger(RequestService.class.getName());
    private static final String UPLOAD_DIR = "uploads/";

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private StudentRepository studentRepository;

    public Request createEventRequest(String name, String rollNumber, Long eventId, MultipartFile proofFile) throws IOException {
        Optional<Event> eventOptional = eventRepository.findById(eventId);
        Optional<Student> studentOptional = studentRepository.findById(rollNumber);

        if (eventOptional.isEmpty() || studentOptional.isEmpty()) {
            throw new IllegalArgumentException("Invalid Event ID or Student ID");
        }

        Event event = eventOptional.get();
        Student student = studentOptional.get();

        Request request = new Request();
        request.setStudent(student);
        request.setEvent(event);
        request.setEventName(event.getEventName());
        request.setEventType(event.getEventType());
        request.setEventDate(event.getEventStartDate());
        request.setEventTime(event.getEventStartTime());
        request.setLocation(event.getLocation());
        request.setActivityPoints(event.getActivityPoints());
        request.setCreatedAt(LocalDateTime.now());
        request.setStatus(Request.Status.PENDING);
        request.setProofDocument(saveFile(proofFile));

        // Set faculty_advisor_id and faculty_in_charge_id
        // request.setFacultyAdvisorId(student.getFacultyAdvisorId());
        // request.setFacultyInChargeId(event.getFacultyInChargeId());

        return requestRepository.save(request);
    }

    public Request createCustomRequest(String name, String rollNumber, String eventName, String eventType,
                                       LocalDate eventDate, LocalTime eventTime, String location, int activityPoints, String facultyInChargeId, MultipartFile proofFile) throws IOException {
        Optional<Student> studentOptional = studentRepository.findById(rollNumber);

        if (studentOptional.isEmpty()) {
            throw new IllegalArgumentException("Invalid Student ID");
        }

        Student student = studentOptional.get();

        Request request = new Request();
        request.setStudent(student);
        request.setEvent(null); // Set event to null for custom requests
        request.setEventName(eventName);
        request.setEventType(eventType);
        request.setEventDate(eventDate);
        request.setEventTime(eventTime);
        request.setLocation(location);
        request.setActivityPoints(activityPoints);
        request.setCreatedAt(LocalDateTime.now());
        request.setStatus(Request.Status.PENDING);
        request.setProofDocument(saveFile(proofFile));

         // Set faculty_advisor_id from the student
        request.setFacultyAdvisorId(student.getFacultyAdvisorId());

        // Set faculty_in_charge_id provided by the student
        request.setFacultyInChargeId(facultyInChargeId);

        return requestRepository.save(request);
    }

    private String saveFile(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            return null;
        }

        Path uploadPath = Path.of(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        logger.info("File saved at: " + filePath.toString());
        return filePath.toString();
    }
}