import {userModel} from "../models/mongoose";
import connection from "../config/db/dbConnect";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import {APP_SECRET} from '../config/util';

// function for registering user locally
const localUserRegistration = async (user) => 
{
    try 
    {        
        // search criteria
        let conditions = {
            "email" : user.email
        };

        // check to see if there is already an user with that email
        let existingUser = await userModel.findOne(conditions);

        if(existingUser)
            throw new Error("This email is already taken.");

        // encrypt the password
        let passwordHash = await bcrypt.hash(user.password, 12);
        user.password = passwordHash;

        // create user
        let newUser = await new userModel(user).save();

        // create the jwt
        let token = jwt.sign({ email: user.email }, APP_SECRET, { expiresIn : "1d"});

        return token;
    } 
    catch (error) 
    {
        throw error;        
    }

}


// function for logging in user locally
const localUserLogin = async (user) => 
{
    try 
    {
        // search criteria
        let conditions = {
            "email" : user.email
        };
        
        let existingUser = await userModel.findOne(conditions);
        //console.log("user => "); console.log(user);        

        if (!existingUser) {
            //console.log(`User Not Found with email id ${user.email}`);
            throw new Error('Incorrect email id.');
        }

        let passwordMatches = await isValidPassword(existingUser.password, user.password) ;
        
        if(!passwordMatches){
            //console.log('Incorrect Password');
            throw new Error('Incorrect password.');
        }

        // User and password both match, return user
       // return existingUser;

        // create the jwt
        let token = jwt.sign({ email: user.email }, APP_SECRET, { expiresIn : "1d"});

        return token;

    } catch (error) {
        throw error;        
    }   

}


// checking if password is valid
const isValidPassword = async (savedPassword, inputPassword) => 
{
    //console.log(`savedPassword : ${savedPassword}`);
    //console.log(`inputPassword : ${inputPassword}`);
    
    let match =  await bcrypt.compare(inputPassword, savedPassword);
    //console.log(`Password Match : ${match}`);

    return match;
    
};


// Checking if user id is valid
const requestUser = async (token) =>
{
    if (token) 
    {
      token = token.replace('Bearer', '');
      token = token.trim();
      let { email } = jwt.verify(token, APP_SECRET);
      return email;
    }
  
    throw new Error('Not authenticated');
}
  

// function for logging in user locally
const userDetails = async (user) => 
{
    try 
    {
        // search criteria
        let conditions = {
            "email" : user.email
        };
        
        let existingUser = await userModel.findOne(conditions);
        //console.log("user => "); console.log(user);        

        if (!existingUser) {
            //console.log(`User Not Found with email id ${user.email}`);
            throw new Error('Incorrect email id.');
        }

        // User and password both match, return user
       return existingUser;


    } catch (error) {
        throw error;        
    }   

}


module.exports = {
    localUserRegistration,
    localUserLogin,
    requestUser,
    userDetails
}