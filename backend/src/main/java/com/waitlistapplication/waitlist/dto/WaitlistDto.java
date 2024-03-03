package com.waitlistapplication.waitlist.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WaitlistDto {

	// Unique identifier for the waitlist entry
	private long id;

	// Email associated with the waitlist entry
	private String email;

	// Position of the user in the waitlist
	private int position;

	// Referral link associated with the user
	private String referralLink;
}
