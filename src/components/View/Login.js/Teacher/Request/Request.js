import React, { useEffect, useState } from 'react';
import { collection, doc, getDoc, onSnapshot, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../../Firebase';

const Request = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending'); // "pending" | "accepted" | "rejected"

  const getCookie = (name) => {
    const cookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith(name + '='));
    return cookie ? cookie.split('=')[1] : null;
  };

  useEffect(() => {
    const teacherID = getCookie('teacherID');

    if (!teacherID) {
      alert('❌ Teacher ID not found in cookies');
      setLoading(false);
      return;
    }

    const fetchAndListen = async () => {
      try {
        const teacherDocRef = doc(db, 'teachers', teacherID);
        const teacherSnap = await getDoc(teacherDocRef);

        if (!teacherSnap.exists()) {
          alert('❌ Teacher document not found!');
          setLoading(false);
          return;
        }

        const teacherData = teacherSnap.data();
        const contactID = teacherData.contactID;

        if (!contactID) {
          alert('❌ contactID not found in teacher document!');
          setLoading(false);
          return;
        }

        const unsubscribe = onSnapshot(collection(db, 'requests'), (snapshot) => {
          const filtered = snapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((req) => req.contactId === contactID);
          setRequests(filtered);
          setLoading(false);
        }, (error) => {
          console.error('❌ Error in onSnapshot:', error);
          alert('❌ Failed to fetch teacher requests.');
          setLoading(false);
        });

        return () => unsubscribe(); // Cleanup on unmount
      } catch (error) {
        console.error('Error fetching teacher info:', error);
        alert('❌ Could not fetch teacher data.');
        setLoading(false);
      }
    };

    fetchAndListen();
  }, []);

  const handleAccept = async (id) => {
    try {
      const requestRef = doc(db, 'requests', id);
      await updateDoc(requestRef, {
        status: 'accepted',
        statusUpdatedAt: serverTimestamp(),
      });
      alert('✅ Request accepted!');
    } catch (error) {
      console.error('Failed to accept request:', error);
      alert('❌ Failed to update request status.');
    }
  };

  const handleReject = async (id) => {
    try {
      const requestRef = doc(db, 'requests', id);
      await updateDoc(requestRef, {
        status: 'rejected',
        statusUpdatedAt: serverTimestamp(),
      });
      alert('❌ Request rejected!');
    } catch (error) {
      console.error('Failed to reject request:', error);
      alert('❌ Failed to update request status.');
    }
  };

  const filteredRequests = requests.filter((req) => {
    if (activeTab === 'pending') return !req.status;
    if (activeTab === 'accepted') return req.status === 'accepted';
    if (activeTab === 'rejected') return req.status === 'rejected';
    return false;
  });

  if (loading) return <p className="loading-message">Loading requests...</p>;

  return (
    <div className="permission-container">
      <h2>📌 Student Requests for You</h2>
      
      <div className="tab-buttons">
        <button
          onClick={() => setActiveTab('pending')}
          className={activeTab === 'pending' ? 'active-tab' : ''}
        >
          Pending
        </button>
        <button
          onClick={() => setActiveTab('accepted')}
          className={activeTab === 'accepted' ? 'active-tab' : ''}
        >
          Accepted
        </button>
        <button
          onClick={() => setActiveTab('rejected')}
          className={activeTab === 'rejected' ? 'active-tab' : ''}
        >
          Rejected
        </button>
      </div>

      {filteredRequests.length === 0 ? (
        <p className="empty-message">No {activeTab} requests found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="permission-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Course</th>
                <th>Subject</th>
                <th>Reason</th>
                <th>Submitted At</th>
                <th>Status / Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req, index) => (
                <tr key={index}>
                  <td>{req.name}</td>
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
                      <>
                        <button className="btn-accept" onClick={() => handleAccept(req.id)}>
                          Accept
                        </button>
                        <button className="btn-reject" onClick={() => handleReject(req.id)}>
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Request;
