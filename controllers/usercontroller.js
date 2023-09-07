const User = require("../models/user");


const UserController = {
async getAllUsers (req,res) {
    try{
        const users =await User.find();
        res.json(users);
    } catch(error){
        res.status(500).json(error);
    }
},
  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id)
        .populate('thoughts')
        .populate('friends')
        .select('-__v');
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async createUser(req, res) {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json(error);
  }
},

async updateUser(req,res) {
  try {
    const userData = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!userData) {
      res.status(404).json({ message: 'No user with this id!' });
      return
    }

    res.json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
},

async deleteUser(req, res) {
  try {
      const userData = await User.findOneAndDelete({ _id: req.params.id });
      
      if (!userData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      
      res.json(userData);
    } catch(err) {
      res.status(500).json(err)
    };
  },

  async addFriend(req, res) {
    try {
      const { userId, friendId } = req.params;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (user.friends.includes(friendId)) {
        return res.status(400).json({ message: 'Friend already exists in the list' });
      }

      user.friends.push(friendId);
      await user.save();

      res.status(200).json({ message: "Friend has been added" });
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  async deleteFriend (req,res){

  try {
    const { userId, friendId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!user.friends.includes(friendId)) {
      return res.status(400).json({ message: 'Friend not found in the list' });
    }

    user.friends.pull(friendId);
    await user.save();

    res.status(200).json({ message: "Friend has been removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
},
};

module.exports = UserController;