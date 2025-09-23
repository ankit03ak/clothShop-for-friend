const express = require("express"); // adjust path to your Visitor model
const Visitor = require("../models/Visitor");


const router = express.Router();

// Increase visitor count
router.post("/visitor/increase", async (req, res) => {
  try {
    let visitor = await Visitor.findOne();
    if (!visitor) {
      visitor = new Visitor({ totalVisitors: 1 });
    } else {
      visitor.totalVisitors += 1;
    }
    await visitor.save();

    res.json({ totalVisitors: visitor.totalVisitors });
  } catch (err) {
    res.status(500).json({ msg: "Error increasing visitors", error: err.message });
  }
});

// Get visitor count
router.get("/visitor/count", async (req, res) => {
  try {
    const visitor = await Visitor.findOne();
    res.json({ totalVisitors: visitor ? visitor.totalVisitors : 0 });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching visitors", error: err.message });
  }
});

module.exports = router;
