const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload"); // your upload.js

// Single file upload
router.post("/upload", upload.single("image"), (req, res) => {
  try {
    // multer with CloudinaryStorage automatically uploads and gives file info
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    res.json({
      message: "File uploaded successfully",
      url: file.path, // Cloudinary URL
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;
