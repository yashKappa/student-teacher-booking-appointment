import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
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
    const enrollment = getCookie('enrollment');

    if (!enrollment) {
      alert('❌ Student enrollment not found in cookies!');
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'requests'),
      where('enrollment', '==', enrollment)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const matchedRequests = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRequests(matchedRequests);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching matched requests:', error);
      alert('❌ Failed to fetch matched request(s).');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'requests', id));
      alert('🗑️ Request deleted.');
    } catch (error) {
      console.error('Error deleting request:', error);
      alert('❌ Failed to delete request.');
    }
  };

const is24HoursPassed = (statusUpdatedAt) => {
  if (!statusUpdatedAt?.seconds) return false;
  const updatedDate = new Date(statusUpdatedAt.seconds * 1000);
  const now = new Date();
  const diff = now.getTime() - updatedDate.getTime();
  return diff >= 24 * 60 * 60 * 1000; // 24 hours in milliseconds
};

  if (loading) return <p className="loading-message">Loading student requests...</p>;

  return (
    <div className="permission-container">
      <h2>📚 Your Submitted Requests</h2>

      {requests.length === 0 ? (
        <p className="empty-message">No requests submitted yet.</p>
      ) : (
        <div className="table-wrapper">
          <table className="permission-table">
            <thead>
              <tr>
                <th>Teacher Contact ID</th>
                <th>Subject</th>
                <th>Reason</th>
                <th>Course</th>
                <th>Submitted At</th>
                <th>Status</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, index) => {
                const isExpired = is24HoursPassed(req.submittedAt);
                return (
                  <tr key={index}>
                    <td>{req.contactId}</td>
                    <td>{req.course}</td>
                    <td>{req.subject}</td>
                    <td className="reason">{req.reason}</td>
                    <td>
                      {req.submittedAt?.seconds
                        ? new Date(req.submittedAt.seconds * 1000).toLocaleString()
                        : 'N/A'}
                    </td>
                    <td>
                      {req.status === 'accepted' && (
                        <span className="status accepted">✅ Accepted</span>
                      )}
                      {req.status === 'rejected' && (
                        <span className="status rejected">❌ Rejected</span>
                      )}
                      {!req.status && (
                        <span className="status pending">⏳ Pending</span>
                      )}
                    </td>
                    <td>
                       {req.status && isExpired && (
                        <button
                          className="delete-btns"
                          onClick={() => handleDelete(req.id)}
                        >
                          Delete
                        </button>
                      )}
                      {!req.status && (
                        <span className="status pending">You can delete this request 24 hours after it was accepted/rejected.</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Request;
