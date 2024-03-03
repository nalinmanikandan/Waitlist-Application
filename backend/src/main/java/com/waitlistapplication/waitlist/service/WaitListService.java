package com.waitlistapplication.waitlist.service;

import com.waitlistapplication.waitlist.entity.WaitList;
import com.waitlistapplication.waitlist.dto.WaitlistDto;
import com.waitlistapplication.waitlist.repository.WaitListRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Service
public interface WaitListService {

    // Method to sign up a user to the waitlist
    WaitList signUpToWaitList(String email);

    // Method to retrieve the entire waitlist
    List<WaitList> getWaitList();

    // Method to process a referral
    void processReferral(String email, String referralEmail);

    // Method to send an email to the top customer (implementation may vary)
    void sendEmailToTopCustomer();

    // Method to delete a waitlist entry by ID
    int deleteWaitlist(Long id);

    // Method to edit a waitlist entry by ID
    WaitList editWaitlist(Long id, WaitList updatedWaitList);

    // Method to get a waitlist entry by ID
    Optional<WaitList> getWaitlistById(Long id);

    // Method to check if a waitlist entry with a given ID exists
    boolean existsById(Long id);

    // Method to update positions in the waitlist after a referral
    void updatePositionAfterReferral(String referredEmail);

    // Method to find a waitlist entry by email
    WaitList findByEmail(String email);
}
