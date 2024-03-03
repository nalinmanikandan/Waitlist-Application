// Import the necessary hook from 'react-router-dom'
import { useLocation } from 'react-router-dom';

// Functional component for the current user page
const CurrentUserPage = () => {
  // Use the useLocation hook to access the location object
  const { state } = useLocation();

  // Check if location state is defined before destructuring its properties
  if (!state) {
    // Handle the case when location state is undefined
    return <div>No user information available.</div>;
  }

  // Destructure the properties from the location state
  const { email, position, referralLink } = state;

  return (
    <div>
      <h2>Your Information</h2>
      <p>Email: {email}</p>
      <p>Position: {position}</p>
      {referralLink && (
        <p>
          Referral Link:{' '}
          {/* Render a hyperlink for the referral link */}
          <a href={referralLink} target="_blank" rel="noopener noreferrer">
            {referralLink}
          </a>
        </p>
      )}
    </div>
  );
};

// Export the component as the default export
export default CurrentUserPage;
