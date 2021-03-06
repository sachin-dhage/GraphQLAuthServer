// Import section
import express from 'express';
import { ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";

var https = require("https");
setInterval(function() {
    https.get("https://graphqlauthserver.herokuapp.com/authserver");
}, 1200000); // every 5 minutes (300000)

// Import GraphQL types
import graphQLTypes from './graphql/types';

// Import GraphQL resolvers
import graphQLResolvers from './graphql/resolvers';

//console.log(graphQLTypes);

// Set the port number
//const PORT = 5555;
const PORT = {port : process.env.PORT || 3402};


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
    introspection: true,
    playground: true,
    context: async ({ req }) => {
        // get the user token from the headers
        const token = req.headers.authorization || '';
       
        // add the token to the context
        return { token };

    }
});


graphQLServer.applyMiddleware({
    app: webServer, 
    path:PATH
});


webServer.listen(PORT, () => {
    console.log(`GraphQL Server is now running on http://localhost:${PORT.port}${PATH}`);
    console.log(`Go to http://localhost:${PORT.port}${PATH} to run queries!`);
    console.log('------------------------------------------------------');
  });
