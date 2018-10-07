// Import section
import express from 'express';
import { ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";


// Import GraphQL types
import graphQLTypes from './graphql/types';

// Import GraphQL resolvers
import graphQLResolvers from './graphql/resolvers';

//console.log(graphQLTypes);

// Set the port number
const PORT = 5555;

// Set the end point 
const PATH = "/authserver";

// Initialize the web server
const webServer = express();


// add and configure body-parser middleware
webServer.use(bodyParser.urlencoded({extended : true}));
webServer.use(bodyParser.json());



// Initialize the graphql server
const graphQLServer = new ApolloServer({
    typeDefs : graphQLTypes,
    resolvers : graphQLResolvers,
    context : ()=>({req, res})
    //introspection: true,
    //playground: true
    
});


graphQLServer.applyMiddleware({
    app: webServer, 
    path:PATH
});

webServer.listen({port : process.env.PORT || PORT}, () => {
    console.log(`GraphQL Server is now running on http://localhost:${PORT}${PATH}`);
    console.log(`Go to http://localhost:${PORT}${PATH} to run queries!`);
    console.log('------------------------------------------------------');
  });
