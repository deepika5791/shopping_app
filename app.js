const express = require("express");
const products = require("./src/routes/productsRoutes");
const cart = require("./src/routes/cartRoutes");
const auth = require("./src/routes/authRoutes");
const app = express();
app.use(express.json());

app.use("/api/auth", auth);
app.use("/products", products);
app.use("/cart", cart);

module.exports = app;
