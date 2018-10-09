//Import the mongoose module
import mongoose from 'mongoose';


// Get Schema instance
const Schema = mongoose.Schema;


// Define the schema
const UserSchema = new Schema({
    firstname    :   { type: String, max : 100},
    lastname     :   { type: String, max : 100},
    email        :   { type: String, max : 100},
    password     :   { type: String, max : 500},
    mobileno     :   { type: String, max : 10}
});



// Export model
const users = mongoose.model('Users', UserSchema, 'Users');
module.exports = users;
