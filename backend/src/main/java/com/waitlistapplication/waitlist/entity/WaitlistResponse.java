package com.waitlistapplication.waitlist.entity;

public class WaitlistResponse {

    // Email associated with the waitlist response
    private String email;

    // Position of the user in the waitlist
    private int position;

    // Referral link associated with the user
    private String referralLink;

    // Constructor to initialize the WaitlistResponse object with provided values
    public WaitlistResponse(String email, int position, String referralLink) {
        this.email = email;
        this.position = position;
        this.referralLink = referralLink;
    }
}
