const path = require('path')
const cors = require('cors');
const GraphQlServer  =  require('graphql-yoga').GraphQLServer;
const typeDefs = require('./graphql-query-mutations').typeDefs;
const resolvers = require('./graphql-query-mutations').resolvers;
const mongoose = require('mongoose');
const mongooseDb = require('./config/app').mongoDb;
const fileUpload = require('express-fileupload')
const myFileUploadHandler = require('./helpers/general').myFileUploadHandler;

mongoose.connect(
    mongooseDb, 
    (msg) => { console.log("Connected") }
);

const server = new GraphQlServer({ typeDefs, resolvers });

const express = server.express

if(express.get('env') === 'production'){

    const staticPath = path.resolve(__dirname, 'build')

    console.log('production')

    express.use(express.static(staticPath))

    express.get('/', (req, res) => {

        res.sendFile(path.resolve(staticPath,"index.html"))

    })
    
}

express.use(cors())

express.use(fileUpload())

express.use('/file-upload', myFileUploadHandler )

mongoose.connection.once(
    "open", 
    () => server.start({port: 4000}, () => console.log("Server started")  ) 
);

