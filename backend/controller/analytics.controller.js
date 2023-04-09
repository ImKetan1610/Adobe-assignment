const express = require("express");

const User = require("../model/user.model");
const Post = require("../model/post.model");

const router = express.Router();

// find the total number of users
router.get("/users", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    return res.status(201).send({ totalUsers });
  } catch (error) {
    return res.status(500).send(error);
  }
});

// find top active users on basis of their post
router.get("/users/top-active", async (req, res) => {
  try {
    const mostActiveUsers = await User.aggregate([
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "author",
          as: "posts",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          bio: 1,
          postCount: { $size: "$posts" },
        },
      },
      { $sort: { postCount: -1 } },
      { $limit: 5 },
    ]);
    return res.send(mostActiveUsers);
  } catch (error) {
    return res.status(500).send(error);
  }
});

// find the number of posts
router.get("/posts", async (req, res) => {
  try {
    const totalPosts = await Post.countDocuments();
    return res.status(200).send({ totalPosts });
  } catch (error) {
    return res.status(500).send(error);
  }
});

// find the most liked posts
router.get("/posts/top-liked", async (req, res) => {
  try {
    const mostLikedPost = await Post.find().sort({ likes: -1 }).limit(5);
    return res.send(mostLikedPost);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
