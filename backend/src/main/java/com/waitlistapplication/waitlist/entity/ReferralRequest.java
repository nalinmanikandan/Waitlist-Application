package com.waitlistapplication.waitlist.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReferralRequest {

    // Email of the user making the referral
    private String email;

    // Email of the user being referred
    private String referralEmail;
}
