import { useLocation } from 'react-router-dom';

const CurrentUserPage = () => {
  const { state } = useLocation();

  // Check if location is defined before destructuring its properties
  if (!state) {
    // Handle the case when location is undefined
    return <div>No user information available.</div>;
  }

  const { email, position, referralLink } = state;

  return (
    <div>
      <h2>Your Information</h2>
      <p>Email: {email}</p>
      <p>Position: {position}</p>
      {referralLink && (
        <p>
          Referral Link:{' '}
          <a href={referralLink} target="_blank" rel="noopener noreferrer">
            {referralLink}
          </a>
        </p>
      )}
    </div>
  );
};

export default CurrentUserPage;
