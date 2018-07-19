const path = require('path')
const cors = require('cors');
const GraphQlServer  =  require('graphql-yoga').GraphQLServer;
const typeDefs = require('./graphql-query-mutations').typeDefs;
const resolvers = require('./graphql-query-mutations').resolvers;
const mongoose = require('mongoose');
const mongoDBUrl = require('./config/app').mongoDb;
const fileUpload = require('express-fileupload')
const myFileUploadHandler = require('./helpers/general').myFileUploadHandler;

const server = new GraphQlServer({ typeDefs, resolvers });

const express = server.express

const NODE_PRODUCTION_ENV = express.get('env')  === 'production'

const mongoUrl = NODE_PRODUCTION_ENV ? mongoDBUrl.remote : mongoDBUrl.local

mongoose.connect(
    mongoUrl, 
    (msg) => { console.log("Connected") }
);



if( NODE_PRODUCTION_ENV ){

    const staticPath = path.resolve(__dirname, 'build')

    express.use('/', require('express').static(staticPath))

    express.get('/', (req, res) => {

        res.sendFile(path.resolve(staticPath,"index.html"))

    })
    
}

express.NODE_PRODUCTION_ENV = NODE_PRODUCTION_ENV

express.use(cors())

express.use(fileUpload())

express.use('/file-upload', myFileUploadHandler )

const port = !NODE_PRODUCTION_ENV ? ({ port: 4000 }) : ({})

mongoose.connection.once(
    "open", 
    () => server.start({ ...port, endpoint: "/graphql" }, () => console.log("Server started")  ) 
);

