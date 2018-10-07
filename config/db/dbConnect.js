//Import the mongoose module
import mongoose from 'mongoose';


//Set up default mongoose connection
//var mongoDB_URI = 'mongodb+srv://itss:itss1234@cluster0-4uuqd.mongodb.net/test';           // New host

var mongoDB_URI = 'mongodb://algorithmus:algorithmus1234@ds125293.mlab.com:25293/authdb';           // Remote host
//var mongoDB_URI = 'mongodb://localhost/algorithmus';           // Local host


// Connect to database
mongoose.connect(mongoDB_URI, { useNewUrlParser: true });


// Use global promise
mongoose.Promise = global.Promise;


// Get the default connection
var dbConnection = mongoose.connection;


//Bind connection to error event (to get notification of connection errors)
dbConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));


console.log('Connetced to ' + mongoDB_URI);


// Export db connection
module.exports = dbConnection;
