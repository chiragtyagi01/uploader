//app create
const express = require('express');
const app = express();
const cors = require('cors'); // <-- 1. IMPORT THE PACKAGE
const path = require('path');

// find port
require('dotenv').config();
const PORT = process.env.PORT || 3000;

//cors options
cors_options = {
    origin: process.env.APP_URL , // <-- specify allowed origin(s)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // <-- specify allowed methods   
};

// add middleware
app.use(express.json());
app.use(cors(cors_options)); // <-- 2. USE THE CORS MIDDLEWARE
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

// db connection
const db = require('./config/database');
db.connect();

// cloudinary connection
const {cloudinaryConnect} = require('./config/cloudinary');
cloudinaryConnect();

// mount api route
const uploadRoute = require('./routes/FileUploadRoute');
app.use('/api/v1', uploadRoute);

// activate server
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})