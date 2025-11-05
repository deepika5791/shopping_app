const Cart = require("../models/Cart");

const cartProducts = async (req, res) => {
  try {
    const userId = req.user._id;
    const existingCart = await Cart.findOne({ userId }).populate(
      "products.productId"
    );

    if (!existingCart) {
      return res.status(200).json({ products: [] });
    }

    res.status(200).json({ products: existingCart.products });
  } catch (error) {
    console.error("Error fetching cart:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    const existingItem = cart.products.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    const populatedCart = await Cart.findOne({ userId }).populate(
      "products.productId"
    );

    res
      .status(200)
      .json({ message: "Product added to cart", cart: populatedCart });
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    const updatedCart = await Cart.findOne({ userId }).populate(
      "products.productId"
    );

    res.status(200).json({ message: "Product removed", cart: updatedCart });
  } catch (error) {
    console.error("Error removing from cart:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;
    await Cart.findOneAndDelete({ userId });
    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    console.error("Error clearing cart:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { cartProducts, addToCart, removeFromCart, clearCart };
