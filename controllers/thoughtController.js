const Thought = require("../models/Thought");

module.exports = {
  // get all thoughts
  async getThoughts(req, res) {
    res.json("will get all thoughts");
  },
  // get single thoughts by id
  async getSingleThought(req, res) {
    res.json("will get single thought");
  },
  // create a new thought
  async createThought(req, res) {
    res.json("will create a thought");
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
