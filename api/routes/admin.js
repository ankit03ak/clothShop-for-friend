// routes/admin.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get total users
router.get("/users/count", async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ totalUsers: count });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Get list of all users
router.get("/users/list", async (req, res) => {
  try {
    const users = await User.find().select("name email role"); // select fields you want
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
