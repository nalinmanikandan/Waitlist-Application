import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes
import SignupForm from './components/forms/SignupForm';
import WaitlistPage from './components/pages/WaitlistPage'; 
import CurrentUserPage from './components/user/CurrentUserPage';
import ReferralSignupPage from './components/forms/ReferralSignupPage'
import './assets/styles/App.css'
import AdminLoginPage from './components/admin/AdminLoginPage';
import ReferredCurrentUserPage from './components/user/ReferredCurrentUserPage';

const App = () => {
    return (
        <Router>
            <div className='div'>
                <h1 className='h1'>iPhone Waiting List</h1>
                <div>
                <Routes>
                <Route path="/" element={<SignupForm />} />
                    <Route path="/signup" element={<SignupForm />} />
                    <Route path="/waitlist" element={<WaitlistPage />} />
                    <Route path="/current-user" element={<CurrentUserPage />} />
                    <Route path="/referral/:email" element={<ReferralSignupPage />} />
                    <Route path="/admin-login" element={<AdminLoginPage />} />
                    <Route path="/referred-current-user" element={<ReferredCurrentUserPage />} />
                </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
