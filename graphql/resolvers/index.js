import { merge } from "lodash";

//Importing resolvers
import authResolvers from './authResolvers';

// Merge all of the resolver objects together
const resolvers = merge(
    authResolvers
);

// Export merged resolvers
module.exports = resolvers;