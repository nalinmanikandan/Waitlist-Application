package com.waitlistapplication.waitlist.controller;

import com.waitlistapplication.waitlist.service.WaitListService;
import com.waitlistapplication.waitlist.entity.WaitList;
import com.waitlistapplication.waitlist.repository.WaitListRepository;
import com.waitlistapplication.waitlist.entity.WaitlistResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.waitlistapplication.waitlist.entity.ReferralRequest;
import java.util.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/waitlist")
public class WaitListController {
    @Autowired
    private WaitListService waitListService;

    // Method for user signup to the waitlist
    @PostMapping("/signup")
    public ResponseEntity<WaitList> signup(@RequestBody String email){
        // Call service to sign up user and return the created user
        WaitList newUser = waitListService.signUpToWaitList(email);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    // Method to get the entire waitlist
    @GetMapping("/list")
    public ResponseEntity<List<WaitList>> getWaitList(){
        // Call service to retrieve the waitlist and return it
        List<WaitList> waitList = waitListService.getWaitList();
        return new ResponseEntity<>(waitList, HttpStatus.OK);
    }

    // Method to process referral requests
    @PostMapping("/referral")
    public ResponseEntity<Void> processReferral(@RequestBody ReferralRequest referralRequest) {
        // Call service to process referral and update positions
        waitListService.processReferral(referralRequest.getEmail(), referralRequest.getReferralEmail());
        System.out.println(referralRequest.getEmail()+"    "+referralRequest.getReferralEmail());
        // Update positions for referred email
        waitListService.updatePositionAfterReferral(referralRequest.getReferralEmail());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // Method to edit a waitlist entry
    @PutMapping("/edit/{id}")
    public ResponseEntity<WaitList> editWaitlist(@PathVariable Long id, @RequestBody WaitList updatedWaitList) {
        // Check if the waitlist entry exists
        Optional<WaitList> existingWaitList = waitListService.getWaitlistById(id);

        if (existingWaitList.isPresent()) {
            // If exists, call service to edit and return the updated entry
            WaitList editedWaitList = waitListService.editWaitlist(id, updatedWaitList);
            return ResponseEntity.ok(editedWaitList);
        } else {
            // If not exists, return not found
            return ResponseEntity.notFound().build();
        }
    }

    // Method to delete a waitlist entry
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteWaitlist(@PathVariable Long id) {
        // Check if the waitlist entry exists
        if (waitListService.existsById(id)) {
            // If exists, call service to delete
            waitListService.deleteWaitlist(id);
            return ResponseEntity.ok().build();
        } else {
            // If not exists, return not found
            return ResponseEntity.notFound().build();
        }
    }

    // Method to get waitlist entry by email
    @GetMapping("/{email}")
    public ResponseEntity<WaitlistResponse> getWaitlistByEmail(@PathVariable String email) {
        // Call service to find the waitlist entry by email
        WaitList waitlist = waitListService.findByEmail(email);

        if (waitlist != null) {
            // If found, convert to response DTO and return
            WaitlistResponse waitlistResponse = convertToWaitlistResponse(waitlist);
            return new ResponseEntity<>(waitlistResponse, HttpStatus.OK);
        } else {
            // If not found, return not found
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Helper method to convert WaitList entity to WaitlistResponse DTO
    private WaitlistResponse convertToWaitlistResponse(WaitList waitlist) {
        return new WaitlistResponse(waitlist.getEmail(), waitlist.getPosition(), waitlist.getReferralLink());
    }
}
