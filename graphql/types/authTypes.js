import { gql } from "apollo-server";


const typeDefs = gql`

    type User
    {
        firstname   : String,
        lastname    : String,
        email       : String
    }

    type Query
    {
        loggedInUser : User 
    }

    type Mutation
    {
        # Register user locally
        localSignUp(
            firstname   : String!,
            lastname    : String,
            email       : String!,
            password    : String!
        ) : String

        # Login user locally
        localLogin(
            email       : String!,
            password    : String!
        ) : String
    }
`;


// Export typeDefs
module.exports = typeDefs;