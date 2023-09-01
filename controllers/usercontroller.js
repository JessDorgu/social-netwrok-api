const User = require('../models/user');


const UserController = {
  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id)
        .populate('thoughts')
        .populate('friends');
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async createUser(req, res) {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: 'Bad request' });
  }
},


};


module.exports = UserController