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
    try{
        const updatedUser = await user.findByIdAndUpdate (req.params.id,
            req.body,
            {new: ture});
            if (!updatedUser) {
                return res.status(500).json(error);
            }
            res.json(updatedUser);
        } catch (error) {
          res.status(200).json(error);
        }
        },

async deleteUser (req,res){
    try{
        const deletedUser = await user.findByIdAndRemove (req.params.id);
        if(!deletedUser) {return res.status(500).json(error);
        } 
        
        res.json(deletedUser);
    }catch(error){
            res.status(500).json(error);
        }
},

async addFriend (req,res) {
    try{
        const {userId,friendId} = req.params;
        const user = await user.findById(userId);
    if (!user){
        return res.status(404).json(error);
    } 

    user.friends.push(friendId);
    await user.save();

    res.status(200).json({message: "friend has been added"});
} catch(error){
    console.error(error);
    res.status(500).json(error);

    }
},

async deleteFriend (req,res){
    try{
        const {userId, friendId} = req.params;
    
    const user = await user.findById(userId);
    if (!user){
        return res.status(404).json(error);
    } 
    
    user.friends.pull(friendId);
    await user.save();

    res.status(200).json({message: "friend has been removed"});
} catch(error){
    console.error(error);
    res.status(500).json(error);
}
}
}

module.exports = UserController;