import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../../../Firebase';
import '../StudentDash/StudentDash.css';

const TeacherDash = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Added

  const fetchTeachers = async () => {
    setLoading(true); // ✅ Start loading
    try {
      const querySnapshot = await getDocs(collection(db, 'teachers'));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTeachers(data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
    setLoading(false); // ✅ Stop loading
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'teachers', deleteId));
      setTeachers(prev => prev.filter(teacher => teacher.id !== deleteId));
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
    setShowConfirm(false);
    setDeleteId(null);
  };

  const filteredTeachers = teachers.filter(teacher =>
    teacher.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.teacherID?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.course?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="student-dash">
      <h2 className='tech'> Teacher Dashboard</h2>

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
          Loading Teacher data....
        </p>
      ) : filteredTeachers.length === 0 ? (
        <p className="no-students">
          <img
            alt="No data"
            src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-illustration-download-in-svg-png-gif-file-formats--office-computer-digital-work-business-pack-illustrations-7265556.png"
          />
          No Teacher found.
        </p>
      ) : (
               <div className="table-responsive">
               <div className="table-scroll">

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Teacher ID</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Course</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeachers.map(teacher => (
              <tr key={teacher.id}>
                <td>{teacher.fullName} {teacher.surname}</td>
                <td>{teacher.teacherID}</td>
                <td>{teacher.email}</td>
                <td>{teacher.phone}</td>
                <td>{teacher.course}</td>
                <td className="trash">
                  <i
                    title="Delete Teacher"
                    className="fa-solid fa-trash"
                    onClick={() => confirmDelete(teacher.id)}
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
            <p>This action will permanently delete the Teacher record.</p>
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

export default TeacherDash;
