import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'; // Import PropTypes

const ReferralLinkDisplay = ({ userId }) => {
    const [referralLink, setReferralLink] = useState('');

    const generateReferralLink = async () => {
        try {
            const response = await axios.post(`http://localhost:8081/api/waitlist/referral/${userId}`);
            setReferralLink(response.data.referralLink);
        } catch (error) {
            console.error('Error generating referral link:', error);
        }
    };

    return (
        <div>
            <button onClick={generateReferralLink}>Generate Referral Link</button>
            {referralLink && <p>Your Referral Link: {referralLink}</p>}
        </div>
    );
};

// Add PropTypes validation
ReferralLinkDisplay.propTypes = {
    userId: PropTypes.number.isRequired, // Adjust the type as needed
};

export default ReferralLinkDisplay;
