module.exports = `
    type Query {
        allPortfolioData: Portfolio,
        serviceData: [ Service! ],
        getBioData: Bio,
        projects: [ Project ]
    }

    type Mutation {
        addService(
            title: String!, 
            description: String!, 
            service_img: String!
        ): Service

        updateService(
            id: ID!,
            title: String!,
            description: String!,
            service_img: String!,
            old_service_img: String 
        ): Service

        addProject(
            title: String!, 
            description: String!, 
            implementation_details: String!
         ): Project!

        updateProject(
            id: ID!, 
            title: String!, 
            description: String!, 
            implementation_details: String! 
        ): Project!

        updateBio ( 
            id: ID, 
            description: String!, 
            about_me_img: String!, 
            header_bg_img: String!, 
            header_bg_img_text: String!, 
            phone_no: String!, 
            email: String!
        ): Bio!

        loginUser(email: String!, password: String!): UserExists!
        
        resetPassword(email: String!): ResetMailStatus!
        
        confirmPasswordResetToken(token: String!): UserId!
        
        newPasswordUpdate(userId: ID!, password: String!): StatusNotification!
        
        addProjectSlide(projectId: ID!, title: String!, description: String!, image_path: String!): [Slide]
        
        updateProjectSlide(
            projectId: ID!, 
            oldSlide: String, 
            editingSlideIndex: Int, 
            title: String!, 
            description: String!, 
            image_path: String!
        ): [Slide]

        deleteProjectSlide(
            title: String!, 
            implemented_functionality: String, 
            image_path: String!, 
            description: String!, 
            projectId: String!
        ): [Slide]
        
    }

    type UserId{
        userId: ID
    }

    type StatusNotification{
        updateStatus: Boolean!
    }

    type ResetMailStatus{
        emailExists: Boolean!,
        mailStatus: Boolean!
    }

    type UserExists{
        userExists: Boolean!
    }

    type Portfolio {
        bio: Bio,
        projects: [ Project ],
        services: [ Service ]!
    }

    type Bio {
        id: ID,
        description: String,
        about_me_img: String,
        header_bg_img: String,
        header_bg_img_text: String,
        phone_no: String,
        email: String
    }

    type Service {
        id: ID,
        title: String,
        description: String,
        service_img: String
    }

    type Project {
        id: ID!,
        title: String!,
        description: String!,
        implementation_details: String!,
        slides: [ Slide ]
    }

    type Slide {
        title: String,
        implemented_functionality: String,
        image_path: String,
        description: String
    }
    `;
