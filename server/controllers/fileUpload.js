const File = require('../models/File');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const mailSender = require('../utils/nodemailSender');
const { fileUploadTemplate } = require('../utils/emailTemplate');

// Helper function (no changes)
async function uploadToCloudinary(filePath, folder, quality) {
  const options = { folder };
  options.resource_type = "auto";
    if (quality) {
    options.transformation = [{ quality: quality }];
  }

  return await cloudinary.uploader.upload(filePath, options);
}

// --- Controller for Images ---
exports.imageUpload = async (req, res) => {
  try {
    const file = req.file;
    const { email, tags } = req.body;

    if (!file) {
      return res.status(400).json({ success: false, message: 'No image file was uploaded.' });
    }
    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required.'});
    }

    const folderName = process.env.CLOUDINARY_FOLDER_NAME || "file-uploads";
    const response = await uploadToCloudinary(file.path, folderName);

    fs.unlinkSync(file.path); // Delete temp file

    const newFile = await File.create({
      filename: file.originalname,
      url: response.secure_url,
      tags: tags,
      email: email,
    });

    // Send confirmation email
    try {
      const subject = "Your Image Upload was Successful!";
      const htmlContent = fileUploadTemplate(newFile.filename, newFile.url);
      
      await mailSender(newFile.email, subject, htmlContent);
      console.log("Confirmation email sent to:", newFile.email);
    } catch (mailError) {
      // Do not fail the main request if email fails, just log it
      console.error("Failed to send confirmation email after upload:", mailError);
    }

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully!',
      data: newFile,
    });

  } catch (error) {
    console.error("Error during image upload:", error);
    if (req.file && req.file.path) { fs.unlinkSync(req.file.path); } // Clean up temp file on error
    res.status(500).json({
      success: false,
      message: 'Server error during image upload.',
      error: error.message,
    });
  }
};

// --- Controller for Videos ---
exports.videoUpload = async (req, res) => {
  try {
    const file = req.file;
    const { email, tags } = req.body;

    if (!file) {
      return res.status(400).json({ success: false, message: 'No video file was uploaded.' });
    }
    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required.'});
    }

    const folderName = process.env.CLOUDINARY_FOLDER_NAME || "file-uploads";
    const response = await uploadToCloudinary(file.path, folderName);

    fs.unlinkSync(file.path); // Delete temp file

    const newFile = await File.create({
      filename: file.originalname,
      url: response.secure_url,
      tags: tags,
      email: email,
    });

    // Send confirmation email

    try {
      const subject = "Your Video Upload was Successful!";
      const htmlContent = fileUploadTemplate(newFile.filename, newFile.url);
      
      await mailSender(newFile.email, subject, htmlContent);
      console.log("Confirmation email sent to:", newFile.email);
    } catch (mailError) {
      // Do not fail the main request if email fails, just log it
      console.error("Failed to send confirmation email after upload:", mailError);
    }

    res.status(200).json({
      success: true,
      message: 'Video uploaded successfully!',
      data: newFile,
    });

  } catch (error) {
    console.error("Error during video upload:", error);
    if (req.file && req.file.path) { fs.unlinkSync(req.file.path); } // Clean up temp file on error
    res.status(500).json({
      success: false,
      message: 'Server error during video upload.',
      error: error.message,
    });
  }
};
// --- Controller for local server upload ---
exports.localUpload = async (req, res) =>{
    try {
        const file=req.file;
        const {email,tags}=req.body;
        if(!file){
            return res.status(400).json({success:false, message:'No file uploaded'});
        }
        if(!email){
            return res.status(400).json({success:false, message:'Email is required'});
        }

        const filePath = `/uploads/${file.filename}`;
        
        const newFile=await File.create({
            filename:file.originalname,
            url:filePath,
            tags:tags,
            email:email,
        });
        res.status(200).json({
            success:true,
            message:`File uploaded successfully to local server -> ${filePath}`,
            data:newFile,
        });

    } catch (error) {
        console.error("Error during local upload:", error);
        res.status(500).json({
            success: false,
            message: 'Server error during local file upload.',
            error: error.message,
        });
    }
}
// --- controller for image compression upload ---
exports.compressedImageUpload = async (req, res) => {
    try {
        const file = req.file;
        const { email, tags } = req.body;

        if (!file) {
            return res.status(400).json({ success: false, message: 'No image file was uploaded.' });
        }
        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required.'});
        }

        const folderName = process.env.CLOUDINARY_FOLDER_NAME || "file-uploads";
        const quality = 70; // Compression quality
        const response = await uploadToCloudinary(file.path, folderName, quality);

        fs.unlinkSync(file.path); // Delete temp file

        const newFile = await File.create({
            filename: file.originalname,
            url: response.secure_url,
            tags: tags,
            email: email,
        });

        // Send confirmation email
        try {
            const subject = "Your Image Upload was Successful!";
            const htmlContent = fileUploadTemplate(newFile.filename, newFile.url);
      
            await mailSender(newFile.email, subject, htmlContent);
            console.log("Confirmation email sent to:", newFile.email);
        } catch (mailError) {
            // Do not fail the main request if email fails, just log it
            console.error("Failed to send confirmation email after upload:", mailError);
        }
        res.status(200).json({
            success: true,
            message: 'Image uploaded successfully!',
            data: newFile,
        });
    } catch (error) {
        console.error("Error during compressed file upload:", error);
        res.status(500).json({
            success: false,
            message: 'Server error during compressed file upload.',
            error: error.message,
        });
    }
}