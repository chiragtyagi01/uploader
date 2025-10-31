const { Resend } = require('resend');
require('dotenv').config();

// Check if the API key is provided
if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY in .env file");
}

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = resend;