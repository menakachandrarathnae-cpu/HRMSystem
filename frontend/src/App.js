import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employeeId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    joiningDate: '',
    salary: '',
    role: 'Employee'
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/employees', form);
      fetchEmployees();
      setForm({
        employeeId: '',
        firstName: '',
        lastName: '',
        email: '',
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

  return (
    <div className="App">
      <h1>HRM System - Employee Management</h1>
      <form onSubmit={handleSubmit}>
        <input name="employeeId" placeholder="Employee ID" value={form.employeeId} onChange={handleChange} required />
        <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
        <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required />
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
      <h2>Employees</h2>
      <ul>
        {employees.map(employee => (
          <li key={employee._id}>
            {employee.firstName} {employee.lastName} - {employee.position} ({employee.department})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;