import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EmployeeDashboard({ user }) {
  const [profile, setProfile] = useState({});
  const [attendance, setAttendance] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [leaveForm, setLeaveForm] = useState({
    type: 'Vacation',
    startDate: '',
    endDate: '',
    reason: ''
  });
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    fetchProfile();
    fetchAttendance();
    fetchLeaves();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/employees/${user._id}`, {
        headers: { 'x-auth-token': token }
      });
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchAttendance = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/attendance?employeeId=${user._id}`, {
        headers: { 'x-auth-token': token }
      });
      setAttendance(response.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  const fetchLeaves = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/leaves?employeeId=${user._id}`, {
        headers: { 'x-auth-token': token }
      });
      setLeaves(response.data);
    } catch (error) {
      console.error('Error fetching leaves:', error);
    }
  };

  const handleCheckIn = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/attendance/checkin', { employeeId: user._id }, {
        headers: { 'x-auth-token': token }
      });
      fetchAttendance();
    } catch (error) {
      console.error('Error checking in:', error);
    }
  };

  const handleCheckOut = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/attendance/checkout', { employeeId: user._id }, {
        headers: { 'x-auth-token': token }
      });
      fetchAttendance();
    } catch (error) {
      console.error('Error checking out:', error);
    }
  };

  const handleLeaveSubmit = async (e) => {
    e.preventDefault();
    const startDate = new Date(leaveForm.startDate);
    const endDate = new Date(leaveForm.endDate);
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/leaves', {
        ...leaveForm,
        employee: user._id,
        days
      }, {
        headers: { 'x-auth-token': token }
      });
      fetchLeaves();
      setLeaveForm({
        type: 'Vacation',
        startDate: '',
        endDate: '',
        reason: ''
      });
    } catch (error) {
      console.error('Error submitting leave:', error);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div>
            <h2>My Profile</h2>
            <div className="profile">
              <p><strong>Employee ID:</strong> {profile.employeeId}</p>
              <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone:</strong> {profile.phone}</p>
              <p><strong>Department:</strong> {profile.department}</p>
              <p><strong>Position:</strong> {profile.position}</p>
              <p><strong>Joining Date:</strong> {profile.joiningDate ? new Date(profile.joiningDate).toLocaleDateString() : ''}</p>
              <p><strong>Salary:</strong> {profile.salary}</p>
              <p><strong>Role:</strong> {profile.role}</p>
            </div>
          </div>
        );
      case 'attendance':
        return (
          <div>
            <h2>Attendance</h2>
            <div style={{ marginBottom: '20px' }}>
              <button onClick={handleCheckIn} style={{ marginRight: '10px' }}>Check In</button>
              <button onClick={handleCheckOut}>Check Out</button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Status</th>
                  <th>Working Hours</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map(att => (
                  <tr key={att._id}>
                    <td>{new Date(att.date).toLocaleDateString()}</td>
                    <td>{att.checkIn ? new Date(att.checkIn).toLocaleTimeString() : '-'}</td>
                    <td>{att.checkOut ? new Date(att.checkOut).toLocaleTimeString() : '-'}</td>
                    <td>{att.status}</td>
                    <td>{att.workingHours.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'leaves':
        return (
          <div>
            <h2>Leave Management</h2>
            <form onSubmit={handleLeaveSubmit} style={{ marginBottom: '20px' }}>
              <select name="type" value={leaveForm.type} onChange={(e) => setLeaveForm({ ...leaveForm, type: e.target.value })}>
                <option value="Vacation">Vacation</option>
                <option value="Sick">Sick</option>
                <option value="Personal">Personal</option>
                <option value="Maternity">Maternity</option>
                <option value="Paternity">Paternity</option>
              </select>
              <input type="date" placeholder="Start Date" value={leaveForm.startDate} onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })} required />
              <input type="date" placeholder="End Date" value={leaveForm.endDate} onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })} required />
              <textarea placeholder="Reason" value={leaveForm.reason} onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })} required />
              <button type="submit">Submit Leave Request</button>
            </form>
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Days</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map(leave => (
                  <tr key={leave._id}>
                    <td>{leave.type}</td>
                    <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                    <td>{new Date(leave.endDate).toLocaleDateString()}</td>
                    <td>{leave.days}</td>
                    <td>{leave.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <h1>Employee Dashboard</h1>
      <p>Welcome, {user.firstName} {user.lastName} ({user.role})</p>

      <div className="tabs">
        <button onClick={() => setActiveTab('profile')} className={activeTab === 'profile' ? 'active' : ''}>Profile</button>
        <button onClick={() => setActiveTab('attendance')} className={activeTab === 'attendance' ? 'active' : ''}>Attendance</button>
        <button onClick={() => setActiveTab('leaves')} className={activeTab === 'leaves' ? 'active' : ''}>Leaves</button>
      </div>

      {renderTabContent()}
    </div>
  );
}

export default EmployeeDashboard;