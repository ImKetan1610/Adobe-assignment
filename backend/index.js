const express = require("express");
// connection to database
const connect = require("./db");

const app = express();
app.use(express.json());

// route for users
const userController = require("./controller/user.controller");
app.use("/users", userController);

//route for posts
const postController = require("./controller/post.controller");
app.use("/posts", postController);

//route for analytics
const analyticsController = require("./controller/analytics.controller");
app.use("/analytics", analyticsController);

// seen on UI when hits on backend api
app.get("/", (req, res) => {
  res.send("Server is started");
});

// make connection on 1234 port
app.listen(1234, async () => {
  try {
    await connect();
    console.log("listening on port 1234");
  } catch (error) {
    console.error(error.message);
  }
});
