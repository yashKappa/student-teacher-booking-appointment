import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../Firebase';

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
      const teacherID = getCookie('teacherID');

      if (!teacherID) {
        alert('❌ Teacher ID not found in cookies');
        setLoading(false);
        return;
      }

      try {
        // Fetch from /teachers/{teacherID}/requests/
        const requestRef = collection(db, 'teachers', teacherID, 'requests');
        const snapshot = await getDocs(requestRef);

        const fetchedRequests = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRequests(fetchedRequests);
      } catch (error) {
        console.error('Error fetching requests:', error);
        alert('❌ Failed to fetch requests.');
      }

      setLoading(false);
    };

    fetchRequests();
  }, []);

  if (loading) return <p>Loading requests...</p>;

  return (
    <div>
      <h2>📌 Student Requests</h2>
      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <ul>
          {requests.map((req, index) => (
            <li key={index}>
              <strong>Student:</strong> {req.name} <br />
              <strong>Course:</strong> {req.course} <br />
              <strong>Subject:</strong> {req.subject} <br />
              <strong>Reason:</strong> {req.reason} <br />
              <strong>Enrollment:</strong> {req.enrollment} <br />
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
};

export default Request;
