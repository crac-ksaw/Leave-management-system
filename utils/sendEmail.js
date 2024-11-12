// utils/sendEmail.js
const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // You can use other services like Outlook, etc.
            auth: {
                user: process.env.EMAIL_USER, // Add your email
                pass: process.env.EMAIL_PASS // Add your email password
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: text
        });

        console.log('Email sent successfully');
    } catch (error) {
        console.log('Error sending email:', error);
    }
};

module.exports = sendEmail;