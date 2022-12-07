const connection = require("../config/connection");
const { User, Thought, Reaction } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {

  // Drop existing users
  await User.deleteMany({});

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Drop existing thoughts
  await Reaction.deleteMany({});

  // Insert users

  const user1 = await User.create({
    "_id": "637e838129f498406df23181",
    "username": "Tarek",
    "email": "test@gmail.com",
    "image": "stock4",
    "password": "password",
  });

  const user2 = await User.create({
    "_id": "637e83995dd421603e3e8163",
    "username": "Ben",
    "email": "test2@gmail.com",
    "image": "stock6",
    "password": "password",
  });

  const user3 = await User.create({
    "_id": "637e83a133c49cd869012efc",
    "username": "Mike",
    "email": "test3@gmail.com",
    "image": "stock8",
    "password": "password",
  });

  const user4 = await User.create({
    "_id": "637e83a703d030945ab9fa60",
    "username": "Cindy",
    "email": "test4@gmail.com",
    "image": "stock5",
    "password": "password",
  });

  const user5 = await User.create({
    "_id": "637e83ad69e978780b94bd7d",
    "username": "Emma",
    "email": "test5@gmail.com",
    "image": "stock12",
    "password": "password",
  });

  // Insert thought
  const thought1 = await Thought.create({
    "_id": "637e84828a5781cb962de5b5",
    "thoughtText": "We’re supposed to get 6” of snow.. I hate this state",
    "username": "637e838129f498406df23181",
  });

  const thought2 = await Thought.create({
    "_id": "637e8488fc3c61679a9ff546",
    "thoughtText": "OMG did you hear what happened to my neighbor?",
    "username": "637e83995dd421603e3e8163",
  });

  const thought3 = await Thought.create({
    "_id": "637e848c220defaa683bca65",
    "thoughtText": "This world cup is soooo boring!",
    "username": "637e83a133c49cd869012efc",
  });

  const thought4 = await Thought.create({
    "_id": "637e849291fa953b0155034c",
    "thoughtText": "Anyone have Netflix recommendations?",
    "username": "637e83a703d030945ab9fa60",
  });
  const thought5 = await Thought.create({
    "_id": "637e84973bbb4409545edb3a",
    "thoughtText": "Does anyone have a recipe for cheesy potato casserole?",
    "username": "637e83ad69e978780b94bd7d",
  });



  await User.findOneAndUpdate(
    { _id: user1._id },
    { $push: { thoughts: thought1._id, friends: [{ "_id": "637e83995dd421603e3e8163" }, { "_id": "637e83a133c49cd869012efc" }, { "_id": "637e83a703d030945ab9fa60" }] }, },
    { new: true }
  )

  await User.findOneAndUpdate(
    { _id: user2._id },
    { $push: { thoughts: thought3._id, friends: [{ "_id": "637e838129f498406df23181" }, { "_id": "637e83a133c49cd869012efc" }, { "_id": "637e83ad69e978780b94bd7d" }] }, },
    { new: true }
  )

  await User.findOneAndUpdate(
    { _id: user3._id },
    { $push: { thoughts: thought2._id, friends: [{ "_id": "637e838129f498406df23181" }, { "_id": "637e83995dd421603e3e8163" }, { "_id": "637e83a703d030945ab9fa60" }] }, },
    { new: true }
  )




  const reaction1 = await Reaction.create({
    "reactionBody": "Let's move to Florida!",
    "thoughtId": "637e84828a5781cb962de5b5",
    "userId": "637e83a133c49cd869012efc",
    "username": "Mike",

  });

  const reaction2 = await Reaction.create({
    "reactionBody": "No! What happened?!",
    "thoughtId": "637e8488fc3c61679a9ff546",
    "userId": "637e838129f498406df23181",
    "username": "Tarek",
  });

  const reaction3 = await Reaction.create({
    "reactionBody": "Yeah I heard.. I can’t believe you’re posting about it tho ",
    "thoughtId": "637e8488fc3c61679a9ff546",
    "userId": "637e83995dd421603e3e8163",
    "username": "Ben",
  });

  const reaction4 = await Reaction.create({
    "reactionBody": "Watch the NFL instead",
    "thoughtId": "637e848c220defaa683bca65",
    "userId": "637e83ad69e978780b94bd7d",
    "username": "Emma",
  });





  await Thought.findOneAndUpdate(
    { _id: thought1._id },
    { $push: { reactions: reaction1._id }, },
    { new: true }
  )

  await Thought.findOneAndUpdate(
    { _id: thought2._id },
    { $push: { reactions: reaction3._id }, },
    { new: true }
  )

  await Thought.findOneAndUpdate(
    { _id: thought2._id },
    { $push: { reactions: reaction2._id }, },
    { new: true }
  )

  await Thought.findOneAndUpdate(
    { _id: thought3._id },
    { $push: { reactions: reaction4._id }, },
    { new: true }
  )

  // Log out the seed data to indicate what should appear in the database
  console.table(User);
  console.info("Seeding complete!");
});
