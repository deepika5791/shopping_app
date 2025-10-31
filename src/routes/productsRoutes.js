const express = require("express");

const {
  getProducts,
  product,
  newProducts,
  deleteProduct,
  alldeleteProducts,
  ProductdetailEdit,
  completenewProduct,
} = require("../controller/ProductController");
const router = express.Router();

router.get("/", getProducts);
router.get("/:id", product);
router.post("/", newProducts);
router.delete("/:id", deleteProduct);
router.delete("/", alldeleteProducts);
router.patch("/:id", ProductdetailEdit);
router.put("/:id", completenewProduct);

module.exports = router;
