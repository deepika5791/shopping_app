const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || password) {
      return res.status(400).json({ error: "user not found" });
    }
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const login = (async = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "name and password required" });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatching = await bcrypt.compare(password, user.password);
    if (!isMatching)
      return res.status(400).json({ error: "Invalid credentials" });
    const token = jwt.sign(
      {
        userId: user.id,
        name: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    req.json({
      message: "Login Successful",
      token,
      user: { id: user._id, name: user.username, email: user.email },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
});
module.exports = { signUp, login };
