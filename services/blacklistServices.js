import { blacklistModel } from "../models/mongoose";
import connection from "../config/db/dbConnect";
import jwt from 'jsonwebtoken';
import {APP_SECRET} from '../config/util';

// function for blacklisting token
const blacklistToken = async (token) => 
{
    try 
    {

        if (token) 
        {
            token = token.replace('Bearer', '');
            token = token.trim();
            jwt.verify(token, APP_SECRET);
        }
        else
            throw new Error('Not authenticated');    


        // search criteria
        let conditions = {
            "token" : token
        };

        // check to see if token is already blacklisted
        let existingToekn = await blacklistModel.findOne(conditions);

        if(existingToekn)
            return existingToekn;

        // blacklist toekn
        let blacklisted = await new blacklistModel({token}).save();

        return blacklisted;
    } 
    catch (error) 
    {
        throw error;
    }
}



// function to check blacklisted token
const isBlacklisted = async (token) => 
{
    try 
    {
        if (token) 
        {
            token = token.replace('Bearer', '');
            token = token.trim();
            jwt.verify(token, APP_SECRET);
        }
        else
            throw new Error('Not authenticated');    


        // search criteria
        let conditions = {
            "token" : token
        };

        // check to see if token is already blacklisted
        let blacklistedToekn = await blacklistModel.findOne(conditions);

        return blacklistedToekn;
    } 
    catch (error) 
    {
        throw error;
    }
}


module.exports = {
    isBlacklisted,
    blacklistToken
}