package com.waitlistapplication.waitlist.repository;

import com.waitlistapplication.waitlist.entity.WaitList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WaitListRepository extends JpaRepository<WaitList, Long> {

    // Method to find a waitlist entry by email
    Optional<WaitList> findByEmail(String email);

    // Method to find all waitlist entries with a position greater than a given value
    List<WaitList> findByPositionGreaterThan(int deletedPosition);
}
