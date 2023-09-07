const mongoose=require("mongoose");
const Thought = require('../models/thoughts'); 
const Reaction = require("../models/reaction");
const User = require("../models/user");

const ThoughtsController= {
  async getAllThoughts(req, res) {
    try {
      const { userId } = req.params;
      const thoughts = await Thought.find({ user: userId });
  
  
      res.status(200).json(thoughts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  },

  async getThoughtById(req, res) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid thought ID' });
      }
  
      const thought = await Thought.findById(id);
  
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
  
      res.json(thought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  },
  
  async createThought(req, res) {
    try {
      const { userId, thoughtText, username } = req.body; 
  
      const thought = await Thought.create({ thoughtText, username }); 
  
      const userData = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
  
      if (!userData) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(201).json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  },
  


async updatedThought(req, res) {
  try {

    const updatedThought= await Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );


    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }


    res.status(200).json(updatedThought);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
},


async deleteThought(req, res) {
  try {
    const { thoughtId } = req.params;


    const deletedThought = await Thought.findOneAndDelete(thoughtId);


    if (!deletedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }


    res.status(200).json({ message: 'Thought deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }},

  async createReaction(req, res) {
    try {
      const { thoughtId } = req.params;
      const { reactionBody, username } = req.body;
  

      const thought = await Thought.findById(thoughtId);
  
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
  
  
      const newReaction = {
        reactionBody,
        username,
      };
  
    
      thought.reactions.push(newReaction);
  
   
      await thought.save();
  
      res.status(201).json(thought);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },
  async deleteReaction(req, res) {
    try {
      const { thoughtId, reactionId } = req.params;
  
   
      const thought = await Thought.findById(thoughtId);
  
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
  

      const reactionIndex = thought.reactions.findIndex(
        (reaction) => reaction._id.toString() === reactionId
      );
  
      if (reactionIndex === -1) {
        return res.status(404).json({ message: 'Reaction not found' });
      }
  
      thought.reactions.splice(reactionIndex, 1);
  
   
      
      await thought.save();
  
      res.status(200).json({ message: 'Reaction deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
  
  
};


module.exports = ThoughtsController;
