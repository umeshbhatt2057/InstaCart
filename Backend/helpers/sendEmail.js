// sendEmail.js
const nodemailer = require('nodemailer');
require('dotenv').config();  // Load environment variables

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  // Your Gmail email address
    pass: process.env.EMAIL_PASS,  // Your Gmail App Password
  },
});

/**
 * General function to send an email.
 * @param {string} to - Recipient's email address.
 * @param {string} subject - The email subject.
 * @param {string} text - The plain text body.
 * @param {string} html - The HTML body.
 */
const sendEmail = (to, subject, text, html) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,  // Sender address
    to,                            // Recipient's email
    subject,                       // Subject line
    text,                          // Plain text body
    html                           // HTML body
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
