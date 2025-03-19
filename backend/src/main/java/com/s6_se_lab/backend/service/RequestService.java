package com.s6_se_lab.backend.service;

import com.s6_se_lab.backend.model.Request;
import com.s6_se_lab.backend.repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RequestService {
    @Autowired
    private RequestRepository requestRepository;

    public Request saveRequest(Request request) {
        return requestRepository.save(request);
    }
}
