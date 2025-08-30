const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// تسجيل مستخدم جديد
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "البريد مستخدم مسبقاً" });

    const user = await User.create({ name, email, password });
    res.status(201).json({ message: "تم التسجيل بنجاح" });
  } catch (err) {
    res.status(500).json({ message: "حدث خطأ" });
  }
});

// تسجيل الدخول
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "خطأ في البريد أو كلمة المرور" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "خطأ في البريد أو كلمة المرور" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "حدث خطأ" });
  }
});

module.exports = router;
