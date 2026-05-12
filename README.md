# HRM System

A Human Resource Management System built with Node.js, Express, MongoDB, and React.

## Features

- Multi-role login (Admin, HR Staff, Employee, Manager)
- Employee management
- Leave management
- Payroll management
- Attendance tracking
- Performance reviews
- Job postings
- Dashboard with KPIs
- Search and filter functionalities
- Export data to Excel and PDF

## Non-Functional Requirements

- Performance: Supports 500+ concurrent users with response time < 2 seconds
- Security: Role-based access control, encrypted passwords, audit logs
- Usability: Intuitive and user-friendly interface
- Reliability: 99.9% uptime, automatic backups (via MongoDB Atlas)
- Maintainability: Modular codebase
- Portability: Deployable on Linux/Windows servers, cloud-ready

## Installation

1. Clone the repository
2. Install dependencies for backend and frontend
3. Set up MongoDB Atlas connection
4. Run the servers

## Usage

- Start backend: `npm start` in Backend/
- Start frontend: `npm start` in frontend/
- Access at http://localhost:3000

## API Endpoints

- /api/auth - Authentication
- /api/employees - Employee management
- /api/leaves - Leave requests
- /api/payroll - Payroll
- /api/attendance - Attendance
- /api/performance - Performance
- /api/jobs - Job postings

## Data Models

- Employee: EmpID, Name, Email, Department, etc.
- Leave: LeaveID, EmpID, StartDate, EndDate, Status
- Payroll: PayrollID, EmpID, Month, Amount, Deductions</content>
<parameter name="filePath">d:\HRM System\README.md