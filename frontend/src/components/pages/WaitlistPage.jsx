// WaitlistPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./../../assets/styles/WaitlistPage.css";// Import the CSS file for styling

const WaitlistPage = () => {
    const [waitlist, setWaitlist] = useState([]);

    useEffect(() => {
        // Fetch the waitlist data from the server
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

    const handleEdit = async (id) => {
        // Implement edit logic
        console.log('Edit waitlist entry with id:', id);
    };

    const handleDelete = async (id) => {
        // Implement delete logic
        try {
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
            <table className="waitlist-table">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Position</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {waitlist.map((person) => (
                        <tr key={person.id}>
                            <td>{person.email}</td>
                            <td>{person.position}</td>
                            <td>
                                <button onClick={() => handleEdit(person.id)}>Edit</button>
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
