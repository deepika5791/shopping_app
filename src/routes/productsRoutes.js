const express = require("express");

const {
  getProducts,
  product,
  newProducts,
  deleteProduct,
  ProductdetailEdit,
} = require("../controller/ProductController");

const adminMiddleware = require("../middleware/adminMiddleware");
const router = express.Router();

router.get("/", getProducts);
router.get("/:id", product);
router.post("/", adminMiddleware, newProducts);
router.delete("/:id", adminMiddleware, deleteProduct);
router.patch("/:id", adminMiddleware, ProductdetailEdit);

module.exports = router;
