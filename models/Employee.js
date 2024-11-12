const mongoose = require('mongoose');

// Function to auto-generate employee ID
const generateEmployeeId = () => {
    return 'EMP' + Math.floor(1000 + Math.random() * 9000); // Generates EMPxxxx (4-digit random number)
};

const EmployeeSchema = new mongoose.Schema({
    employee_id: { type: String, default: generateEmployeeId, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // New password field
    department: { type: String, required: true },
    role: { type: String, enum: ['Employee', 'Manager', 'Admin'], required: true },
    leave_balance: { type: Number, default: 20 } // Default leave balance
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);