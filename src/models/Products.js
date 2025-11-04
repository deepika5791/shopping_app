const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "Products" }
);

module.exports = mongoose.model("Product", productSchema);
