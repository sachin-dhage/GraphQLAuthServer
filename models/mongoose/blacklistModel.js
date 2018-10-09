//Import the mongoose module
import mongoose from 'mongoose';


// Get Schema instance
const Schema = mongoose.Schema;


// Define the schema
const BlacklistSchema = new Schema({
    token    :   { type: String}
});


// Export model
const blacklist = mongoose.model('Blacklist', BlacklistSchema, 'Blacklist');
module.exports = blacklist;
