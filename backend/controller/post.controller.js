const express = require("express");
const Post = require("../model/post.model");

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const post = await Post.find();
    if (!post) {
      return res.status(404).send("Post not found");
    }
    return res.status(200).send(post);
  } catch (error) {
    return res.status(500).send(error);
  }
});

// creating a post object and storing to db
router.post("", async (req, res) => {
  try {
    // const { user_id, content } = req.body;
    const post = await Post.create(req.body);
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
    return res.status(201).send(post);
  } catch (error) {
    return res.status(500).send(post);
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
    return res.send(post);
  } catch (error) {
    return res.status(500).send(error);
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
    return res.send("Post deleted successfully");
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
    return res.send(post);
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
    return res.send(post);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
