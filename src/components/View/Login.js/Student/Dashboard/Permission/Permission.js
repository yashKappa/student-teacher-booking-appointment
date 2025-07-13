import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../../Firebase';
import './Permission.css';

const Request = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCookie = (name) => {
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith(name + '='));
    return cookie ? cookie.split('=')[1] : null;
  };

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      const enrollment = getCookie('enrollment');

      if (!enrollment) {
        alert('❌ Student enrollment not found in cookies!');
        setLoading(false);
        return;
      }

      try {
        // 📍 Fetch from /students/{enrollment}/requests/
        const requestRef = collection(db, 'students', enrollment, 'requests');
        const snapshot = await getDocs(requestRef);

        const fetchedRequests = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRequests(fetchedRequests);
      } catch (error) {
        console.error('Error fetching student requests:', error);
        alert('❌ Failed to fetch student requests.');
      }

      setLoading(false);
    };

    fetchRequests();
  }, []);

  if (loading) return <p>Loading student requests...</p>;

 return (
  <div className="permission-container">
    <h2>📚 Your Submitted Requests</h2>
    {loading ? (
      <p className="loading-message">Loading student requests...</p>
    ) : requests.length === 0 ? (
      <p className="empty-message">No requests submitted yet.</p>
    ) : (
      <ul className="permission-list">
        {requests.map((req, index) => (
          <li key={index} className="permission-item">
            <strong>Teacher Contact ID:</strong> {req.contactId} <br />
            <strong>Subject:</strong> {req.subject} <br />
            <strong>Reason:</strong> {req.reason} <br />
            <strong>Course:</strong> {req.course} <br />
            <strong>Submitted At:</strong>{' '}
            {req.submittedAt?.seconds
              ? new Date(req.submittedAt.seconds * 1000).toLocaleString()
              : 'N/A'}
            <hr />
          </li>
        ))}
      </ul>
    )}
  </div>
);
}

export default Request;
