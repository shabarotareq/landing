const express = require("express");
const router = express.Router();
const Email = require("../models/Email");

// حفظ مشترك جديد
router.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const newEmail = new Email({ email });
    await newEmail.save();
    res.status(201).json({ message: "تم حفظ البريد بنجاح" });
  } catch (error) {
    res.status(500).json({ message: "خطأ في السيرفر" });
  }
});

// جلب جميع المشتركين
router.get("/subscribers", async (req, res) => {
  try {
    const subscribers = await Email.find().sort({ date: -1 });
    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500).json({ message: "خطأ عند جلب المشتركين" });
  }
});

module.exports = router;
