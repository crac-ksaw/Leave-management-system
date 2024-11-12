// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

// Initialize the app
const app = express();
app.use(express.json());

// Enable CORS for frontend origin and allow all OPTIONS preflight requests
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));
app.options('*', cors()); // Handle preflight requests

// Import the required modules
const leaveRequestRoutes = require('./routes/leaveRequest');
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employee');
const notificationRoutes = require('./routes/notifications');
const auth = require('./middleware/authMiddleware');

// Use the routes with middleware where needed
app.use('/api/auth', (req, res, next) => {
    console.log("Auth route hit");
    next();
}, authRoutes);

app.use('/api/notifications', (req, res, next) => {
    console.log("Notifications route hit");
    next();
}, notificationRoutes);

app.use('/api/leaves', (req, res, next) => {
    console.log("Leaves route hit");
    next();
}, auth, leaveRequestRoutes);

app.use('/api/employees', (req, res, next) => {
    console.log("Employees route hit");
    next();
}, auth, employeeRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the Employee Leave Management System');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('Error connecting to MongoDB:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
