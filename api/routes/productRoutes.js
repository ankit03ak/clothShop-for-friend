const express = require("express");
const { addProduct, getProducts, updateProduct, deleteProduct, getSingleProduct } = require("../controllers/productController");
const { auth, checkAdmin } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();


router.get("/", getProducts);
router.get("/:id", getSingleProduct);

router.post("/", auth, checkAdmin, upload.single("image"), addProduct);

router.post("/", auth, checkAdmin, addProduct);
router.put("/:id", auth, checkAdmin, updateProduct);
router.delete("/:id", auth, checkAdmin, deleteProduct);

module.exports = router;
