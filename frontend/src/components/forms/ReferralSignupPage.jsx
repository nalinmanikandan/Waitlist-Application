// ReferralSignupPage.jsx

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReferralSignupPage = () => {
    const { email } = useParams();
    const [userEmail, setUserEmail] = useState('');
    const [referredEmail] = useState(email);
    const navigate = useNavigate();

    console.log('Email from URL parameter:', email);

    const signUpByReferral = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8081/api/waitlist/referral',
                {
                    email: userEmail,
                    referralEmail: referredEmail,
                }
            );
            console.log('Signup Response:', response.data);

            // Use navigate to redirect to another page
            navigate('/signup');
        } catch (error) {
            console.error('Error signing up by referral:', error);
            // Handle error or display an error message to the user
        }
    };

    return (
        <div className="centered-form">
            <div className="form-container">
                <h2>Sign Up by Referral</h2>
                <label>Your Email:</label>
                <input type="text" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                <label>Referred Email:</label>
                <input type="text" value={referredEmail} readOnly />
                <button onClick={signUpByReferral}>Join Waitlist</button>
            </div>
        </div>
    );
};

export default ReferralSignupPage;
