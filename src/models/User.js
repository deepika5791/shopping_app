const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("User", userSchema);
