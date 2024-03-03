package com.waitlistapplication.waitlist.mapper;

import com.waitlistapplication.waitlist.entity.WaitList;
import com.waitlistapplication.waitlist.dto.WaitlistDto;

public class WaitListMapper {

	// Method to map a WaitList entity to a WaitlistDto
	public static WaitlistDto mapToWaitlistDto(WaitList waitlist) {
		return new WaitlistDto(
				waitlist.getId(),
				waitlist.getEmail(),
				waitlist.getPosition(),
				waitlist.getReferralLink()
		);
	}

	// Method to map a WaitlistDto to a WaitList entity
	public static WaitList mapToWaitlist(WaitlistDto waitlistDto) {
		return new WaitList(
				waitlistDto.getId(),
				waitlistDto.getEmail(),
				waitlistDto.getPosition(),
				waitlistDto.getReferralLink()
		);
	}
}
