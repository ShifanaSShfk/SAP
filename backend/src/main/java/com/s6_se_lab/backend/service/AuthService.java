package com.s6_se_lab.backend.service;

import com.s6_se_lab.backend.model.User;
import com.s6_se_lab.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    public Optional<User> authenticate(String id, String password) {
        return Optional.ofNullable(userRepository.findByIdAndPassword(id, password));
    }
    public Optional<User> getUserById(String userId) {
        return userRepository.findById(userId);
    }
}