package com.s6_se_lab.backend.dto;

import java.util.List;

public class FacultyIdsRequest {
    private List<String> facultyIds;

    public List<String> getFacultyIds() {
        return facultyIds;
    }

    public void setFacultyIds(List<String> facultyIds) {
        this.facultyIds = facultyIds;
    }
}
