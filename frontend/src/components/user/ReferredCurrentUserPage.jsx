import { useLocation } from 'react-router-dom';

const ReferredCurrentUserPage = () => {
    const { state } = useLocation();

    // Check if location is defined before destructuring its properties
    if (!state) {
        // Handle the case when location is undefined
        console.log('No user information available.');
        return <div>No user information available.</div>;
    }

    const { email, position, referralLink } = state;

    console.log('User Information:', state);

    return (
        <div>
            <h2>Referred User Information</h2>
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

export default ReferredCurrentUserPage;
