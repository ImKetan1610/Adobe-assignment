const express = require("express");
const Post = require("../model/post.model");

const router = express.Router();

router.post("", async (req, res) => {
  try {
    const { user_id, content } = req.body;
    const post = new Post.create(req.body);
    return res.status(201).send(post);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    res.send(post);
  } catch (error) {
    res.status(500).send(post);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    post.content = req.body.content;
    post.updated_at = Date.now();
    await post.save();
    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    await post.remove();
    res.send("Post deleted successfully");
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    post.likes++;
    await post.save;
    res.send(post);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/:id/unlike", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    if (post.likes > 0) {
      post.likes--;
    }
    await post.save;
    res.send(post);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/analytics/posts", async (req, res) => {
  try {
    const totalPosts = await Post.countDocuments();
    return res.status(200).send({ totalPosts });
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/analytics/posts/top-liked", async (req, res) => {
  try {
    const mostLikedPost = await Post.find().sort({ likes: -1 }).limit(5);
    return res.send(mostLikedPost);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;