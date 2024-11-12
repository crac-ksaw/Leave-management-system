// models/Notification.js
const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['Sent', 'Unread', 'Read'], default: 'Unread' },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', NotificationSchema);
