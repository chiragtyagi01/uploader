const mongoose = require('mongoose');
const fileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true  
    },
    tags:{
        type: String
    },
    email:{
        type: String,
        required: true 
    }    
});

const File = mongoose.model('File', fileSchema);
module.exports =File;