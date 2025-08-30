import React, { useState } from "react";
import axios from "axios";

export default function Signup({ onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        email,
        password,
      });
      setMessage("تم إنشاء الحساب بنجاح!");
    } catch (err) {
      setMessage(err?.response?.data?.message || "حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white text-center mb-4">
        إنشاء حساب جديد
      </h2>
      {message && <p className="text-green-300 text-center mb-2">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded bg-white/20 text-white"
          required
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded bg-white/20 text-white"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-yellow-400 rounded hover:bg-yellow-500"
        >
          {loading ? "جارٍ إنشاء الحساب..." : "إنشاء حساب"}
        </button>
      </form>
      <div className="mt-3 text-center text-white">
        <button onClick={onBack} className="underline">
          العودة لتسجيل الدخول
        </button>
      </div>
    </div>
  );
}
