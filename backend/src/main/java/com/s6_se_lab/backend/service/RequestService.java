package com.s6_se_lab.backend.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.s6_se_lab.backend.model.Event;
import com.s6_se_lab.backend.model.Faculty;
import com.s6_se_lab.backend.model.Request;
import com.s6_se_lab.backend.model.RequestFacultyInCharge;
import com.s6_se_lab.backend.model.Student;
import com.s6_se_lab.backend.model.RequestFile;
import com.s6_se_lab.backend.repository.EventRepository;
import com.s6_se_lab.backend.repository.FacultyRepository;
import com.s6_se_lab.backend.repository.RequestRepository;
import com.s6_se_lab.backend.repository.RequestFacultyInChargeRepository;
import com.s6_se_lab.backend.repository.StudentRepository;
import com.s6_se_lab.backend.repository.RequestFileRepository;

@Service
public class RequestService {

    private static final Logger logger = Logger.getLogger(RequestService.class.getName());
    private static final String UPLOAD_DIR = "uploads/";

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private RequestFileRepository requestFileRepository;

    @Autowired
    private RequestFacultyInChargeRepository requestFacultyInChargeRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private FacultyRepository facultyRepository;
    

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
        request.setStatus(Request.Status.Pending);
    
        // Check nulls
        if (event.getFaculties() != null) {
            request.getFacultyInCharge().addAll(event.getFaculties());
        }
    
        // ✅ Save request first
        Request savedRequest = requestRepository.save(request);
    
        RequestFile requestFile = new RequestFile();
requestFile.setRequest(savedRequest); // link to saved Request
requestFile.setUploadedAt(LocalDateTime.now());
requestFile.setFileName(saveFile(proofFile));
requestFile.setUploadedBy(RequestFile.UploadedBy.STUDENT);
; // ✅ just a String
    
        requestFileRepository.save(requestFile);
    
        return savedRequest;
    }
    
    

    public Request createCustomRequest(String name, String rollNumber, String eventName, String eventType,
                                   LocalDate eventDate, LocalTime eventTime, String location, int activityPoints,
                                   List<String> facultyInChargeIds, MultipartFile proofFile) throws IOException {
    Optional<Student> studentOptional = studentRepository.findById(rollNumber);

    if (studentOptional.isEmpty()) {
        throw new IllegalArgumentException("Invalid Student ID");
    }

    Student student = studentOptional.get();

    Request request = new Request();
    request.setStudent(student);
    request.setEvent(null);
    request.setEventName(eventName);
    request.setEventType(eventType);
    request.setEventDate(eventDate);
    request.setEventTime(eventTime);
    request.setLocation(location);
    request.setActivityPoints(activityPoints);
    request.setCreatedAt(LocalDateTime.now());
    request.setStatus(Request.Status.Pending);
    request.setFAStatus(Request.Status.Pending);

    // Add faculty in charge
    Set<Faculty> inChargeFaculties = facultyInChargeIds.stream()
            .map(id -> facultyRepository.findById(id))
            .filter(Optional::isPresent)
            .map(Optional::get)
            .collect(Collectors.toSet());
    request.getFacultyInCharge().addAll(inChargeFaculties);

    // Save the request first so it gets an ID
    request = requestRepository.save(request);

    // Create and save RequestFile
    RequestFile requestFile = new RequestFile();
    requestFile.setRequest(request);
    requestFile.setUploadedAt(LocalDateTime.now());
    requestFile.setUploadedBy(RequestFile.UploadedBy.STUDENT);
    requestFile.setFileName(saveFile(proofFile));

    requestFileRepository.save(requestFile);

    return request;
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
        return fileName;
    }

     public void saveRequestFile(Long requestId, MultipartFile file, String facultyId) throws IOException {
        Request request = requestRepository.findById(requestId)
            .orElseThrow(() -> new RuntimeException("Request not found"));

        if (file.isEmpty()) {
            throw new RuntimeException("File is empty");
        }

        // Save the file physically
        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs(); // Create uploads/ if not exists
        }

        String fileName = file.getOriginalFilename();
        Path filePath = Paths.get(UPLOAD_DIR, fileName);
        Files.write(filePath, file.getBytes());

        // Save record to RequestFile table
        RequestFile requestFile = new RequestFile();
        requestFile.setRequest(request);
        requestFile.setFileName(fileName);

        if (facultyId != null && !facultyId.isEmpty()) {
            Faculty faculty = facultyRepository.findById(facultyId)
                .orElseThrow(() -> new RuntimeException("Faculty not found"));
            requestFile.setUploadedBy(RequestFile.UploadedBy.FACULTY);
            requestFile.setFaculty(faculty);
        } else {
            requestFile.setUploadedBy(RequestFile.UploadedBy.STUDENT);
        }

        requestFileRepository.save(requestFile);
    }
    
    public Request rejectRequest(Long requestId) {
        Request request = requestRepository.findById(requestId)
            .orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatus(Request.Status.Rejected);
        return requestRepository.save(request);
    }

    public List<Request> getRequestsByFacultyInChargeId(String facultyId) {
        return requestRepository.findByFacultyInChargeId(facultyId);
    }


    public List<Map<String, Object>> getRequestsWithStudentDetailsByFacultyId(String facultyId) {
        List<Request> requests = requestRepository.findByFacultyInChargeFacultyId(facultyId);
        
        return requests.stream().map(request -> {
            Map<String, Object> requestMap = new HashMap<>();
            Student student = request.getStudent();
            
            requestMap.put("request_id", request.getRequestId());
            requestMap.put("event_name", request.getEventName());
    
            // Fetch RFIC details
            Optional<RequestFacultyInCharge> rficOptional =
                requestFacultyInChargeRepository.findByRequest_RequestIdAndFaculty_FacultyId(request.getRequestId(), facultyId);
    
            rficOptional.ifPresentOrElse(rfic -> {
                requestMap.put("status", rfic.getStatus().getDisplayValue());
                requestMap.put("rejection_reason", rfic.getRejectionReason());
            }, () -> {
                requestMap.put("status", "N/A");
                requestMap.put("rejection_reason", null);
            });
    
            if (student != null) {
                requestMap.put("student_id", student.getStudentId());
                requestMap.put("student_name", student.getStudentName());
                requestMap.put("department", student.getDepartment());
                requestMap.put("section", student.getSection());
            }
    
            requestMap.put("event_date", request.getEventDate() != null ? request.getEventDate().toString() : "N/A");
            requestMap.put("event_time", request.getEventTime() != null ? request.getEventTime().toString() : "N/A");
            requestMap.put("location", request.getLocation() != null ? request.getLocation() : "Unknown");
            requestMap.put("activity_points", request.getActivityPoints() != 0 ? request.getActivityPoints() : 0);

    
            // Fetch all proof documents from request_files table
            List<RequestFile> requestFiles = requestFileRepository
            .findByRequest_RequestIdAndUploadedBy(request.getRequestId(), RequestFile.UploadedBy.STUDENT);

            // Map the list of file names to a list of strings
            List<String> proofDocuments = requestFiles.stream()
            .map(RequestFile::getFileName)
            .collect(Collectors.toList());

            requestMap.put("proof_documents", proofDocuments);

    
            return requestMap;
        }).collect(Collectors.toList());
    }
    
    

    public Request rejectRequest(Long requestId, String rejectionReason) {
        Request request = requestRepository.findById(requestId)
            .orElseThrow(() -> new RuntimeException("Request not found with ID: " + requestId));
        
        request.setStatus(Request.Status.Rejected);
        
        // If you want to store the rejection reason, you'll need to add this field to your Request entity
        request.setRejectionReason(rejectionReason);
        
        return requestRepository.save(request);
    }

    public Map<String, Object> getRequestWithDetails(Long requestId, String facultyId) {
        Request request = requestRepository.findById(requestId)
            .orElseThrow(() -> new RuntimeException("Request not found with ID: " + requestId));
    
        Map<String, Object> details = new HashMap<>();
        details.put("request_id", request.getRequestId());
        details.put("event_name", request.getEventName());
    
        Optional<RequestFacultyInCharge> rficOptional =
            requestFacultyInChargeRepository.findByRequest_RequestIdAndFaculty_FacultyId(request.getRequestId(), facultyId);
    
        rficOptional.ifPresentOrElse(rfic -> {
            details.put("status", rfic.getStatus().getDisplayValue());
            details.put("rejection_reason", rfic.getRejectionReason());
        }, () -> {
            details.put("status", "N/A");
            details.put("rejection_reason", null);
        });
    
        Student student = request.getStudent();
        details.put("student_name", student.getStudentName());
        details.put("student_id", student.getStudentId());
        details.put("department", student.getDepartment());
        details.put("section", student.getSection());
        details.put("event_date", request.getEventDate());
        details.put("event_time", request.getEventTime());
        details.put("location", request.getLocation());
        details.put("activity_points", request.getActivityPoints());
    
        // Fetch Faculty Advisor details
        String facultyAdvisorId = student.getFacultyAdvisorId();  // Get the Faculty Advisor ID from the Student table
    
        if (facultyAdvisorId != null) {
            // Fetch Faculty details using FacultyAdvisorId
            Faculty faculty = facultyRepository.findById(facultyAdvisorId)
                .orElseThrow(() -> new RuntimeException("Faculty not found with ID: " + facultyAdvisorId));
    
            details.put("faculty_advisor_name", faculty.getFacultyName());
            details.put("faculty_advisor_id", faculty.getFacultyId());
            details.put("fa_status", request.getFAStatus().getDisplayValue());  // Status from the request table
        }
    
        // Fetch all files associated with the request
        List<RequestFile> requestFiles = requestFileRepository.findByRequest_RequestId(request.getRequestId());
    
        // Separate student uploaded files
        Optional<RequestFile> studentFileOptional = requestFiles.stream()
            .filter(file -> file.getUploadedBy() == RequestFile.UploadedBy.STUDENT)
            .findFirst(); // find any one student file
    
        Map<String, Object> studentFile = null;
        if (studentFileOptional.isPresent()) {
            RequestFile file = studentFileOptional.get();
            studentFile = new HashMap<>();
            studentFile.put("fileName", file.getFileName());
        }
    
        // Separate faculty uploaded files
        List<Map<String, Object>> facultyFiles = requestFiles.stream()
            .filter(file -> file.getUploadedBy() == RequestFile.UploadedBy.FACULTY)
            .map(file -> {
                Map<String, Object> fileMap = new HashMap<>();
                fileMap.put("fileName", file.getFileName());
                return fileMap;
            })
            .collect(Collectors.toList());
    
        // Add to response
        details.put("student_file", studentFile);
        details.put("faculty_files", facultyFiles.isEmpty() ? null : facultyFiles);
    
        // Fetch all faculty-in-charge for this request
        List<RequestFacultyInCharge> facultyInCharges = requestFacultyInChargeRepository.findByRequest_RequestId(request.getRequestId());
    
        List<Map<String, Object>> facultyList = facultyInCharges.stream().map(rfic -> {
            Map<String, Object> map = new HashMap<>();
            map.put("faculty_name", rfic.getFaculty().getFacultyName());  // Assuming Faculty entity has getFacultyName()
            map.put("faculty_id", rfic.getFaculty().getFacultyId());
            map.put("status", rfic.getStatus().getDisplayValue());
            map.put("rejection_reason", rfic.getRejectionReason());
    
            return map;
        }).collect(Collectors.toList());
    
        // Add the Faculty Advisor as the first entry (if it exists)
        if (facultyAdvisorId != null) {
            Map<String, Object> facultyAdvisorEntry = new HashMap<>();
            facultyAdvisorEntry.put("faculty_name", details.get("faculty_advisor_name") + " (FACULTY ADVISOR)");
            facultyAdvisorEntry.put("faculty_id", details.get("faculty_advisor_id"));
            facultyAdvisorEntry.put("status", request.getFAStatus().getDisplayValue());  // FA status
    
            // If status is approved, set rejection reason for the faculty advisor from faculty in charge
            if ("approved".equalsIgnoreCase(request.getStatus().name())) {
                facultyAdvisorEntry.put("rejection_reason", request.getRejectionReason()); 
            } else {
                facultyAdvisorEntry.put("rejection_reason", null);
            }
    
            facultyList.add(0, facultyAdvisorEntry);  // Add Faculty Advisor to the top of the list
        }
    
        details.put("faculty_in_charges", facultyList);
    
        return details;
    }
    
    
    
    
    
    public List<Map<String, Object>> getStudentRequests(String studentId) {
        List<Request> requests = requestRepository.findByStudentStudentIdOrderByCreatedAtDesc(studentId);
        
        return requests.stream().map(request -> {
            Map<String, Object> requestMap = new HashMap<>();
            Student student = request.getStudent();
            requestMap.put("request_id", request.getRequestId());
            requestMap.put("event_name", request.getEventName());
            requestMap.put("status", request.getStatus().toString());
            requestMap.put("event_date", request.getEventDate().toString());
            requestMap.put("activity_points", request.getActivityPoints());
            requestMap.put("rejection_reason", request.getRejectionReason());
            requestMap.put("created_at", request.getCreatedAt().toString());
            requestMap.put("fa_status", request.getFAStatus().toString());
            requestMap.put("student_id", student.getStudentId());
            requestMap.put("student_name", student.getStudentName());
            return requestMap;
        }).collect(Collectors.toList());
    }

    public void updateFAStatusA(Long requestId, Request.Status status) {
        Request request = requestRepository
            .findByRequestId(requestId)
            .orElseThrow(() -> new RuntimeException("Faculty-Request mapping not found"));
    
        request.setFAStatus(status); // update fa_status
    
        if (status == Request.Status.Approved) {
            Student student = request.getStudent();
            int points = request.getActivityPoints();
    
            if ("Departmental".equalsIgnoreCase(request.getEventType())) {
                student.setDepartmentPoints(student.getDepartmentPoints() + points);
            } else if ("Institutional".equalsIgnoreCase(request.getEventType())) {
                student.setInstitutionalPoints(student.getInstitutionalPoints() + points);
            }


    
            // Update total points in both cases
            student.setTotalPoints(student.getTotalPoints() + points);
            studentRepository.save(student);
        }
    
        requestRepository.save(request);

    }
    
    

    public Request updateFAStatusR(Long requestId, Request.Status status, String reason) {
        Request request = requestRepository
            .findByRequestId(requestId)
            .orElseThrow(() -> new RuntimeException("Faculty-Request mapping not found"));
    
        request.setFAStatus(status);         // ✅ Only updating fa_status
        request.setRejectionReason(reason);  // ✅ Store faculty's reason
        return requestRepository.save(request);
    }
    
}