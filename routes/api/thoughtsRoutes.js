const express = require('express');
const router = express.Router();
const ThoughtsController = require("../../controllers/thoughtscontroller");

router.get("/", ThoughtsController.getAllThoughts);

// router.get('/:id', ThoughtsController.getThoughtById);
router.get('/:id', ThoughtsController.getThoughtById);


router.post('/', ThoughtsController.createThought);

router.put('/:id', ThoughtsController.updatedThought);

router.delete("/:id", ThoughtsController.deleteThought);

router.post ("/:thoughtId/reactions", ThoughtsController.createReaction);
router.delete("/:thoughtId/reactions",ThoughtsController.deleteReaction);

module.exports = router;

// const router = require("express").Router();
// const {
//   getThoughts,
//   getSinglethought,
//   createThought,
//   updateThought,
//   deleteThought,
//   createReaction,
//   deleteReaction,
// } = require("../../controllers/thoughtscontroller");

// // /api/Thoughts
// router.route("/").get(getThoughts).post(createThought);

// // /api/Thoughts/:thoughtId
// router
//   .route("/:thoughtId")
//   .get(getSinglethought)
//   .put(updateThought)
//   .delete(deleteThought);

// // /api/thoughts/:thoughtID/reactions
// router.route("/:thoughtId/reactions").post(createReaction);

// // /api/thoughts/:thoughtID/reactions/:reactionID
// router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

// module.exports = router;
