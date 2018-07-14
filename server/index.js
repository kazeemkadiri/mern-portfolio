const GraphQlServer  =  require('graphql-yoga').GraphQLServer;
const typeDefs = require('./graphql-query-mutations').typeDefs;
const resolvers = require('./graphql-query-mutations').resolvers;
const mongoose = require('mongoose');
const mongooseDb = require('./config/app').mongoDb;
const fileUpload = require('express-fileupload')
const myFileUploadHandler = require('./helpers/general').myFileUploadHandler;


mongoose.connect(
    process.env.MONGODB_URI || mongooseDb, 
    (msg) => { console.log("Connected") }
);

const server = new GraphQlServer({ typeDefs, resolvers });

server.use(fileUpload())

server.use('/file-upload', myFileUploadHandler )

mongoose.connection.once(
    "open", 
    () => server.start( () => console.log("Server started") ) 
);
