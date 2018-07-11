const mongoose = require('mongoose');

const slide = {
    title: {
        type: String,
        required: true
    },
    implemented_functionality: {
        type: String,
        required: true
    },
    image_path: {
        type: String,
        required: true
    }
}

const ProjectsSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    implementation_details: {
        type: String,
        required: true
    },
    slides: [slide]

})

const Projects = module.exports = mongoose.model('Projects', ProjectsSchema);