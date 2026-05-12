import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function AdminDashboard({ user }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [payrolls, setPayrolls] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [performances, setPerformances] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [form, setForm] = useState({
    employeeId: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    department: '',
    position: '',
    joiningDate: '',
    salary: '',
    role: 'Employee'
  });

  useEffect(() => {
    fetchEmployees();
    fetchAttendance();
    fetchLeaves();
    fetchPayrolls();
    fetchJobs();
    fetchPerformances();
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/employees', {
        headers: { 'x-auth-token': token }
      });
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchAttendance = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/attendance', {
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
      const response = await axios.get('http://localhost:5000/api/leaves', {
        headers: { 'x-auth-token': token }
      });
      setLeaves(response.data);
    } catch (error) {
      console.error('Error fetching leaves:', error);
    }
  };

  const fetchPayrolls = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/payroll', {
        headers: { 'x-auth-token': token }
      });
      setPayrolls(response.data);
    } catch (error) {
      console.error('Error fetching payrolls:', error);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/jobs');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchPerformances = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/performance', {
        headers: { 'x-auth-token': token }
      });
      setPerformances(response.data);
    } catch (error) {
      console.error('Error fetching performances:', error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/employees', form, {
        headers: { 'x-auth-token': token }
      });
      fetchEmployees();
      setForm({
        employeeId: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        department: '',
        position: '',
        joiningDate: '',
        salary: '',
        role: 'Employee'
      });
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/employees/${id}`, {
        headers: { 'x-auth-token': token }
      });
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const exportToExcel = (data) => {
    const ws = XLSX.utils.json_to_sheet(data.map(emp => ({
      ID: emp.employeeId,
      Name: `${emp.firstName} ${emp.lastName}`,
      Email: emp.email,
      Department: emp.department,
      Position: emp.position,
      Role: emp.role
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Employees');
    XLSX.writeFile(wb, 'employees.xlsx');
  };

  const exportToPDF = (data) => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['ID', 'Name', 'Email', 'Department', 'Position', 'Role']],
      body: data.map(emp => [emp.employeeId, `${emp.firstName} ${emp.lastName}`, emp.email, emp.department, emp.position, emp.role])
    });
    doc.save('employees.pdf');
  };

  const updateLeaveStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/leaves/${id}/status`, { status }, {
        headers: { 'x-auth-token': token }
      });
      fetchLeaves();
    } catch (error) {
      console.error('Error updating leave status:', error);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div>
            <h2>Dashboard - Key Performance Indicators</h2>
            <div className="kpis">
              <div className="kpi">
                <h3>Total Employees</h3>
                <p>{employees.length}</p>
              </div>
              <div className="kpi">
                <h3>Pending Leaves</h3>
                <p>{leaves.filter(leave => leave.status === 'Pending').length}</p>
              </div>
              <div className="kpi">
                <h3>Approved Leaves</h3>
                <p>{leaves.filter(leave => leave.status === 'Approved').length}</p>
              </div>
              <div className="kpi">
                <h3>Total Payroll Records</h3>
                <p>{payrolls.length}</p>
              </div>
              <div className="kpi">
                <h3>Active Jobs</h3>
                <p>{jobs.filter(job => job.status === 'Open').length}</p>
              </div>
              <div className="kpi">
                <h3>Performance Reviews</h3>
                <p>{performances.length}</p>
              </div>
            </div>
          </div>
        );
      case 'employees':
        const filteredEmployees = employees.filter(emp =>
          (emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           emp.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
          (filterDept === '' || emp.department === filterDept)
        );
        return (
          <div>
            <h2>Employee Management</h2>
            <div className="filters">
              <input type="text" placeholder="Search employees..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)}>
                <option value="">All Departments</option>
                {[...new Set(employees.map(emp => emp.department))].map(dept => <option key={dept} value={dept}>{dept}</option>)}
              </select>
            </div>
            <form onSubmit={handleSubmit}>
              <input name="employeeId" placeholder="Employee ID" value={form.employeeId} onChange={handleChange} required />
              <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
              <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
              <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required />
              <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} required />
              <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
              <input name="department" placeholder="Department" value={form.department} onChange={handleChange} required />
              <input name="position" placeholder="Position" value={form.position} onChange={handleChange} required />
              <input name="joiningDate" placeholder="Joining Date" type="date" value={form.joiningDate} onChange={handleChange} required />
              <input name="salary" placeholder="Salary" type="number" value={form.salary} onChange={handleChange} required />
              <select name="role" value={form.role} onChange={handleChange}>
                <option value="Admin">Admin</option>
                <option value="HR Staff">HR Staff</option>
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
              </select>
              <button type="submit">Add Employee</button>
            </form>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Position</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map(employee => (
                  <tr key={employee._id}>
                    <td>{employee.employeeId}</td>
                    <td>{employee.firstName} {employee.lastName}</td>
                    <td>{employee.email}</td>
                    <td>{employee.department}</td>
                    <td>{employee.position}</td>
                    <td>{employee.role}</td>
                    <td>
                      <button onClick={() => handleDelete(employee._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="export-buttons">
              <button onClick={() => exportToExcel(filteredEmployees)}>Export to Excel</button>
              <button onClick={() => exportToPDF(filteredEmployees)}>Export to PDF</button>
            </div>
          </div>
        );
      case 'attendance':
        return (
          <div>
            <h2>Attendance Management</h2>
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
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
                    <td>{att.employee.firstName} {att.employee.lastName}</td>
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
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Days</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map(leave => (
                  <tr key={leave._id}>
                    <td>{leave.employee.firstName} {leave.employee.lastName}</td>
                    <td>{leave.type}</td>
                    <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                    <td>{new Date(leave.endDate).toLocaleDateString()}</td>
                    <td>{leave.days}</td>
                    <td>{leave.status}</td>
                    <td>
                      {leave.status === 'Pending' && (
                        <>
                          <button onClick={() => updateLeaveStatus(leave._id, 'Approved')}>Approve</button>
                          <button onClick={() => updateLeaveStatus(leave._id, 'Rejected')}>Reject</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'payroll':
        return (
          <div>
            <h2>Payroll Management</h2>
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Month</th>
                  <th>Basic Salary</th>
                  <th>Net Salary</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payrolls.map(payroll => (
                  <tr key={payroll._id}>
                    <td>{payroll.employee.firstName} {payroll.employee.lastName}</td>
                    <td>{payroll.month}</td>
                    <td>{payroll.basicSalary}</td>
                    <td>{payroll.netSalary}</td>
                    <td>{payroll.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'recruitment':
        return (
          <div>
            <h2>Recruitment</h2>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Applicants</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map(job => (
                  <tr key={job._id}>
                    <td>{job.title}</td>
                    <td>{job.department}</td>
                    <td>{job.status}</td>
                    <td>{job.applicants.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'performance':
        return (
          <div>
            <h2>Performance Management</h2>
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Period</th>
                  <th>Overall Rating</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {performances.map(perf => (
                  <tr key={perf._id}>
                    <td>{perf.employee.firstName} {perf.employee.lastName}</td>
                    <td>{perf.period}</td>
                    <td>{perf.overallRating}</td>
                    <td>{perf.status}</td>
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
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user.firstName} {user.lastName} ({user.role})</p>

      <div className="tabs">
        <button onClick={() => setActiveTab('dashboard')} className={activeTab === 'dashboard' ? 'active' : ''}>Dashboard</button>
        <button onClick={() => setActiveTab('employees')} className={activeTab === 'employees' ? 'active' : ''}>Employees</button>
        <button onClick={() => setActiveTab('attendance')} className={activeTab === 'attendance' ? 'active' : ''}>Attendance</button>
        <button onClick={() => setActiveTab('leaves')} className={activeTab === 'leaves' ? 'active' : ''}>Leaves</button>
        <button onClick={() => setActiveTab('payroll')} className={activeTab === 'payroll' ? 'active' : ''}>Payroll</button>
        <button onClick={() => setActiveTab('recruitment')} className={activeTab === 'recruitment' ? 'active' : ''}>Recruitment</button>
        <button onClick={() => setActiveTab('performance')} className={activeTab === 'performance' ? 'active' : ''}>Performance</button>
      </div>

      {renderTabContent()}
    </div>
  );
}

export default AdminDashboard;