const express = require('express');
const router = express.Router();
const LeaveRequest = require('../models/LeaveRequest');
const Employee = require('../models/Employee');
const Notification = require('../models/Notification');
const sendEmail = require('../utils/sendEmail');

// Create a new leave request
router.post('/', async (req, res) => {
    try {
        const { employee_id, leave_type, start_date, end_date, reason } = req.body;

        // Validate the dates
        if (new Date(start_date) > new Date(end_date)) {
            return res.status(400).json({ message: 'Start date cannot be after end date' });
        }

        // Check if the employee exists
        const employee = await Employee.findById(employee_id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Check leave balance
        const leaveDays = (new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24) + 1;
        if (employee.leave_balance < leaveDays) {
            return res.status(400).json({ message: 'Insufficient leave balance' });
        }

        const leaveRequest = new LeaveRequest({
            employee_id: employee_id,
            leave_type,
            start_date,
            end_date,
            reason
        });

        await leaveRequest.save();
        res.status(201).json(leaveRequest);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all leave requests
router.get('/', async (req, res) => {
    try {
        const leaveRequests = await LeaveRequest.find().populate('employee_id', 'name email department role');
        res.status(200).json(leaveRequests);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Approve a leave request
router.put('/:id/approve', async (req, res) => {
    try {
        const leaveRequest = await LeaveRequest.findById(req.params.id).populate('employee_id');
        if (!leaveRequest) return res.status(404).json({ message: 'Leave request not found' });

        leaveRequest.status = 'Approved';
        leaveRequest.approved_by = req.body.approved_by;
        leaveRequest.approved_on = Date.now();

        // Deduct leave balance
        const employee = await Employee.findById(leaveRequest.employee_id._id);
        const leaveDays = (new Date(leaveRequest.end_date) - new Date(leaveRequest.start_date)) / (1000 * 60 * 60 * 24) + 1;
        employee.leave_balance -= leaveDays;

        await leaveRequest.save();
        await employee.save();

        // Send email notification (wrap in try-catch)
        try {
            await sendEmail(employee.email, 'Leave Request Approved', `Your leave request from ${leaveRequest.start_date} to ${leaveRequest.end_date} has been approved.`);
        } catch (emailError) {
            console.error('Error sending email:', emailError.message);
        }

        // Create in-app notification
        await Notification.create({
            employee_id: employee._id,
            message: `Your leave request from ${leaveRequest.start_date} to ${leaveRequest.end_date} has been approved.`,
            status: 'Unread'
        });

        res.status(200).json({ message: 'Leave approved successfully', leaveRequest });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Reject a leave request
router.put('/:id/reject', async (req, res) => {
    try {
        const leaveRequest = await LeaveRequest.findById(req.params.id).populate('employee_id');
        if (!leaveRequest) return res.status(404).json({ message: 'Leave request not found' });

        leaveRequest.status = 'Rejected';
        leaveRequest.approved_by = req.body.approved_by;
        leaveRequest.approved_on = Date.now();

        await leaveRequest.save();

        // Send email notification (wrap in try-catch)
        try {
            await sendEmail(leaveRequest.employee_id.email, 'Leave Request Rejected', `Your leave request from ${leaveRequest.start_date} to ${leaveRequest.end_date} has been rejected.`);
        } catch (emailError) {
            console.error('Error sending email:', emailError.message);
        }

        // Create in-app notification
        await Notification.create({
            employee_id: leaveRequest.employee_id._id,
            message: `Your leave request from ${leaveRequest.start_date} to ${leaveRequest.end_date} has been rejected.`,
            status: 'Unread'
        });

        res.status(200).json({ message: 'Leave rejected', leaveRequest });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;