const express = require("express");
const {
  cartProducts,
  addToCart,
  removeFromCart,
  clearCart,
} = require("../controller/cartController");

const router = express.Router();

router.get("/", cartProducts);
router.post("/add", addToCart);
router.delete("/remove/:productId", removeFromCart);
router.delete("/clear", clearCart);

module.exports = router;
