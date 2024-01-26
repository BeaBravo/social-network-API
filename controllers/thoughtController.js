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
  async updateThought(req, res) {
    res.json("will update thought");
  },
  // delete a thought
  async deleteThought(req, res) {
    res.json("will delete thought");
  },
  // create a reaction in a single thought
  async createReaction(req, res) {
    res.json("will create reaction");
  },
  // remove a reaction
  async deleteReaction(req, res) {
    res.json("will delete reaction");
  },
};
