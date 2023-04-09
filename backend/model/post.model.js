const mongoose = require("mongoose");

// creating the schema for post
const postScheme = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String, required: true, maxlength: 300 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    likes: { type: Number, min: 0, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// creating the post model
const Post = mongoose.model("Post", postScheme);
module.exports = Post;
