const cloudinary = require("../config/cloudinary");
const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  try {

    // if (!req.file) {
    //   return res.status(400).json({ msg: "No image file uploaded" });
    // }
    let imageUrl = "add-url-here";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
      });
      imageUrl = result.secure_url;
    }

    // const result = await cloudinary.uploader.upload(req.file.path, {
    //   folder: "products",
    // });


    const productData = {};
    if (req.body.name) productData.name = req.body.name;
    if (req.body.category) productData.category = req.body.category;
    if (req.body.price) productData.price = Number(req.body.price);
    if (req.body.size) productData.size = req.body.size.split(",");
    if (req.body.color) productData.color = req.body.color.split(",");
    if (req.body.available !== undefined) productData.available = req.body.available === "true";
    if (imageUrl) productData.image = imageUrl;
    if(req.body.description) productData.description = req.body.description

    const product = new Product(productData);

    await product.save();
    res.json({ msg: "Product added successfully", product });
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    res.status(500).json({ msg: "Server error in addproduct", error: err.message });
  }
};




exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: "Server error in get product" });
  }
};


exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: "Server error in get single product" });
  }
};


// UPDATE IMAGE ANYTIME :) YAHA SE START KRNA HAI
//https://chatgpt.com/c/68ceccdc-40a4-8325-9e14-a205def05567
//https://chatgpt.com/c/68ccfedc-b8e4-8327-9708-444c9bececf8 

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: "Server error in update" });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json({ msg: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error in delete product" });
  }
};
