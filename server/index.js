const cors = require('cors');
const express = require('express');
const sequelize = require('./database');

const app = express();

sequelize.sync({ force: true }).then(async () => {
  console.log("Database synced!");

  // Create a new user
  // const newUser = await User.create({
  //     firstName: 'John',
  //     lastName: 'Doe',
  //     email: 'john.doe@example.com'
  // });
  // console.log('User created:', newUser.toJSON());

  // Create a new post for the user
  // const newPost = await Post.create({
  //     title: 'My First Post',
  //     content: 'This is the content of my first post.',
  //     UserId: newUser.id
  // });
  // console.log('Post created:', newPost.toJSON());

  // Read users and their posts
  // const users = await User.findAll({ include: Post });
  // console.log('All users with posts:', JSON.stringify(users, null, 2));
}).catch(err => {
  console.error('Unable to sync database:', err);
});

app.use(cors());

app.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log(`App server now listening on port ${process.env.REACT_APP_SERVER_PORT}`);
});