const Products = require("../models/Products");

const getProducts = async (req, res) => {
  try {
    const products = await Products.find();
    console.log("Fetched products:", products);
    res.status(200).json(products);
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const product = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const newProducts = async (req, res) => {
  try {
    const newProduct = new Products(req.body);
    await newProduct.save();
    res.status(201).json({
      message: "new product has been added",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const deleteProduct = await Products.findByIdAndDelete(req.params.id);
    if (!deleteProduct)
      return res.status(404).json({ message: "No Product Found" });
    res.json({ message: "products has been deleted", data: [] });
  } catch (error) {
    res.error(500).json({ message: error.message });
  }
};

const alldeleteProducts = async (req, res) => {
  try {
    const alldelProducts = await Products.deleteMany({});
    if (!alldelProducts.deletedCount)
      return res.status(404).json({ message: "No Product Deleted" });
    res.json({ message: "all products has been deleted", data: [] });
  } catch (error) {
    res.error(500).json({ message: error.message });
  }
};
const ProductdetailEdit = async (req, res) => {
  try {
    if (req.body.id !== undefined) {
      return res
        .status(404)
        .json({ message: "Cannot include 'id' in PATCH request " });
    }
    const product = await Products.findByIdAndUpdate(req.params.id, req.body, {
      newProduct: true,
    });
    if (!product) return res.status(404).json({ message: "Product Not Found" });
    res.json({ message: "Product successfully updated", data: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const completenewProduct = async (req, res) => {
  try {
    const requiredFields = [
      "name",
      "price",
      "description",
      "category",
      "image",
    ];
    const MissingFields = requiredFields.filter((field) => !req.body[field]);
    if (MissingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${MissingFields.join(", ")}`,
        data: [],
      });
    }
    const Products = await Products.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!Products) res.status(404).json({ message: "Product Not Found" });
    res.json({ message: "Product successfully updated", data: movie });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getProducts,
  product,
  newProducts,
  deleteProduct,
  alldeleteProducts,
  ProductdetailEdit,
  completenewProduct,
};
