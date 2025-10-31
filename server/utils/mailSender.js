const resend = require('../config/resend');

/**
 * Sends an email using Resend.
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} html - The HTML content of the email.
 */
const mailSender = async (to, subject, html) => {
  try {
    const { data, error } = await resend.emails.send({
      // -----------------------------------------------------------------
      // !!! IMPORTANT !!!
      // This 'from' address MUST be a verified domain in your Resend account.
      // For testing, Resend allows 'onboarding@resend.dev'
      // Replace 'onboarding@resend.dev' with your verified email,
      // e.g., 'noreply@yourdomain.com'
      // -----------------------------------------------------------------
      from: 'FileUploader <onboarding@resend.dev>',
      to: [to], // 'to' must be an array
      subject: subject,
      html: html,
    });

    if (error) {
      console.error("Resend error:", error);
      throw new Error(`Email sending failed: ${error.message}`);
    }

    console.log("Email sent successfully:", data.id);
    return data;

  } catch (error) {
    console.error("Failed to send email:", error.message);
  }
};

module.exports = mailSender;