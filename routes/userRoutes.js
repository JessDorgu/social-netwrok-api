const express = require('express');
const router = express.Router();
const UserController = require('../controllers/usercontroller');


// GET a single user by _id and populated thought and friend data
router.get('/:id', UserController.getUserById);

// POST a new user
router.post('/', UserController.createUser);



module.exports = router;
