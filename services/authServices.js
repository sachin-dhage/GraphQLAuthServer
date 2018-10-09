import userServices from "../services/userServices";
import blacklistServices from "../services/blacklistServices";


// resolver function for query
const loggedInUser = async (root, args, context, info) =>
{
    //console.log(`context : ${JSON.stringify(context)}`);

    let token = context.token;    
    //console.log(`token : ${token}`);
 
    // check whether token is blacklisted or not
    let blacklistedToken = await blacklistServices.isBlacklisted(token);    
    //console.log(`blacklistedToken : ${blacklistedToken}`);
    
    if(blacklistedToken)
        throw new Error("Unauthorized. Please login.");
    
    let email = await userServices.requestUser(token);
    //console.log(`email : ${email}`);

    let user = await userServices.userDetails({email});            
    
    return user;
}



// resolver function for mutation localSignup
const localSignUp = async (root, args, context, info) =>
{
    let token = await userServices.localUserRegistration(args);            
    return token;
}


// resolver function for mutation localLogin
const localLogin = async (root, args, context, info) =>
{
    let token = await userServices.localUserLogin(args);            
    return token;
}


// resolver function for mutation localLogout
const localLogout = async (root, args, context, info) =>
{
    //console.log(`context : ${JSON.stringify(context)}`);

    let token = context.token;
    //console.log(`token : ${token}`);

    // add the token to blacklist
    let blacklistedToken = await blacklistServices.blacklistToken(token);    

    if(blacklistedToken)
        return "Successfully Logged Out."
    else
        throw new Error("Error while logging out.");   
}


module.exports = {
    localSignUp,
    localLogin,
    localLogout,
    loggedInUser
}
