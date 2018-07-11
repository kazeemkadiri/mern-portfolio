const mongoose = require('mongoose');

const ServiceSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    service_img: {
        type: String,
        required: true
    }

})

const Service = module.exports = mongoose.model('Services', ServiceSchema);
