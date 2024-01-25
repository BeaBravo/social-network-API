const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// /api/thoughts
router
  .route("/")
  // get all thoughts
  .get(getThoughts)
  // create a thought
  .post(createThought);

// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  // get a single thought by id
  .get(getSingleThought)
  // update a thought by id
  .put(updateThought)
  // delete thought by id
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
