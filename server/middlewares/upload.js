const multer = require('multer');
const path = require('path');
const { all } = require('../routes/FileUploadRoute');

// --- Common Storage Config ---
// Both images and videos can use the same temporary storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// --- Image-Specific Config ---
const imageFileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Unsupported file type! Only JPEG, PNG, or JPG are allowed.'), false); // Reject file
  }
};

const imageLimits = { fileSize: 5 * 1024 * 1024 }; // 5MB limit for images

// --- Video-Specific Config ---
const videoFileFilter = (req, file, cb) => {
  const allowed = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/webm'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Unsupported file type! Only MP4, MPEG, MOV, or WEBM are allowed.'), false); // Reject file
  }
};

const videoLimits = { fileSize: 50 * 1024 * 1024 }; // 50MB limit for videos
// --- Local File Upload Congig ---
const localFileFilter = (req, file, cb) =>{
  const allowed = [
    'image/jpeg', 'image/png', 'image/jpg',
    'video/mp4', 'video/mpeg', 'video/quicktime', 'video/webm' 
  ];
  if(allowed.includes(file.mimetype)){
    cb(null, true); // accept file
  }else{
    cb(new Error('Unsupported file type! Only JPEG, PNG, JPG, MP4, MPEG, MOV, or WEBM are allowed.'), false); // reject file
  }
};
const localLimits = { fileSize: 50 * 1024 * 1024 }; // 50MB limit for local uploads

// --- Export Separate Multer Instances ---
const uploadImage = multer({
  storage: storage,
  fileFilter: imageFileFilter,
  limits: imageLimits
});

const uploadVideo = multer({
  storage: storage,
  fileFilter: videoFileFilter,
  limits: videoLimits
});

const uploadLocalFile = multer({
  storage: storage,
  fileFilter: localFileFilter,
  limits: localLimits
})

module.exports = { uploadImage, uploadVideo, uploadLocalFile };