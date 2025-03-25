package com.s6_se_lab.backend.repository;

import com.s6_se_lab.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    User findByIdAndPassword(String id, String password);
}