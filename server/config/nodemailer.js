const nodemailer = require('nodemailer');
require('dotenv').config();

// Check for required environment variables
if (!process.env.MAIL_HOST || !process.env.MAIL_USER || !process.env.MAIL_PASS) {
  throw new Error("Missing Nodemailer config. Please check .env file.");
}

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587, // Standard port for SMTP
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USER, // Your Gmail address
    pass: process.env.MAIL_PASS, // Your App Password
  },
  // Use this if you are on a specific provider that needs it
  // tls: {
  //   ciphers:'SSLv3'
  // }
});

// Verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.error("Nodemailer connection failed:", error.message);
  } else {
    console.log("Nodemailer is configured and ready to send emails.");
  }
});

module.exports = transporter;
