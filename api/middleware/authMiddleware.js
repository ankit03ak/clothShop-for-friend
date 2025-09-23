const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

const checkAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user); // req.user comes from auth middleware
    if (user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied. Admins only." });
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error in check admin" });
  }
};


module.exports = { auth, checkAdmin };
