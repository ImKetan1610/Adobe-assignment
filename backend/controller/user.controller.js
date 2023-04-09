const express = require("express");
const User = require("../model/user.model");

const router = express.Router();

router.post("/users", async (req, res) => {
  try {
    let user = await User.create(req.body);
    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/users/:id", async (req, res) => {
  const allowedUpdates = ["name", "bio"];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates!" });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/analytics/users", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.status(201).send({ totalUsers });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/analytics/users/top-active", async (req, res) => {
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
    res.send(mostActiveUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
