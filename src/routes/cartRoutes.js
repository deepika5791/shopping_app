const express = require("express");
const {
  cartProducts,
  addToCart,
  removeFromCart,
  clearCart,
} = require("../controller/cartController");

const auth = require("../middleware/authMIddleware");

const router = express.Router();

router.get("/", auth, cartProducts);
router.post("/add", auth, addToCart);
router.delete("/remove/:productId", auth, removeFromCart);
router.delete("/clear", auth, clearCart);

module.exports = router;
