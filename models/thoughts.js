const mongoose = require('mongoose');
const Reaction =require("./reaction");


const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => new Date(timestamp).toISOString(),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reaction', // Provide the model name 'Reaction' as a string
    },
  ],},
  {toJSON:{
    getters:true,
    virtuals:true,
  },
id:false,
}
);


thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});


const Thought = mongoose.model('Thought', thoughtSchema);


module.exports = Thought;

// const { Schema, model, Types } = require("mongoose");
// const moment = require('moment')

// // Schema to create reaction model
// const reactionSchema = new Schema(
//   {
//     reactionId: {
//       type: Schema.Types.ObjectId,
//       default: () => new Types.ObjectId(),
//     },
//     reactionBody: {
//       type: String,
//       required: true,
//       maxlength: 280,
//     },
//     username: {
//       type: String,
//       required: true,
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//       get: (createdAtVal) =>
//         moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
//     },
//   },
//   {
//     toJSON: {
//       getters: true,
//     },
//     id: false,
//   }
// );

// // Schema to create thoughts model
// const thoughtsSchema = new Schema(
//   {
//     thoughtText: {
//       type: String,
//       required: true,
//       maxlength: 280,
//       minlength: 1,
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//     username: {
//       type: String,
//       required: true,
//     },
//     reactions: [reactionSchema],
//   },
//   {
//     toJSON: {
//       getters: true,
//       virtuals: true,
//     },
//     id: false,
//   }
// );

// thoughtsSchema.virtual("reactionCount").get(function () {
//   return this.reactions.length;
// });

// const Thoughts = model("thoughts", thoughtsSchema);
// const Reaction = model;

// module.exports = Thoughts;
