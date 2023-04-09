const express = require("express");
const connect = require("./db");

const app = express();
app.use(express.json());

const userController = require("./controller/user.controller");
app.use("/users", userController);

const postController = require("./controller/post.controller");
app.use("/posts", postController);

const analyticsController = require("./controller/analytics.controller");
app.use("/analytics", analyticsController);

app.get("/", (req, res) => {
  res.send("Server is started");
});

app.listen(1234, async () => {
  try {
    await connect();
    console.log("listening on port 1234");
  } catch (error) {
    console.error(error.message);
  }
});
