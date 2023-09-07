const express = require('express');
const router = express.Router();
const UserController = require("../../controllers/usercontroller");

router.get("/", UserController.getAllUsers);

// GET a single user by _id and populated thought and friend data
router.get('/:id', UserController.getUserById);

// POST a new user
router.post('/', UserController.createUser);

//PUT update a user
router.put('/:id', UserController.updateUser);

//DELETE a user

router.delete("/:id", UserController.deleteUser);


router.post("/:userId/friends/:friendId",UserController.addFriend);
router.delete("/:userId/friends/:friendId", UserController.deleteFriend);

module.exports = router;