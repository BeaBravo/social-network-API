const { User } = require("../models");
const Thought = require("../models/Thought");

module.exports = {
  // get all thoughts
  // /api/thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.status(200).json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // get single thoughts by id
  // /api/thoughts/:thoughtId
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      //if no thought found
      if (!thought) {
        return res
          .status(404)
          .json({ message: "no thought found under this id!" });
      }

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new thought
  // /api/thoughts -> req.body will be text and username
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      //need to add new thought to the associated user
      await User.findOneAndUpdate(
        {
          username: req.body.username,
        },
        {
          $addToSet: {
            thoughts: [thought],
          },
        }
      );

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // update a thought
  // /api/thoughts/:thoughtId
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        {
          _id: req.params.thoughtId,
        },
        { $set: req.body },
        { new: true }
      );

      //if no thought is found with that id, return a 404 response
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found under that id!" });
      }
      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a reaction in a single thought
  // /api/thoughts/:thoughtId/reactions -> body: reactionBody and username
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        {
          _id: req.params.thoughtId,
        },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      //if no thought is found with that id, return a 404 response
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found under that id!" });
      }

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // remove a reaction
  // /api/thoughts/:thoughtId/reactions/:reactionId
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      //if no thought is found with that id, return a 404 response
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found under that id!" });
      }

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
