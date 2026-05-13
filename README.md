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

## Technologies Used

### Front-End Technologies
- React.js for building the SPA user interface
- React Scripts for development and build tooling
- Axios for API communication with the backend
- jsPDF and jsPDF-AutoTable for PDF export
- xlsx for Excel export
- Custom CSS for responsive UI styling

### Back-End Technologies
- Node.js runtime for server-side code
- Express.js for RESTful API routing
- MongoDB with Mongoose as the database layer
- JWT for authentication token handling
- bcryptjs for hashing passwords
- CORS middleware for cross-origin requests
- dotenv for environment variable management

### Database
- MongoDB Atlas as the cloud-hosted NoSQL database

### Authentication & Security
- JWT (JSON Web Tokens) for secure session handling
- bcryptjs for password hashing
- CORS to allow requests from the React frontend
- Environment-based configuration via dotenv

### DevOps & Deployment
- GitHub for repository hosting and version control
- Project is ready for cloud deployment on platforms such as Vercel/Netlify for frontend and Heroku/Render/AWS for backend

### Version Control
- Git for tracking code changes
- GitHub for collaboration and issue tracking

### Testing Tools (Recommended)
- Postman for API endpoint testing
- Jest for unit testing
- Supertest for backend route testing
- React Testing Library for component-level testing

### Optional Tools & Libraries
- Chart.js / Recharts for visual dashboard charts
- Cloudinary / Firebase Storage for document/photo uploads
- Socket.io for real-time notifications
- Nodemailer / SendGrid for email automation

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