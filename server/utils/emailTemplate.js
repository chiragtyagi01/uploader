/**
 * Generates a professional HTML email template for a successful file upload.
 * Inspired by the clean look of React Email templates.
 * @param {string} filename - The name of the uploaded file.
 * @param {string} fileUrl - The public URL of the uploaded file.
 * @returns {string} A complete HTML email document.
 */
const fileUploadTemplate = (filename, fileUrl) => {
  const currentYear = new Date().getFullYear();

  // Social links and icon URLs (using a CDN for simple, universal icons)
  const socials = [
    {
      href: 'https://github.com/chiragtyagi01/',
      imgSrc: 'https://cdn.simpleicons.org/github/666',
      alt: 'GitHub',
    },
    {
      href: 'https://www.linkedin.com/in/ichiragtyagi/',
      imgSrc: 'https://cdn.simpleicons.org/linkedin/666',
      alt: 'LinkedIn',
    },
    {
      href: 'https://x.com/I_am_Chirag28',
      imgSrc: 'https://cdn.simpleicons.org/x/666',
      alt: 'X (Twitter)',
    },
    {
      href: 'https://chiragtyagi.hashnode.dev/',
      imgSrc: 'https://cdn.simpleicons.org/hashnode/666',
      alt: 'Hashnode Blog',
    },
  ];

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>File Upload Successful!</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

      body, html {
        margin: 0;
        padding: 0;
        width: 100%;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      .container {
        width: 100%;
        padding: 40px 20px;
        background-color: #f4f4f7;
        box-sizing: border-box;
      }

      .main-content {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        overflow: hidden;
      }

      .header {
        padding: 32px 40px;
        background-color: #fbfbfb;
        border-bottom: 1px solid #e2e8f0;
      }

      .header-title {
        font-size: 24px;
        font-weight: 700;
        color: #1a1a1a;
        margin: 0;
      }

      .content {
        padding: 32px 40px;
      }

      .content p {
        font-size: 16px;
        line-height: 1.6;
        color: #333;
        margin: 0 0 24px;
      }

      .content .filename {
        font-weight: 600;
        color: #000;
      }

      .button {
        display: inline-block;
        padding: 14px 24px;
        font-size: 16px;
        font-weight: 600;
        color: #ffffff;
        background-color: #4f46e5; /* Indigo-600 */
        text-decoration: none;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        transition: background-color 0.2s;
      }

      .button:hover {
        background-color: #4338ca; /* Indigo-700 */
      }

      .footer {
        max-width: 600px;
        margin: 32px auto 0;
        text-align: center;
      }

      .footer-socials {
        margin-bottom: 16px;
      }

      .footer-socials a {
        display: inline-block;
        margin: 0 10px;
        opacity: 0.8;
        transition: opacity 0.2s;
      }

      .footer-socials a:hover {
        opacity: 1;
      }

      .footer-socials img {
        width: 24px;
        height: 24px;
      }

      .footer-text {
        font-size: 12px;
        color: #64748b; /* Slate-500 */
        line-height: 1.5;
      }

      .footer-text a {
        color: #4f46e5;
        text-decoration: none;
      }

      .footer-text a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="main-content">
        <div class="header">
          <h1 class="header-title">Upload Successful</h1>
        </div>
        <div class="content">
          <p>Hi there,</p>
          <p>Your file <strong class="filename">${filename}</strong> has been successfully uploaded to Cloudinary.</p>
          <p>You can view your file by clicking the button below:</p>
          <a href="${fileUrl}" class="button" target="_blank" rel="noopener noreferrer">
            View Your File
          </a>
          <p style="margin-top: 24px;">
            Thanks,<br>
            The FileUploader Team
          </p>
        </div>
      </div>
      
      <div class="footer">
        <div class="footer-socials">
          ${socials.map(social => `
            <a href="${social.href}" target="_blank" rel="noopener noreferrer" title="${social.alt}">
              <img src="${social.imgSrc}" alt="${social.alt}">
            </a>
          `).join('\n')}
        </div>
        <p class="footer-text">
          Connect with the creator, Chirag Tyagi.
        </p>
        <p class="footer-text">
          © ${currentYear} FileUploader Project. All rights reserved.<br>
          You are receiving this email as a confirmation of your file upload.
        </p>
      </div>
    </div>
  </body>
  </html>
  `;
};

module.exports = { fileUploadTemplate };
