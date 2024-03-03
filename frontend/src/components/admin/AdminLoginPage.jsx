// AdminLoginPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Check if the entered email and password match the criteria
        if (email === 'mnalin02@gmail.com' && password === 'mani@9107') {
            // If matched, navigate to the WaitlistPage
            navigate('/waitlist');
        } else {
            // If not matched, you can display an error message or handle it as needed
            console.error('Invalid email or password');
        }
    };

    return (
        <div className="centered-form">
            <div className="form-container">
                <h2>Admin Login</h2>
                {/* Email input */}
                <label>Email:</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                {/* Password input */}
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {/* Login button */}
                <button onClick={handleLogin}>Login</button>
                <p>
                    {/* Link to signup page */}
                    Dont have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default AdminLoginPage;
