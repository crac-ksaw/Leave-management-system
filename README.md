

---

# Employee Leave Management System

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)
- [Frontend Overview](#frontend-overview)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

The Employee Leave Management System is a full-stack web application designed to manage employee leave requests, approvals, and leave balances. This system provides a user-friendly interface for employees to submit leave requests and view leave balances, and an admin dashboard to handle leave approvals and manage employee data.

---

## Features

- **Employee Authentication**: Secure login and registration.
- **Leave Requests**: Employees can submit leave requests.
- **Leave Approval**: Managers or HR can approve or reject leave requests.
- **Leave Balance Tracking**: Employees can view their leave balance.
- **Notifications**: Receive notifications about leave request statuses.
- **Integration**: Easy to integrate with HR management systems.

---

## Technology Stack

### Frontend
- **React**: For building the user interface.
- **React Router**: For handling page navigation.
- **Axios**: For making HTTP requests to the backend API.

### Backend
- **Node.js**: For server-side logic.
- **Express**: For creating RESTful APIs.
- **MongoDB**: For storing employee and leave data.
- **Mongoose**: For MongoDB object modeling.
- **JWT (JSON Web Tokens)**: For secure authentication.

---

## Project Structure

```
project-root/
├── client/                     # React frontend
│   ├── src/
│   │   ├── components/         # Reusable components (e.g., Notifications, LeaveForm)
│   │   ├── pages/              # Application pages (e.g., Dashboard, Login)
│   │   └── App.js              # Main React component
├── server/                     # Node.js backend
│   ├── routes/                 # API route handlers (e.g., auth, leave, employee)
│   ├── models/                 # Mongoose schemas (e.g., Employee, Leave)
│   ├── middleware/             # Authentication and error handling middleware
│   ├── server.js               # Express app configuration
└── .env                        # Environment variables
```

---

## Installation

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/leave-management-system.git
   cd leave-management-system
   ```

2. Install server dependencies:

   ```bash
   cd server
   npm install
   ```

3. Install client dependencies:

   ```bash
   cd ../client
   npm install
   ```

---

## Environment Variables

In the `server` directory, create a `.env` file with the following environment variables:

```plaintext
PORT=5000
MONGO_URI=mongodb://localhost:27017/leave-management
JWT_SECRET=your_jwt_secret
```

- **PORT**: The port where your backend server will run.
- **MONGO_URI**: MongoDB connection string.
- **JWT_SECRET**: Secret key for signing JWT tokens.

---

## Running the Project

1. **Start MongoDB** (if it's not already running):

   ```bash
   mongod
   ```

2. **Start the backend server**:

   In the `server` directory:

   ```bash
   npm start
   ```

3. **Start the frontend server**:

   In the `client` directory:

   ```bash
   npm start
   ```

4. Open your browser and visit [http://localhost:3000](http://localhost:3000).

---

## API Documentation

Here’s a brief overview of the main API endpoints:

### Authentication

- **POST /api/auth/login** - Login user and return JWT token.
- **POST /api/auth/register** - Register a new employee.

### Employees

- **GET /api/employees/me** - Get the currently logged-in employee’s data.
- **GET /api/employees/:id** - Get an employee by ID.

### Leave Requests

- **POST /api/leaves** - Submit a new leave request.
- **GET /api/leaves** - Get all leave requests (for admin).
- **PUT /api/leaves/:id/approve** - Approve a leave request.
- **PUT /api/leaves/:id/reject** - Reject a leave request.

### Notifications

- **GET /api/notifications** - Get notifications for leave requests.

---

## Frontend Overview

The frontend consists of the following main components:

- **Dashboard**: Main page for employees to view leave balance, submit requests, and see notifications.
- **Login/Register**: Authentication pages.
- **Leave Requests**: Page to view leave history and status.

---

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push your branch (`git push origin feature-name`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

Let me know if you'd like additional details or customizations for this README file!
