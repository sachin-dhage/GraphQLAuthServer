import { mergeTypes } from "merge-graphql-schemas";

// Importing types
import authTypes from './authTypes';


// Merge all of the types together
const types = [
    authTypes
];
  
// NOTE: 2nd param is optional, and defaults to false
// Only use if you have defined the same type multiple times in
// different files and wish to attempt merging them together.
const typeDefs =  mergeTypes(types, { all: true });


module.exports = typeDefs;
