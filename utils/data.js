const allUsernames = [
  "learntino",
  "harrypotter",
  "ravenclaw",
  "maryclaus",
  "hydrogenlenville",
  "jacobE",
  "Summer",
  "Winter23",
  "coolusername",
];

const thoughts = [
  "This is a cool thought",
  "What has four wheels and flies? a garbage truck",
  "Thoughts are the words of our minds",
  "I have a joke about pizza, but it is too cheesy",
  "Dogs cannot operate an MRI machine... but catscan",
  "RIP boiling water, you will be mist",
];

const reactions = [
  "this is the best dad joke!",
  "wow... that was not funny",
  "LOL!!!!",
  "I don't get it",
  "ha.. funny",
  "I've heard this one before",
  "Didn't see that coming...",
  "Get back to work please",
];

// Get a random item given an array
const getRandomArrItem = (array) =>
  array[Math.floor(Math.random() * array.length)];

// returns the email of the user
const getEmail = (user) => `${user}@email.com`;

const getRandomUsername = () => getRandomArrItem(allUsernames);

const createReactions = (int) => {
  if (int === 1) {
    return {
      reactionBody: getRandomArrItem(reactions),
      username: getRandomArrItem(allUsernames),
    };
  }
  results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandomArrItem(reactions),
      username: getRandomArrItem(allUsernames),
    });
  }
  return results;
};

const getRandomThoughts = () => {
  const results = [];
  for (i = 0; i < thoughts.length; i++) {
    results.push({
      thoughtText: thoughts[i],
      username: getRandomArrItem(allUsernames),
      reactions: [...createReactions(2)],
    });
  }
  return results;
};

const getUsers = () => allUsernames;

module.exports = {
  getEmail,
  getRandomThoughts,
  getRandomUsername,
  getUsers,
};
