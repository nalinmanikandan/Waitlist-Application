package com.waitlistapplication.waitlist.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "waitlist")
public class WaitList {

	// Unique identifier for the waitlist entry
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	// Email associated with the waitlist entry (not null and unique)
	@Column(name = "email_id", nullable = false, unique = true)
	private String email;

	// Position of the user in the waitlist (not null)
	@Column(name = "position", nullable = false)
	private int position;

	// Referral link associated with the user (not null)
	@Column(name = "referral_link", nullable = false)
	private String referralLink;
}
