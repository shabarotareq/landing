import express from "express";
import User from "../models/User.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// عرض كل المستخدمين
router.get("/users", protect, admin, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// تغيير صلاحية مستخدم
router.put("/users/:id/role", protect, admin, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "المستخدم غير موجود" });
  user.role = req.body.role;
  await user.save();
  res.json({ message: "تم تعديل الصلاحية" });
});

// حذف مستخدم
router.delete("/users/:id", protect, admin, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "المستخدم غير موجود" });
  await user.remove();
  res.json({ message: "تم حذف المستخدم" });
});

export default router;
