const mongoose = require('mongoose');

const BioSchema = mongoose.Schema({
    
    description: {
        type: String,
        required: true
    },
    about_me_img: {
        type: String,
        required: true
    },
    header_bg_img: {
        type: String,
        required: true
    },
    header_bg_img_text: {
        type: String,
        required: true
    },
    phone_no: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
    
})

const Bio = module.exports = mongoose.model("bios", BioSchema);