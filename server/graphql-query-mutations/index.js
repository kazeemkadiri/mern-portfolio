// All models import
const bioModel = require('../models/bio');
const projectsModel = require('../models/projects');
const servicesModel = require('../models/services');
const userModel = require('../models/user');
const typeDefs = require('./typedefs');
const MailHelper = require('../helpers/Mail');
const MyUtil = require('../helpers/general');


const resolvers = {
    Query: {
        allPortfolioData: async () => {
            
            let portfolio = {
                bio: "",
                services: "",
                projects: ""
            }
            // const bioModelPromise = ;
            // const projectsModelPromise = ;

            const allPortfolioData = Promise.all([
                                            servicesModel.find(),
                                            bioModel.findOne({}),
                                            projectsModel.find({})
                                        ]);


            await allPortfolioData.then( documents => {

                portfolio.services = documents[0];
                portfolio.bio = documents[1];
                portfolio.projects = documents[2];
                
            }).catch(err => {
                
                // console.log(err);
                
                return err.toString();

            });
            
            return portfolio;

        },
        getBioData: async () => {

            const bio = await bioModel.findOne();

            // console.log(bio);

            return bio;
        },
        serviceData: async () => {

            const services = await servicesModel.find({});

            // console.log(services);

            return services;
        },
        projects: async () => {
            
            const projects = await projectsModel.find({})

            return projects
        }
    },
    Mutation: {
        addService: async (_, { title, description, service_img }) => {

            const service = new servicesModel({
                                title: title,
                                description: description,
                                service_img: service_img
                            });

            await service.save();

            return service;

        },
        addProject: async (_, { title, description, implementation_details }) => {

            const project = new projectsModel({
                title: title,
                description: description,
                implementation_details: implementation_details,
                slides: []
            })

            await project.save();

            return project;

        },
        updateProject: async (_, { id, title, description, implementation_details }) => {

            const project = await projectsModel.findOneAndUpdate(
                                    {_id: id}, 
                                    { $set:{
                                        title,
                                        description,
                                        implementation_details
                                        }
                                    },
                                    {
                                      new: true,
                                      upsert: false  
                                    })

            return project;

        },
        addProjectSlide: async(_, { projectId, title, description, image_path }) => {

           // console.log(projectId, title, description, image_path)

            const result =  await projectsModel.findByIdAndUpdate(
                                                    { _id: projectId },
                                                    {
                                                        $push: 
                                                        { slides: {
                                                            title,
                                                            description,
                                                            image_path
                                                        } 
                                                        }
                                                    },
                                                    {
                                                        new: true
                                                    })

            // console.log(result)

            return result.slides
        },
        deleteProjectSlide: async(_, { 
                                    title, 
                                    implemented_functionality, 
                                    image_path, 
                                    description, 
                                    projectId 
                            }) => {
                   

                                
                   const result = await projectsModel.findOneAndUpdate(
                                    {
                                        _id: projectId
                                    },
                                    {
                                        $pull: {
                                            slides: { 
                                                title, 
                                                implemented_functionality,
                                                image_path,
                                                description
                                            }
                                        }
                                    },
                                    {
                                        new: true
                                    }
                                )
                    
                    // console.log(result)
                    if(result){

                        MyUtil.deleteImages([MyUtil.getImageName(image_path)])

                    }
                    
                    
                    return result.slides

        },
        updateBio: async (_, {  id, 
                                description,
                                about_me_img, 
                                header_bg_img, 
                                header_bg_img_text,
                                phone_no,
                                email}) => {

                    const query = (id ? ({ _id: id }) : ({}));        

                    // Delete all former images using node
                    // Since only one document holds all bio information
                    const oldBio = await bioModel.find({});
                    
                    aboutMeImg = MyUtil.getImageName(oldBio.about_me_img)

                    headerBgImg = MyUtil.getImageName(oldBio.header_bg_img)

                    MyUtil.deleteImages([ aboutMeImg, headerBgImg ])

                    const bio = await bioModel.findOneAndUpdate(
                                                     query , 
                                                    {   
                                                        description,
                                                        about_me_img, 
                                                        header_bg_img, 
                                                        header_bg_img_text,
                                                        phone_no,
                                                        email
                                                    }, 
                                                    {
                                                        upsert: true,
                                                        returnNewDocument: true,
                                                        new: true
                                                    }
                                                );                

                    // console.log(bio);

                    return bio;
        },
        loginUser: async (_, { email, password }) => {

            //const hashedPassword = await MyUtil.hashPassword(password);

            const user = await userModel.findOne({ email: email });

            // const match = await require('bcrypt').compare(password, user.password);

            const match = true
            
            return {userExists: (match ? true : false)}

        },
        resetPassword: async (_, { email }) => {

            const user = await userModel.findOne({ email: email });

            if(user === null){
                return { emailExists: false, mailStatus: false }
            }

            const response = await MailHelper.sendResetMailPassword( email );


            if( response.hasOwnProperty('accepted') && response.accepted.length >= 0 )
            return { emailExists: true, mailStatus: true }


            return { emailExists: false, mailStatus: false };
            
        },
        confirmPasswordResetToken: async (_, { token }) => {

            const user = await userModel.findOne({ token: token });

            return (user !== null ? {userId: user._id} : {userId: null});

        },
        newPasswordUpdate: async(_, { userId, password } ) => {

            const hashedPassword = await MyUtil.hashPassword(password);

            const result = await userModel.findOneAndUpdate({ _id: userId }, {$set: { password:  hashedPassword, token: ''}});

            return { updateStatus: (result !== null ? true: false)   };

        }

    }
}

module.exports.typeDefs = typeDefs;

module.exports.resolvers = resolvers;