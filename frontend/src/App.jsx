// Import necessary components and features from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes

// Import your custom components and styles
import SignupForm from './components/forms/SignupForm';
import WaitlistPage from './components/pages/WaitlistPage';
import CurrentUserPage from './components/user/CurrentUserPage';
import ReferralSignupPage from './components/forms/ReferralSignupPage';
import './assets/styles/App.css'; // Import the main App styles
import AdminLoginPage from './components/admin/AdminLoginPage';
import ReferredCurrentUserPage from './components/user/ReferredCurrentUserPage';

// Functional component for the main App
const App = () => {
    return (
        <Router>
            {/* Main container div for the App */}
            <div className='div'>
                {/* Main heading of the App */}
                <h1 className='h1'>iPhone Waiting List</h1>
                <div>
                    {/* Use the Routes component for defining routes and their corresponding components */}
                    <Routes>
                        {/* Route for the home page and signup form */}
                        <Route path="/" element={<SignupForm />} />
                        {/* Route for the signup form */}
                        <Route path="/signup" element={<SignupForm />} />
                        {/* Route for the waitlist page */}
                        <Route path="/waitlist" element={<WaitlistPage />} />
                        {/* Route for the current user page */}
                        <Route path="/current-user" element={<CurrentUserPage />} />
                        {/* Route for the referral signup page with dynamic email parameter */}
                        <Route path="/referral/:email" element={<ReferralSignupPage />} />
                        {/* Route for the admin login page */}
                        <Route path="/admin-login" element={<AdminLoginPage />} />
                        {/* Route for the referred current user page */}
                        <Route path="/referred-current-user" element={<ReferredCurrentUserPage />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

// Export the component as the default export
export default App;
