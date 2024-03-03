// ReferralSignupPage.jsx

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReferralSignupPage = () => {
    // Get email from URL parameter using useParams
    const { email } = useParams();
    // State for the user's email
    const [userEmail, setUserEmail] = useState('');
    // State for the referred email obtained from URL parameter
    const [referredEmail] = useState(email);
    // Get the navigate function from react-router-dom
    const navigate = useNavigate();

    // Log the email obtained from the URL parameter
    console.log('Email from URL parameter:', email);

    // Function to handle sign up by referral
    const signUpByReferral = async () => {
        try {
            // Send a POST request to the server with user and referral email
            const response = await axios.post(
                'http://localhost:8081/api/waitlist/referral',
                {
                    email: userEmail,
                    referralEmail: referredEmail,
                }
            );
            // Log the response from the server
            console.log('Signup Response:', response.data);

            // Use navigate to redirect to another page (signup page in this case)
            navigate('/signup');
        } catch (error) {
            // Log and handle error or display an error message to the user
            console.error('Error signing up by referral:', error);
        }
    };

    return (
        <div className="centered-form">
            <div className="form-container">
                <h2>Sign Up by Referral</h2>
                {/* Input for user's email */}
                <label>Your Email:</label>
                <input type="text" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                {/* Input for referred email (read-only) */}
                <label>Referred Email:</label>
                <input type="text" value={referredEmail} readOnly />
                {/* Button to trigger sign up by referral */}
                <button onClick={signUpByReferral}>Join Waitlist</button>
            </div>
        </div>
    );
};

export default ReferralSignupPage;
