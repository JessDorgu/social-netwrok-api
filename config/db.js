const mongoose = require ("mongoose");

const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialnetworkDB';

mongoose.connect(connectionString);

const connectDB = mongoose.connection;

module.exports = connectDB;