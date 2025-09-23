const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // e.g. shirt, trouser
  price: { type: Number, required: true },
  size: { type: [String], required: true },   // ["S", "M", "L"]
  color : { type: [String]},
  available: { type: Boolean, default: true },
  image: { type: String }, // store Cloudinary URL later
  description:{type: String}
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
