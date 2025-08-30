import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    // تحقق من وجود المستخدم مسبقًا
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "المستخدم موجود مسبقًا" });

    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ message: "تم إنشاء الحساب بنجاح" });
  } catch (err) {
    res.status(500).json({ message: "خطأ في السيرفر" });
  }
});

export default router;
