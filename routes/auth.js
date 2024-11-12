// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Employee = require('../models/Employee');

// Register a new employee (Admin only)
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role, department } = req.body;

        // Check if the user already exists
        let employee = await Employee.findOne({ email });
        if (employee) {
            return res.status(400).json({ message: 'Employee already exists' });
        }

        // Hash the password using bcrypt
        const salt = await bcrypt.genSalt(10); // Generate salt
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

        // Create a new employee with the hashed password
        employee = new Employee({
            name,
            email,
            password: hashedPassword, // Store hashed password
            role,
            department,
            leave_balance: 20 // Default leave balance
        });

        await employee.save();

        res.status(201).json({ message: 'Employee registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Employee login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the employee exists
        const employee = await Employee.findOne({ email });
        if (!employee) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: employee._id, role: employee.role }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
