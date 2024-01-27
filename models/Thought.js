const { Schema, model } = require("mongoose");
const Reaction = require("./Reaction");

// Schema to create a Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [Reaction],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// create a virtual property "reaction count"
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);
module.exports = Thought;
