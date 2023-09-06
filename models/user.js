// const mongoose = require('mongoose');


// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     unique: true,
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     match: [/.+@.+\..+/, 'Please enter a valid email address'],
//   },
//   thoughts: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Thought',
//     },
//   ],
//   friends: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//     },
//   ],
// });


// userSchema.virtual('friendCount').get(function () {
//   return this.friends.length;
// });


// const User = mongoose.model('User', userSchema);


// module.exports = User;

const { Schema, model } = require("mongoose");

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: "thoughts" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("friendcount").get(function () {
  return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;
