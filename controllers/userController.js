const User = require("../models/User");

module.exports = {
  //get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // get single user by ID
  // /api/users/:userId
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate("thoughts");
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  // /api/users -> req.body will need username and email
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // update user
  // /api/users/:userId
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      //if no user is found with that id, return a 404 response
      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found under that id!" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete user
  // /api/users/:userId
  async deleteUser(req, res) {
    try {
      res.json("will delete user");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // add a new friend
  async addFriend(req, res) {
    res.json("will add friend");
  },
  // delete friend
  async deleteFriend(req, res) {
    res.json("will remove friend");
  },
};
