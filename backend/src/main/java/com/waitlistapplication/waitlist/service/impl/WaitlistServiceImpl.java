package com.waitlistapplication.waitlist.service.impl;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Sort;
import com.waitlistapplication.waitlist.entity.WaitList;
import com.waitlistapplication.waitlist.repository.WaitListRepository;
import com.waitlistapplication.waitlist.service.WaitListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.waitlistapplication.waitlist.exception.EntityNotFoundException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import java.util.List;
import java.util.Optional;
import java.util.Properties;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Service
public class WaitlistServiceImpl implements WaitListService {

    @Autowired
    private WaitListRepository waitListRepository;
    @Autowired
    private JavaMailSender javaMailSender;

    // Method to sign up a user to the waitlist
    @Override
    public WaitList signUpToWaitList(String email) {
        // Check if the user already exists
        Optional<WaitList> existingUser = waitListRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            return existingUser.get(); // Return the existing user
        }

        // Create a new user and save it to the waitlist
        WaitList newUser = new WaitList();
        newUser.setEmail(email);
        newUser.setPosition(getNextPosition());
        String referralLink = generateReferralLink(newUser.getEmail());
        newUser.setReferralLink(referralLink);

        return waitListRepository.save(newUser);
    }

    // Method to retrieve the entire waitlist
    @Override
    public List<WaitList> getWaitList() {
        return waitListRepository.findAll();
    }

    // Method to process a referral
    @Override
    public void processReferral(String email, String referralEmail) {
        String referralLink = generateReferralLink(email);

        // Check if the referrer email exists in the database
        Optional<WaitList> referrerOptional = waitListRepository.findByEmail(referralEmail);

        // Create a new user entry for the referred email
        WaitList referredUser = new WaitList();
        referredUser.setEmail(email);
        referredUser.setReferralLink(referralLink);
        referredUser.setPosition(getNextPosition());
        waitListRepository.save(referredUser);
        sortWaitlistByPosition();
    }

    // Method to send an email to the top customer
    @Override
    public void sendEmailToTopCustomer() {
        // Implementation may vary
    }

    // Helper method to sort the waitlist by position
    private void sortWaitlistByPosition() {
        List<WaitList> sortedWaitlist = waitListRepository.findAll(Sort.by(Sort.Order.asc("position")));

        // Iterate through the sorted waitlist and send an email to the top customer
        for (int i = 0; i < sortedWaitlist.size(); i++) {
            WaitList waitList = sortedWaitlist.get(i);

            if (waitList.getPosition() == 1) {
                sendEmailToCustomer(waitList.getEmail());
            }
        }
    }

    // Method to send an email to a customer
    private void sendEmailToCustomer(String email) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(email);
        mailMessage.setSubject("Congratulations! You're at position 1 in the waitlist");
        mailMessage.setText("Dear customer, congratulations! You've reached position 1 in our waitlist. Thank you for your interest.");

        javaMailSender.send(mailMessage);
    }

    // Helper method to get the next position
    private int getNextPosition() {
        return (int) waitListRepository.count() + 100;
    }

    // Helper method to generate a referral link
    private String generateReferralLink(String email) {
        return "http://localhost:5173/referral/" + email;
    }

    // Method to edit a waitlist entry by ID
    @Override
    public WaitList editWaitlist(Long id, WaitList updatedWaitList) {
        Optional<WaitList> existingWaitList = waitListRepository.findById(id);

        if (existingWaitList.isPresent()) {
            WaitList waitList = existingWaitList.get();
            waitList.setEmail(updatedWaitList.getEmail());
            // Update other fields as needed
            return waitListRepository.save(waitList);
        } else {
            return null; // Entry not found
        }
    }

    // Method to delete a waitlist entry by ID
    @Override
    public int deleteWaitlist(Long id) {
        Optional<WaitList> waitListOptional = waitListRepository.findById(id);

        if (waitListOptional.isPresent()) {
            int deletedPosition = waitListOptional.get().getPosition();
            waitListRepository.deleteById(id);
            updatePositionsAfterDeletion(deletedPosition);
            return deletedPosition;
        } else {
            return 0; // Entry not found
        }
    }

    // Method to get a waitlist entry by ID
    @Override
    public Optional<WaitList> getWaitlistById(Long id) {
        return waitListRepository.findById(id);
    }

    // Method to check if a waitlist entry with a given ID exists
    @Override
    public boolean existsById(Long id) {
        return waitListRepository.existsById(id);
    }

    // Helper method to update positions after deletion
    private void updatePositionsAfterDeletion(int deletedPosition) {
        List<WaitList> subsequentWaitList = waitListRepository.findByPositionGreaterThan(deletedPosition);

        for (WaitList waitList : subsequentWaitList) {
            waitList.setPosition(waitList.getPosition() - 1);
            waitListRepository.save(waitList);
        }
    }

    // Method to update position after a referral
    @Override
    public void updatePositionAfterReferral(String referredEmail) {
        Optional<WaitList> referredUser = waitListRepository.findByEmail(referredEmail);

        if (referredUser.isPresent()) {
            WaitList user = referredUser.get();
            user.setPosition(user.getPosition() - 1);
            waitListRepository.save(user);
        }
    }

    // Method to find a waitlist entry by email
    @Override
    public WaitList findByEmail(String email) {
        return waitListRepository.findByEmail(email).orElse(null);
    }
}
