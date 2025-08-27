const express = require("express");
const router = express.Router();
const Email = require("../models/Email");

// POST /subscribe
router.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const exists = await Email.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already exists" });

    const newEmail = new Email({ email });
    await newEmail.save();
    res.status(201).json({ message: "Email saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Middleware للتحقق من Admin
const adminAuth = (req, res, next) => {
  const auth = req.headers.authorization;
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123"; // ضع في .env

  if (!auth || auth !== `Bearer ${adminPassword}`) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

// GET /subscribers محمي
router.get("/subscribers", adminAuth, async (req, res) => {
  try {
    const subscribers = await Email.find().sort({ date: -1 });
    res.status(200).json(subscribers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "حدث خطأ عند جلب المشتركين" });
  }
});

// DELETE /subscribers/:id لحذف مشترك (محمي)
router.delete("/subscribers/:id", adminAuth, async (req, res) => {
  try {
    await Email.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Subscriber deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "حدث خطأ عند حذف المشترك" });
  }
});

module.exports = router;
