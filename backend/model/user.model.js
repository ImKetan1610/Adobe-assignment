const mongoose = require("mongoose");

// creating the schema for user
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 1, maxlength: 50 },
    email: {
      type: String,
      required: true,
      unique: true,
      // match: /^[^\s@]+@[\s@]+\.[^\s@]+$/,
    },
    bio: { type: String, maxlength: 200 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// creating the model
const User = mongoose.model("User", userSchema);

module.exports = User;
