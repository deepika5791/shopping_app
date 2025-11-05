const express = require("express");
const cors = require("cors");
const products = require("./src/routes/productsRoutes");
const cart = require("./src/routes/cartRoutes");
const auth = require("./src/routes/authRoutes");
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173",
    "https://shopping-client-app.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", auth);
app.use("/products", products);
app.use("/api/cart", cart);

module.exports = app;
