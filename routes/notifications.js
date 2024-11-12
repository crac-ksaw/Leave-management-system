// routes/notifications.js
const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Get notifications for an employee
router.get('/:employee_id', async (req, res) => {
    try {
        const notifications = await Notification.find({ employee_id: req.params.employee_id }).sort({ timestamp: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Mark notification as read
router.put('/:id/read', async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) return res.status(404).json({ message: 'Notification not found' });

        notification.status = 'Read';
        await notification.save();

        res.status(200).json({ message: 'Notification marked as read' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;