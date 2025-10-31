require("dotenv").config();
const connectDb = require("./src/config/db");
const Product = require("./src/models/Products");
const products = require("./products.json");

const importData = async () => {
  try {
    await connectDb();
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Products imported successfully!");
    process.exit();
  } catch (error) {
    console.error("Error importing data:", error.message);
    process.exit(1);
  }
};

importData();
