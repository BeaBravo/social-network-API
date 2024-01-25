const User = require("../models/User");

module.exports = {
  //get all users
  async getUsers(req, res) {
    res.json("will get all users");
  },
  // get single user by ID
  async getSingleUser(req, res) {
    res.json("will get a single user by id");
  },
  // create a new user
  async createUser(req, res) {
    res.json("will create user");
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
