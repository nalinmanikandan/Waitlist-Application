// WaitlistPage.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import "./../../assets/styles/WaitlistPage.css";  // Import the CSS file for styling

const WaitlistPage = () => {
    // State to store the waitlist data
    const [waitlist, setWaitlist] = useState([]);

    useEffect(() => {
        // Fetch the waitlist data from the server on component mount
        const fetchWaitlist = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/waitlist/list');
                setWaitlist(response.data);
            } catch (error) {
                console.error('Error fetching waitlist:', error);
            }
        };

        fetchWaitlist();
    }, []);

    // Function to handle editing a waitlist entry
    const handleEdit = async (id) => {
        // Implement edit logic
        console.log('Edit waitlist entry with id:', id);
    };

    // Function to handle deleting a waitlist entry
    const handleDelete = async (id) => {
        try {
            // Send a DELETE request to delete a waitlist entry by id
            await axios.delete(`http://localhost:8081/api/waitlist/delete/${id}`);
            // Refresh the waitlist after deletion
            const response = await axios.get('http://localhost:8081/api/waitlist/list');
            setWaitlist(response.data);
        } catch (error) {
            console.error('Error deleting waitlist entry:', error);
        }
    };

    return (
        <div>
            <h2>Waitlist</h2>
            {/* Table to display waitlist data */}
            <table className="waitlist-table">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Position</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Map through waitlist data to render table rows */}
                    {waitlist.map((person) => (
                        <tr key={person.id}>
                            <td>{person.email}</td>
                            <td>{person.position}</td>
                            <td>
                                {/* Button to trigger edit function */}
                                <button onClick={() => handleEdit(person.id)}>Edit</button>
                                {/* Button to trigger delete function */}
                                <button onClick={() => handleDelete(person.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WaitlistPage;
