const User = require('./models/user');


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

// const { ObjectId } = require("mongoose").Types;
// const { Users, Thoughts } = require("../models");

// module.exports = {
//   // Get all Users
//   async getUsers(req, res) {
//     try {
//       const users = await Users.find();

//       res.json(users);
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json(err);
//     }
//   },

//   // Get a single User
//   async getSingleuser(req, res) {
//     try {
//       const user = await Users.findOne({ _id: req.params.userId })
//         .populate("thoughts")
//         .populate("friends")
//         .select("-__v");

//       if (!user) {
//         return res.status(404).json({ message: "No user with that ID" });
//       }

//       res.json({
//         user,
//       });
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json(err);
//     }
//   },

//   // create a new user
//   async createUser(req, res) {
//     try {
//       const user = await Users.create(req.body);
//       res.json(user);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },

//   // Update a User
//   async updateUser(req, res) {
//     try {
//       const user = await Users.findOneAndUpdate(
//         { _id: req.params.userId },
//         { $set: req.body },
//         { runValidators: true, new: true }
//       );

//       if (!user) {
//         return res.status(404).json({ message: "No user with this id!" });
//       }

//       res.json(user);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },

//   // Delete a user and remove their corresponding thoughts
//   async deleteUser(req, res) {
//     try {
//       const user = await Users.findOneAndRemove({ _id: req.params.userId });
 
//       if (!user) {
//         return res.status(404).json({ message: "No such user exists" });
//       }

//       user.thoughts.forEach(async (id) => {
//         const thought = await Thoughts.findOneAndRemove(
//           { _id: id },
//           { $pull: { _id: id } },
//           { new: true }
//         );

//         if (!thought) {
//           return res.status(404).json({
//             message: "no thoughts found",
//           });
//         }
//       });

//       res.json({ message: "user successfully deleted" });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   },

//   // Add a friend to an user
//   async createFriend(req, res) {
//     try {
//       const user = await Users.findOneAndUpdate(
//         { _id: req.params.userId },
//         { $addToSet: { friends: req.params.friendId } },
//         { runValidators: true, new: true }
//       );

//       if (!user) {
//         return res.status(404).json({ message: "No user found" });
//       }

//       res.json(user);
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   },

//   // Delete a friend
//   async deleteFriend(req, res) {
//     try {
//       const user = await Users.findOneAndUpdate(
//         { _id: req.params.userId },
//         { $pull: { friends: req.params.friendId } },
//         { new: true }
//       );

//       if (!user) {
//         return res.status(404).json({ message: "No user found" });
//       }

//       res.json(user);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },
// };