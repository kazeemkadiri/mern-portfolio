const bcrypt = require('bcrypt')
const BioModel = require('../models/bio')
const UserModel = require('../models/user')
const ProjectModel = require('../models/projects')
const ServiceModel = require('../models/services')



//User seed 
const hashPassword = async () => await bcrypt.hash('rats', 10);

const hashedPassword = hashPassword();

UserModel.create({
    'email': 'kazeem.kadiri@gmail.com',
    'password': hashedPassword
})

//Bio seed
BioModel.create([{
    'description': 'Random description',
    'header_bg_img': '<img src="blah" />',
    'about_me_img': '<img src="blah" />',
    'header_bg_img_text': 'Some random text',
    'phone_no': '9394024234',
    'email': 'kazeem.kadiri@gmail.com'
}])

ProjectModel.create([{
    'title': 'Project 1',
    'description': 'Project description',
    'implementation_details': 'Built using Mern stack',
    'slides': []
}])

ServiceModel.create([{
    'title': 'Service 1',
    'description': 'Service description',
    'service_img': '<img src= "sdff" />'
}])
 

