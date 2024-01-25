const { Schema, model } = require("mongoose");
const Reaction = require("./Reaction");

// Schema to create a Thought model
const thoughtSchema = new Schema();

const Thought = model("thought", thoughtSchema);
module.exports = Thought;
