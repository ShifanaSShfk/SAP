package com.s6_se_lab.backend.service;

import com.s6_se_lab.backend.model.Student;
import com.s6_se_lab.backend.model.User;
import com.s6_se_lab.backend.model.Faculty;
import com.s6_se_lab.backend.repository.FacultyRepository;
import com.s6_se_lab.backend.repository.UserRepository;
import com.s6_se_lab.backend.repository.StudentRepository;

import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.InputStream;

@Service
@RequiredArgsConstructor
public class ExcelImportService {

    private final StudentRepository studentRepository;
    private final FacultyRepository facultyRepository;
    private final UserRepository userRepository;

    private String getCellAsString(Cell cell) {
        if (cell == null) return "";
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue().trim();
            case NUMERIC:
                return String.valueOf((long) cell.getNumericCellValue()); // to avoid decimal points for IDs/contact
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            case FORMULA:
                return cell.getCellFormula();
            case BLANK:
                return "";
            default:
                return "";
        }
    }

    public void importExcelData(MultipartFile file) {
        try (InputStream inputStream = file.getInputStream(); Workbook workbook = new XSSFWorkbook(inputStream)) {
            Sheet sheet = workbook.getSheetAt(0);

            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row == null || row.getCell(0) == null) continue;

                String role = row.getCell(0).getStringCellValue().trim().toLowerCase(); // "student" or "faculty"

                if (role.equals("student")) {
                    Student student = new Student();
                    student.setStudentId(row.getCell(1).getStringCellValue());
                    student.setStudentName(row.getCell(2).getStringCellValue());
                    student.setTotalPoints((int) row.getCell(3).getNumericCellValue());
                    student.setDepartmentPoints((int) row.getCell(4).getNumericCellValue());
                    student.setInstitutionalPoints((int) row.getCell(5).getNumericCellValue());
                    student.setFacultyAdvisorId(row.getCell(6).getStringCellValue());
                    student.setDepartment(row.getCell(7).getStringCellValue());
                    student.setSection(row.getCell(8).getStringCellValue());
                    student.setContactNumber(getCellAsString(row.getCell(9)));

                    userRepository.save(new User(
                        student.getStudentId(),
                        row.getCell(10).getStringCellValue(), // email
                        row.getCell(11).getStringCellValue(), // password
                        "student"
                    ));

                    studentRepository.save(student);

                    
                } else if (role.equals("faculty")) {
                    Faculty faculty = new Faculty();
                    faculty.setFacultyId(row.getCell(1).getStringCellValue());
                    faculty.setFacultyName(row.getCell(2).getStringCellValue());
                    faculty.setIsFacultyAdvisor(row.getCell(3).getBooleanCellValue());
                    faculty.setDepartment(row.getCell(4).getStringCellValue());
                    faculty.setDesignation(row.getCell(5).getStringCellValue());
                    faculty.setFacultyRoom(row.getCell(6).getStringCellValue());

                    userRepository.save(new User(
                        faculty.getFacultyId(),
                        row.getCell(7).getStringCellValue(), // email
                        row.getCell(8).getStringCellValue(), // password
                        "faculty"
                    ));

                    facultyRepository.save(faculty);

                }
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse and import Excel file: " + e.getMessage(), e);
        }
    }
}
