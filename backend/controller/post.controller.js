const express = require("express");
const Post = require("../model/post.model");

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const post = await Post.find();
    if (!post) {
      return res.status(404).send("Post not found");
    }
    res.send(post);
  } catch (error) {
    res.status(500).send(post);
  }
});

// creating a post object and storing to db
router.post("", async (req, res) => {
  try {
    const { user_id, content } = req.body;
    const post = new Post.create(req.body);
    return res.status(201).send(post);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

//searching for post by id
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

//searching the post by id and then updating the values
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

// delete route for post
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

// increase the likes count
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

// decrease the like count
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

module.exports = router;
