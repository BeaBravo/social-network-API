const { Schema, model } = require("mongoose");

// Schema to create a User model
const userSchema = new Schema();

const User = model("user", userSchema);
module.exports = User;
