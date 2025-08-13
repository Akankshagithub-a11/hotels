const mongoose = require('mongoose');
require('dotenv').config();
//Define the MongoDB connection URL

//const mongoURL = 'mongodb://localhost:27017/hotels'

const mongoURL=process.env.MONGODB_URL;
// Set up Mongoose connection

mongoose.connect(mongoURL)

//Get the default connection
//Mongoose maintains a default connection object representing the MongoDB connection 

const db= mongoose.connection;

// Define event listeners for database connection 
db.on('connected',()=>{
  console.log('Connected to MongoDB server');
});

db.on('error',(err)=>{
  console.log('MongoDB connection errors',err);
});

db.on('disconnected',()=>{
  console.log('MongoDB disconnected')
});

module.exports = db;
