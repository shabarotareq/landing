import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLoginSuccess, onSwitchScreen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🚀 تخطي تسجيل الدخول بالضغط على F10 (حساب مدير وهمي)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "F10") {
        e.preventDefault();
        const fakeAdmin = {
          id: "dev-admin-001",
          name: "Dev Admin",
          email: "admin@devmode.local",
          role: "admin",
        };
        localStorage.setItem("token", "dev-mode-admin-token");
        localStorage.setItem("user", JSON.stringify(fakeAdmin));
        onLoginSuccess();
        navigate("/dashboard"); // تحويل للوحة التحكم
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onLoginSuccess, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("مثال: تسجيل الدخول الفعلي يمكن ربطه لاحقًا.");
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="login-page p-6 bg-gray-900 rounded-lg text-white w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">تسجيل الدخول</h2>

      {message && <p className="text-red-400 text-center mb-2">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded bg-white/20 text-white placeholder-white"
          required
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded bg-white/20 text-white placeholder-white"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500"
        >
          {loading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
        </button>
      </form>

      {/* أزرار للتبديل بين الشاشات */}
      <div className="mt-4 flex justify-between text-sm">
        <button
          onClick={() => onSwitchScreen("signup")}
          className="underline text-yellow-400 hover:text-yellow-500"
        >
          إنشاء حساب جديد
        </button>
        <button
          onClick={() => onSwitchScreen("forgot")}
          className="underline text-yellow-400 hover:text-yellow-500"
        >
          نسيت كلمة المرور؟
        </button>
      </div>
    </div>
  );
}
