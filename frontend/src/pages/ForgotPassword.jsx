import React, { useState } from "react";
import axios from "axios";

export default function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", {
        email,
      });
      setMessage("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني");
    } catch (err) {
      setMessage(err?.response?.data?.message || "حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white text-center mb-4">
        نسيت كلمة المرور
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
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-yellow-400 rounded hover:bg-yellow-500"
        >
          {loading ? "جارٍ الإرسال..." : "إرسال رابط إعادة التعيين"}
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
