const express = require("express");
const User = require("../model/user.model");
const Joi = require("joi");

const router = express.Router();

router.post("", async (req, res) => {
  let { name, email, bio } = req.body;
  let schema = Joi.object({
    name: Joi.string().min(1).max(30).required(),
    email: Joi.string().email().required(),
    bio: Joi.string().max(200),
  });

  //validating the email and name and if getting any error then reflect it back
  const { err } = schema.validate({ name, email, bio });
  if (err) {
    return res.send(err);
  }

  // successfully creating a user object
  try {
    let user = await User.create(req.body);
    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("", async (req, res) => {
  try {
    const users = await User.find();
    return res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// searching user on basis of id
router.get("/:id", async (req, res) => {
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

// making changes to users by searching user w.r.to their id
router.put("/:id", async (req, res) => {
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

// deleting user object from db
router.delete("/:id", async (req, res) => {
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

module.exports = router;
