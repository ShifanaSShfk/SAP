package com.s6_se_lab.backend.repository;

import com.s6_se_lab.backend.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    // Find events associated with a specific faculty member
    @Query("SELECT DISTINCT e FROM Event e JOIN e.faculties f WHERE f.facultyId = :facultyId")
    List<Event> findByFacultyId(@Param("facultyId") String facultyId);

    // Find events by year and month (using start date)
    @Query("SELECT e FROM Event e WHERE YEAR(e.eventStartDate) = :year AND MONTH(e.eventStartDate) = :month")
    List<Event> findByYearAndMonth(@Param("year") int year, @Param("month") int month);

    // Find events for a specific faculty member on a specific date
    @Query("SELECT e FROM Event e JOIN e.faculties f WHERE f.facultyId = :facultyId AND e.eventStartDate = :date")
    List<Event> findByFacultyAndDate(@Param("facultyId") String facultyId, @Param("date") LocalDate date);

    // Find upcoming events (starting from today)
    @Query("SELECT e FROM Event e WHERE e.eventStartDate >= :today ORDER BY e.eventStartDate ASC")
    List<Event> findByEventStartDateGreaterThanEqualOrderByEventStartDateAsc(@Param("today") LocalDate today);

    // Find events within a date range
    @Query("SELECT e FROM Event e WHERE e.eventStartDate BETWEEN :startDate AND :endDate ORDER BY e.eventStartDate ASC")
    List<Event> findEventsBetweenDates(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    // Find events by type
    List<Event> findByEventType(String eventType);

    // Find events by location containing search string (case-insensitive)
    @Query("SELECT e FROM Event e WHERE LOWER(e.location) LIKE LOWER(CONCAT('%', :location, '%'))")
    List<Event> findByLocationContainingIgnoreCase(@Param("location") String location);

    // Find events with activity points greater than or equal to specified value
    List<Event> findByActivityPointsGreaterThanEqual(int points);
    
    @Query("SELECT e FROM Event e WHERE e.eventStartDate = :date")
List<Event> findBySingleDate(@Param("date") LocalDate date);
}