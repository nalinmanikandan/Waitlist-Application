// SignupForm.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../assets/styles/SignupForm.css';

const SignupForm = () => {
    // Get the navigate function from react-router-dom
    const navigate = useNavigate();
    // State for user's email
    const [email, setEmail] = useState('');
    // State for user's position
    const [position, setPosition] = useState(0);
    // State for referral link
    const [referral, setReferral] = useState('');

    // Function to handle user sign up
    const signUp = async () => {
        try {
            // Send a POST request to the server for user signup
            const response = await axios.post(
                'http://localhost:8081/api/waitlist/signup',
                email,
                {
                    headers: {
                        'Content-Type': 'text/plain',
                    },
                }
            );

            // Log signup response and user's email
            console.log('Signup Response:', response.data);
            console.log(email);

            // Set user's position based on the response
            setPosition(response.data.position);

            // If there is a referral link in the response
            if (response.data.referralLink) {
                // Encode referral link
                const encodedReferral = encodeURI(response.data.referralLink);
                // Set referral link in state
                setReferral(encodedReferral);

                // Navigate to the CurrentUserPage with user details after setting referral
                navigate('/current-user', {
                    state: {
                        email: email,
                        position: response.data.position,
                        referralLink: encodedReferral,
                    },
                });
            } else {
                // Log an error if referral link is missing in the response
                console.error('Referral link is missing in the response.');
            }
        } catch (error) {
            // Log and handle error in case of signup failure
            console.error('Error signing up:', error);
        }
    };

    return (
        <div className="centered-form">
            <div className="form-container">
                <h2>Sign Up</h2>
                {/* Input for user's email */}
                <label>Email:</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                {/* Button to trigger sign up */}
                <button onClick={signUp}>Join Waitlist</button>
                {/* Display user's position if it is greater than 0 */}
                {position > 0 && <p className="result">Your position: {position}</p>}
                {/* Display referral link if available */}
                {referral && (
                    <p className="result">
                        Your Referral Link:{' '}
                        <a href={referral} target="_blank" rel="noopener noreferrer">
                            {referral}
                        </a>
                    </p>
                )}
                {/* Link to the admin login page */}
                <Link to="/admin-login">
                    <button className="admin-login-button">Admin Login</button>
                </Link>
            </div>
        </div>
    );
};

export default SignupForm;
