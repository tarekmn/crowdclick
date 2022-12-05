const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addLiker,
  createReaction,
  deleteReaction
} = require("../../controllers/thought-controller");

// // /api/thought
router.route("/").get(getThoughts).post(createThought);

// /api/thought/:thoughtId
router.route("/:thoughtId").get(getSingleThought).put(updateThought).delete(deleteThought);

router.route("/like/:thoughtId").post(addLiker)

// /api/thought/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(createReaction)

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
