const { User, Thought } = require("../models");

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
        .populate("thoughts")
        .populate("friends");

      //if no user is found response 404
      if (!user) {
        return res
          .status(404)
          .json({ message: "no user found under this id!" });
      }

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
      const user = await User.findOneAndDelete({
        _id: req.params.userId,
      });

      //delete associated thoughts
      await Thought.deleteMany({ _id: { $in: user.thoughts } });

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // add a new friend
  // /api/users/:userId/friends/:friendId
  async addFriend(req, res) {
    try {
      //find both users by their id
      const [user1, user2] = await User.find({
        _id: { $in: [req.params.userId, req.params.friendId] },
      });
      const user = await User.findOneAndUpdate(
        {
          _id: req.params.userId,
        },
        {
          $addToSet: {
            friends: [user2],
          },
        },
        { runValidators: true, new: true }
      );

      //update the friend to reflect this
      const friend = await User.findOneAndUpdate(
        {
          _id: req.params.friendId,
        },
        {
          $addToSet: {
            friends: [user1],
          },
        },
        { runValidators: true, new: true }
      );

      res.json([user, friend]);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete friend
  // /api/users/:userId/friends/:friendId
  async deleteFriend(req, res) {
    try {
      //find first user and remove the friend that matches :friendId
      const user = await User.findOneAndUpdate(
        {
          _id: req.params.userId,
        },
        {
          $pull: {
            friends: req.params.friendId,
          },
        },
        { new: true }
      );

      // update the friend to reflect this
      const friend = await User.findOneAndUpdate(
        {
          _id: req.params.friendId,
        },
        {
          $pull: {
            friends: req.params.userId,
          },
        },
        { runValidators: true, new: true }
      );

      res.json({
        message: `${user.username} and ${friend.username} are no longer friends`,
        users: [user, friend],
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
