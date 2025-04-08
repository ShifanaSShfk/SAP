package com.s6_se_lab.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpStatus;
import com.s6_se_lab.backend.service.ExcelImportService;

@RestController
@RequestMapping("/api/admin")
public class AdminExcelUploadController {

    private final ExcelImportService excelImportService;

    public AdminExcelUploadController(ExcelImportService excelImportService) {
        this.excelImportService = excelImportService;
    }

    @PostMapping("/upload-excel")
    public ResponseEntity<String> uploadExcel(@RequestParam("file") MultipartFile file) {
        try {
            excelImportService.importExcelData(file);
            return ResponseEntity.ok("Excel data imported successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Failed to import data: " + e.getMessage());
        }
    }

    @GetMapping("/test-import")
    public String testImport() {
        return "Service should be initialized!";
    }
}

