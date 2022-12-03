const router = require('express').Router()

const {

  getUsers,
  getFriends,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  removeFriend,
  addFriend,
  authenticateLogin,
  lookupUserByToken

} = require('../../controllers/user-controller')

// Declare the routes that point to the controllers above
// // /api/users
router.route("/").get(getUsers).post(createUser);
router.route("/friends").get(getFriends)

router.route("/lookup").get(lookupUserByToken)
router.route("/removefriend").post(removeFriend)
router.route("/addfriend").post(addFriend)

// // /api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);


router.route("/auth").post(authenticateLogin)



module.exports = router;