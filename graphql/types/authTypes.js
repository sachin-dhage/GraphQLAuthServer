import { gql } from "apollo-server";


const typeDefs = gql`

    type User
    {
        email       : String!,
        password    : String!
    }

    type Query
    {
        loggedInUser : User 
    }

    type Mutation
    {
        localSignUp(
            email       : String!,
            password    : String!
        ) : String


        localLogin(
            email       : String!,
            password    : String!
        ) : String
    }
`;


// Export typeDefs
module.exports = typeDefs;