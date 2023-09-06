const mongoose=require("mongoose");
const Thought = require('../models/thoughts'); 
const Reaction = require("../models/reaction");

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
  
      // Validate thoughtId as a valid ObjectId
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
 async createThought (req, res) {
  try {
    const { userId } = req.params;
    const { content } = req.body;


    const thought = new Thought({ content, user: userId });
    await thought.save();


    res.status(201).json(thought);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Here is the prob' });
  }
},



async updatedThought(req, res) {
  try {
    const { thoughtId } = req.params;
    const { content } = req.body;


    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { content },
      { new: true }
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


    const deletedThought = await Thought.findByIdAndRemove(thoughtId);


    if (!deletedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }


    res.status(200).json({ message: 'Thought deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }},

async createReaction (req,res) {
  try {
    const {thoughtId} = req.params;
    const {reactionBody, username} = req.body;
    const thought = await Thought.findById(thoughtId);
    if(!thought){ return res.status(404).json(error);
    }
  
  const reaction = new Reaction ({reactionBody, username});
  
  thought.reactions.push(reaction);
  await thought.save();
  await reaction.save();
  

  res.status(201).json(thought);
}catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
},

async deleteReaction (req,res){
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
}

module.exports = ThoughtsController;
