const transporter = require('../config/nodemailer'); // <-- Import Nodemailer transporter
require('dotenv').config();

/**
 * Sends an email using Nodemailer.
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} html - The HTML content of the email.
 */
const mailSender = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: `"FileUploader" <${process.env.MAIL_USER}>`, // Sender address (must be your MAIL_USER)
      to: to, // Recipient's email
      subject: subject, // Subject line
      html: html, // HTML body
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully:", info.response);
    return info;

  } catch (error) {
    console.error("Failed to send email:", error.message);
  }
};

module.exports = mailSender;
