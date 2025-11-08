const express = require("express");
const { signUp, login } = require("../controller/authController");

const router = express.Router();

router.get("/uptime", (req, res) => {
  res.status(200).json({ status: "ok" });
});

router.post("/signup", signUp);
router.post("/login", login);

module.exports = router;
