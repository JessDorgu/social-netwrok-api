const mongoose = require('mongoose');
const connectDB =require("../config/db");
const User = require("../models/index"
);
const Thought = require('../models/thoughts');


connectDB.once("open", async () => {
    console.log("DB is connected");

try{ 
     // Define seed data
     const userSeedData = [
      { username: 'Angel', email: 'angel@gmail.com' },
      { username: 'Blake', email: 'black@gmail.com' },
      { username: 'Clay', email: 'clay@gmail.com' },
      { username: 'Demi', email: 'demi@gmail.com' },
      { username: 'Ebi', email: 'ebi@gmail.com' },
    ];
  
  
    const thoughtSeeds = [
      { thoughtText: 'Today is Saturday', username: 'Angel' },
      { thoughtText: 'I want to go shopping', username: 'Angel' },
      { thoughtText: 'Today is Sunday', username: 'Blake' },
      { thoughtText: 'I need to go to church', username: 'Blake' },
      { thoughtText: 'Today is Monday', username: 'Clay' },
      { thoughtText: 'I hate Mondays', username: 'Clay' },
      { thoughtText: 'Today is Tuesday', username: 'Demi' },
      { thoughtText: 'I have basketball practice', username: 'Demi' },
      { thoughtText: 'Today is Wednesday', username: 'Ebi' },
      { thoughtText: 'The weekend is not close enough', username: 'Ebi' },
    ];


  // Insert seed data into the "users" collection
 const users = await User.insertMany(userSeedData);



    // Insert seed data into the "thoughts" collection
   const thoughts = await Thought.insertMany(thoughtSeeds);
        console.log(`${thoughts.length} thoughts seeded successfully.`);
}finally{


      // Close the MongoDB connection when seeding is complete
      mongoose.connection.close();
    }
});

