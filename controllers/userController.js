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
  async updateUser(req, res) {
    res.json("will update user");
  },
  // delete user
  async deleteUser(req, res) {
    res.json("will delete user");
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
