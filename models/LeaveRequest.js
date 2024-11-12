// models/LeaveRequest.js
const mongoose = require('mongoose');

const LeaveRequestSchema = new mongoose.Schema({
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    leave_type: { type: String, enum: ['Sick', 'Casual', 'Maternity'], required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    requested_on: { type: Date, default: Date.now },
    approved_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }, // for manager/admin
    approved_on: { type: Date }
});

module.exports = mongoose.model('LeaveRequest', LeaveRequestSchema);