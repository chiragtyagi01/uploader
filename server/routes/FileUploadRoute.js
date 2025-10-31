const express = require('express');
const router = express.Router();

// Import *both* middleware instances
const { uploadImage, uploadVideo, uploadLocalFile, } = require('../middlewares/upload'); 

// Import *both* controllers
const {
  imageUpload,
  videoUpload,
  localUpload,
  compressedImageUpload
} = require('../controllers/fileUpload');

// Test route
router.get('/test', (req, res) => {
  res.send("Upload route working!");
});

// --- Image Route ---
// Uses 'uploadImage' middleware, 'image' key, and 'imageUpload' controller
router.post('/imageupload', uploadImage.single('image'), imageUpload);

// --- Video Route ---
// Uses 'uploadVideo' middleware, 'video' key, and 'videoUpload' controller
router.post('/videoupload', uploadVideo.single('video'), videoUpload);

// --- Local File Upload Route ---
// Uses 'uploadLocalFile' middleware, 'file' key, and 'localUpload' controller
router.post('/localupload', uploadLocalFile.single('file'), localUpload);

// --- Compressed Image Upload Route ---
// Uses 'uploadImage' middleware, 'image' key, and 'compressedImageUpload' controller
router.post('/compressedimageupload', uploadImage.single('image'), compressedImageUpload);

module.exports = router;