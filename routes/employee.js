const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const auth = require('../middleware/authMiddleware'); // Import authentication middleware

// Create a new employee
router.post('/', async (req, res) => {
    try {
        const employee = new Employee(req.body);
        await employee.save();
        res.status(201).json(employee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get an employee by ID
router.get('/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.status(200).json(employee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get current authenticated employee (GET /me)
router.get('/me', auth, async (req, res) => {
    try {
        const employee = await Employee.findById(req.user.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
