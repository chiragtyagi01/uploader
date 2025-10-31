const fileUploadTemplate = (filename, fileUrl) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; }
      .container { width: 90%; margin: auto; padding: 20px; }
      .header { font-size: 24px; color: #333; }
      .content { margin-top: 20px; }
      .button {
        display: inline-block;
        padding: 10px 20px;
        margin: 20px 0;
        background-color: #007bff;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
      }
      .button:hover { background-color: #0056b3; }
      .footer { margin-top: 30px; font-size: 12px; color: #888; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">File Uploaded Successfully!</div>
      <div class="content">
        <p>Hi there,</p>
        <p>Your file <strong>${filename}</strong> has been successfully uploaded to Cloudinary.</p>
        <p>You can view your file by clicking the button below:</p>
        <a href="${fileUrl}" class="button" target="_blank">View Your File</a>
        <p>Thank you for using our service!</p>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Uplaod. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;
};

module.exports = { fileUploadTemplate };