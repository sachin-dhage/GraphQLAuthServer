import userServices from "../services/userServices";

// resolver function for query
const loggedInUser = async (root, args, context, info) =>
{
    //console.log(`context : ${JSON.stringify(context)}`);
    let token = context.token;

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



module.exports = {
    localSignUp,
    localLogin,
    loggedInUser
}
