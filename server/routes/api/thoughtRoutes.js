const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require("../../controllers/thought-controller");

// // /api/thought
router.route("/").get(getThoughts).post(createThought);

// /api/thought/:thoughtId
router.route("/:thoughtId").get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thought/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(createReaction)

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
