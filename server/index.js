const GraphQlServer  =  require('graphql-yoga').GraphQLServer;
const typeDefs = require('./graphql-query-mutations').typeDefs;
const resolvers = require('./graphql-query-mutations').resolvers;
const mongoose = require('mongoose');
const mongooseDb = require('./config/app').mongoDb;


mongoose.connect(mongooseDb, (msg) => { console.log("Connected", msg) });

const server = new GraphQlServer({ typeDefs, resolvers });

mongoose.connection.once("open", () => server.start( () => console.log("Server started") ) );
