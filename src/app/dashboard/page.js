'use client';

import { useState, useEffect } from 'react';
import './dashboard.css';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('students');
  const [studentData, setStudentData] = useState([]);
  const [lecturerData, setLecturerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [students, lecturers] = await Promise.all([
          fetch('/api/students').then(res => res.json()),
          fetch('/api/lecturers').then(res => res.json())
        ]);
        
        setStudentData(students);
        setLecturerData(lecturers);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  return (
    <div className="container">
      <nav className="nav">
        <h1>Student Management System</h1>
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            Students
          </button>
          <button 
            className={`tab ${activeTab === 'lecturers' ? 'active' : ''}`}
            onClick={() => setActiveTab('lecturers')}
          >
            Lecturers
          </button>
        </div>
      </nav>

      <main className="main">
        {activeTab === 'students' ? (
          <div className="studentSection">
            <h2>Student Information</h2>
            <div className="grid">
              {studentData?.map((student) => (
                <div key={student.id} className="card">
                  <h3>{student.name}</h3>
                  <div className="details">
                    <p><strong>Department:</strong> {student.department}</p>
                    <p><strong>Enrollment Year:</strong> {student.enrollment_year}</p>
                    <p><strong>Courses:</strong> {student.courses?.join(', ') || 'None'}</p>
                    <p><strong>Total Fee:</strong> ${student.total_fee}</p>
                    <p><strong>Fees Paid:</strong> ${student.fees_paid}</p>
                    <p><strong>Remaining Balance:</strong> ${student.remaining_balance}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="lecturerSection">
            <h2>Lecturer Information</h2>
            <div className="grid">
              {lecturerData?.map((lecturer) => (
                <div key={lecturer.id} className="card">
                  <h3>{lecturer.name}</h3>
                  <div className="details">
                    <p><strong>Email:</strong> {lecturer.email}</p>
                    <p><strong>Courses:</strong> {lecturer.courses?.join(', ') || 'None'}</p>
                    <p><strong>Teaching Assistants:</strong></p>
                    <ul>
                      {lecturer.teaching_assistants?.map((ta, index) => (
                        <li key={index}>{ta}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 