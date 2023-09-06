const express = require('express');
const router = express.Router();
const ThoughtsController = require("../../controllers/thoughtscontroller");

router.get("/", ThoughtsController.getAllThoughts);

router.get('/:id', ThoughtsController.getThoughtById);


router.post('/', ThoughtsController.createThought);

router.put('/:id', ThoughtsController.updatedThought);

router.delete("/:id", ThoughtsController.deleteThought);

router.post ("/:thoughtId/reactions", ThoughtsController.createReaction);
router.delete("/:thoughtId/reactions",ThoughtsController.deleteReaction);

module.exports = router;
