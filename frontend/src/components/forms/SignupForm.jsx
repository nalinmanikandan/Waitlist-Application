// SignupForm.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../assets/styles/SignupForm.css';
const SignupForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [position, setPosition] = useState(0);
    const [referral, setReferral] = useState('');

    const signUp = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8081/api/waitlist/signup',
                email,
                {
                    headers: {
                        'Content-Type': 'text/plain',
                    },
                }
            );

            console.log('Signup Response:', response.data);
            console.log(email);
            setPosition(response.data.position);

            if (response.data.referralLink) {
                const encodedReferral = encodeURI(response.data.referralLink);
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
                console.error('Referral link is missing in the response.');
            }
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <div className="centered-form">
            <div className="form-container">
                <h2>Sign Up</h2>
                <label>Email:</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button onClick={signUp}>Join Waitlist</button>
                {position > 0 && <p className="result">Your position: {position}</p>}
                {referral && (
                    <p className="result">
                        Your Referral Link:{' '}
                        <a href={referral} target="_blank" rel="noopener noreferrer">
                            {referral}
                        </a>
                    </p>
                )}
                {/* Add a button for admin login */}
                <Link to="/admin-login">
                    <button className="admin-login-button">Admin Login</button>
                </Link>
            </div>
        </div>
    );
};

export default SignupForm;
