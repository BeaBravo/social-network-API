const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

// /api/users
router
  .route("/")
  // get all users
  .get(getUsers)
  // create a new user
  .post(createUser);

// /api/users/:userId
router
  .route("/:userId")
  //get single user by userId
  .get(getSingleUser)
  //update user by _id
  .put(updateUser)
  //delete user by _id
  .delete(deleteUser);

// /api/users/:userId/friends
router
  .route("/:userId/friends")
  //add a new friend to a user's friend list
  .post(addFriend);

// /api/users/:userId/friends/:friendId
router
  .route("/:userId/friends/:friendId")
  // delete a friend from user's friend list
  .delete(deleteFriend);
module.exports = router;
