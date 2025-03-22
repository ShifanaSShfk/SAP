package com.s6_se_lab.backend.repository;

import com.s6_se_lab.backend.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// import java.time.LocalDate;
// import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    // List<Event> findByEventDate(LocalDate event_date);
}