const express = require("express");
const {
  getProducts,
  product,
  newProducts,
  deleteProduct,
  ProductdetailEdit,
} = require("../controller/ProductController");

const auth = require("../middleware/authMIddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const router = express.Router();

router.get("/", getProducts);
router.get("/:id", product);
router.post("/", auth,adminMiddleware, newProducts);
router.delete("/:id", auth, adminMiddleware, deleteProduct);
router.patch("/:id", auth,adminMiddleware, ProductdetailEdit);

module.exports = router;
