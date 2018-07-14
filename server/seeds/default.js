const bcrypt = require('bcrypt')
const BioModel = require('../models/bio')
const UserModel = require('../models/user')
const ProjectsModel = require('../models/projects')
const ServiceModel = require('../models/services')

async(() => {
//User seed 
const hashedPassword = await bcrypt.hash('rats', 10);

await UserModel.create({
    'email': 'kazeem.kadiri@gmail.com',
    'password': hashedPassword
})

//Bio seed
await BioModel.create([{
    'description': 'Random description',
    'header_bg_img': '<img src="blah" />',
    'about_me_img': '<img src="blah" />',
    'header_bg_img_text': 'Some random text',
    'phone_no': '9394024234',
    'email': 'kazeem.kadiri@gmail.com'
}])

await ProjectModel.create([{
    'title': 'Project 1',
    'description': 'Project description',
    'implementation_details': 'Built using Mern stack',
    'slides': []
}])

await ServiceModel.create([{
    'title': 'Service 1',
    'description': 'Service description',
    'service_img': '<img src= "sdff" />'
}])
 
})()

