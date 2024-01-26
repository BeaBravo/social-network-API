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
  const thoughts = getRandomThoughts();

  //add them to collection

  //create seed for users
  const allUsers = getUsers();
  const users = [];
  for (let i = 0; i < allUsers.length; i++) {
    const username = allUsers[i];
    const email = getEmail(username);
    users.push({
      username,
      email,
    });
  }

  // insert seeds into collections
  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  const usersInDb = await User.find();
  const thoughtsInDb = await Thought.find();

  //for all the thoughts -> findandupdate user model to add the thought
  for (let i = 0; i < thoughts.length; i++) {
    // console.log(thoughts[i].username);
    await User.findOneAndUpdate(
      { username: thoughts[i].username },
      {
        $addToSet: {
          thoughts: [thoughts[i]],
        },
      }
    );
  }

  //console.log to show seeding is done
  console.table(users);
  console.table(thoughts);
  console.log(
    "-------------------🌱🌱seeding complete!🌱🌱-------------------"
  );

  //end the process
  process.exit(0);
});
