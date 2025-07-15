import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../../../Firebase';
import './Permission.css';

const Request = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending'); // 🔁 active tab

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

    const q = query(collection(db, 'requests'), where('enrollment', '==', enrollment));

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

  const is24HoursPassed = (updatedAt) => {
    if (!updatedAt?.seconds) return false;
    const updatedDate = new Date(updatedAt.seconds * 1000);
    const now = new Date();
    const diff = now.getTime() - updatedDate.getTime();
    return diff >= 24 * 60 * 60 * 1000;
  };

  const filteredRequests = requests.filter((req) => {
    if (activeTab === 'pending') return !req.status;
    if (activeTab === 'accepted') return req.status === 'accepted';
    if (activeTab === 'rejected') return req.status === 'rejected';
    return false;
  });

  if (loading) return <p className="loading-message">Loading student requests...</p>;

  return (
    <div className="permission-container">
      <h2>📚 Your Submitted Requests</h2>

      {/* 🔘 Tabs */}
      <div className="tab-buttons">
        <button onClick={() => setActiveTab('pending')} className={activeTab === 'pending' ? 'active-tab' : ''}>Pending</button>
        <button onClick={() => setActiveTab('accepted')} className={activeTab === 'accepted' ? 'active-tab' : ''}>Accepted</button>
        <button onClick={() => setActiveTab('rejected')} className={activeTab === 'rejected' ? 'active-tab' : ''}>Rejected</button>
      </div>

      {/* 📋 Table */}
      {filteredRequests.length === 0 ? (
        <p className="empty-message">No {activeTab} requests found.</p>
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
              {filteredRequests.map((req, index) => {
                const isExpired = is24HoursPassed(req.statusUpdatedAt);
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
                      {req.status ? (
                        isExpired ? (
                          <button
                            className="delete-btns"
                            onClick={() => handleDelete(req.id)}
                          >
                            Delete
                          </button>
                        ) : (
                          <span className="status waiting">
                            ⏳ You can delete this request 24 hours after it was {req.status}.
                          </span>
                        )
                      ) : (
                        <span className="status pending">
                          ℹ️ You can delete the request if it is accepted or rejected after 24 hours.
                        </span>
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
