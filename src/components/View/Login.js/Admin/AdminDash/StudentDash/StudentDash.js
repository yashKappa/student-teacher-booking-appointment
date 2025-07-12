import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../../../Firebase';
import './StudentDash.css';

const StudentDash = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Loading state

  const fetchStudents = async () => {
    setLoading(true); // Start loading
    try {
      const querySnapshot = await getDocs(collection(db, 'students'));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
    setLoading(false); // Done loading
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'students', deleteId));
      setStudents(prev => prev.filter(student => student.id !== deleteId));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
    setShowConfirm(false);
    setDeleteId(null);
  };

  const filteredStudents = students.filter(student =>
    student.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.enrollmentNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="student-dash">
      <h2>👨‍🎓 Student Dashboard</h2>

      <input
        type="text"
        placeholder="Search by name, enrollment, email or course..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-box"
      />

      {loading ? (
        <p className="dataload">
          <img
            alt="No data"
            src="https://icon-library.com/images/loading-icon-animated-gif/loading-icon-animated-gif-3.jpg"
          />
          Loading student data....
        </p>
      ) : filteredStudents.length === 0 ? (
        <p className="no-students">
          <img
            alt="No data"
            src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-illustration-download-in-svg-png-gif-file-formats--office-computer-digital-work-business-pack-illustrations-7265556.png"
          />
          No students found.
        </p>
      ) : (
 <div className="table-responsive">
               <div className="table-scroll">
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Enrollment</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Course</th>
        <th>DOB</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {filteredStudents.map(student => (
        <tr key={student.id}>
          <td>{student.fullName} {student.surname}</td>
          <td>{student.enrollmentNumber}</td>
          <td>{student.email}</td>
          <td>{student.phone}</td>
          <td>{student.course}</td>
          <td>
            {student.dob instanceof Object
              ? new Date(student.dob.seconds * 1000).toLocaleDateString()
              : student.dob}
          </td>
          <td className="trash">
            <i
              title="Delete Student"
              className="fa-solid fa-trash"
              onClick={() => confirmDelete(student.id)}
            ></i>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div>

      )}

      {/* Custom Confirm Modal */}
      {showConfirm && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Are you sure?</h3>
            <p>This action will permanently delete the student record.</p>
            <div className="popup-buttons">
              <button className="confirm-btn" onClick={handleDelete}>Yes, Delete</button>
              <button className="cancel-btn" onClick={() => setShowConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDash;
