const router = require('express').Router()

const {

  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  authenticateLogin,
  lookupUserByToken

} = require('../../controllers/user-controller')

// Declare the routes that point to the controllers above
// // /api/users
router.route("/").get(getUsers).post(createUser);;


// // /api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);


router.route("/auth").post(authenticateLogin)
router.route("/lookup").get(lookupUserByToken)


module.exports = router;