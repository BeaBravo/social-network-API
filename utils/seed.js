const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { getEmail, getRandomThoughts, getUsers } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected!");
  // Delete the collections, if they exist
  let userCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("users");
  }

  let thoughtCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection("thoughts");
  }

  //create seed for thoughts
  const thoughts = getRandomThoughts(6);

  //add them to collection
  const thoughtData = await Thought.collection.insertMany(thoughts);
  console.log(thoughtData);
  //create seed for users
  const allUsers = getUsers();
  const users = [];
  for (let i = 0; i < allUsers.length; i++) {
    const username = allUsers[i];
    const email = getEmail(username);
    users.push({
      username,
      email,
      // thoughts: [...thoughtData.map({_id} => _id)]
    });
  }

  // insert seeds into collections
  await User.collection.insertMany(users);

  //console.log to show seeding is done
  console.table(users);
  console.table(thoughts);
  console.log("-------------------seeding complete!-------------------");

  //end the process
  process.exit(0);
});
