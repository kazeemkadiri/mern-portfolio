module.exports = `
    type Query {
        allPortfolioData: Portfolio,
        serviceData: [ Service! ],
        getBioData: Bio!
    }

    type Mutation {
        addService(title: String!, description: String!, service_img: String!): Service
        addProject(title: String!, description: String!, implementation_details: String! ): Project!
        updateBio ( id: String!, description: String!, about_me_img: String!, header_bg_img: String!, header_bg_img_text: String!, phone_no: String!, email: String!): Bio!
        loginUser(email: String!, password: String!): UserExists!
        resetPassword(email: String!): ResetMailStatus!
        confirmPasswordResetToken(token: String!): UserId!
        newPasswordUpdate(userId: String!, password: String!): StatusNotification!
    }

    type UserId{
        userId: String
    }

    type StatusNotification{
        operationStatus: Boolean!
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
        id: String,
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
        image_path: String
    }
    `;
