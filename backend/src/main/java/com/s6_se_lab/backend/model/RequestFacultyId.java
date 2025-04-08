package com.s6_se_lab.backend.model;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class RequestFacultyId implements Serializable {
    private Long requestId;
    private String facultyId;

    public RequestFacultyId() {}

    public RequestFacultyId(Long requestId, String facultyId) {
        this.requestId = requestId;
        this.facultyId = facultyId;
    }

    public Long getRequestId() {
        return requestId;
    }

    public void setRequestId(Long requestId) {
        this.requestId = requestId;
    }

    public String getFacultyId() {
        return facultyId;
    }

    public void setFacultyId(String facultyId) {
        this.facultyId = facultyId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RequestFacultyId)) return false;
        RequestFacultyId that = (RequestFacultyId) o;
        return Objects.equals(requestId, that.requestId) &&
               Objects.equals(facultyId, that.facultyId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(requestId, facultyId);
    }
}
