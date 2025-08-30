import React, { useState, useRef, useEffect } from "react";
import API from "../api";

export default function ResetPassword({ onBack }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const emailRef = useRef(null);

  useEffect(() => {
    if (emailRef.current) emailRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!email) return setMessage("الرجاء إدخال البريد الإلكتروني.");

    setLoading(true);
    try {
      // استدعاء API لإرسال رابط إعادة تعيين كلمة المرور
      await API.post("/users/reset-password", { email });
      setMessage("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.");
    } catch (err) {
      setMessage(err?.response?.data?.message || "حدث خطأ، حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-4">
      <div className="bg-white/6 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-2xl font-extrabold text-white text-center mb-4">
          نسيت كلمة المرور
        </h2>
        {message && (
          <p className="text-green-300 text-center mb-4">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            ref={emailRef}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@mail.com"
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-2 py-3 rounded-lg font-semibold transition ${
              loading
                ? "bg-yellow-300/70 cursor-wait"
                : "bg-yellow-400 hover:bg-yellow-500"
            }`}
          >
            {loading ? "جارٍ إرسال الرابط..." : "إرسال رابط إعادة التعيين"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-300">
          <button onClick={onBack} className="hover:underline">
            العودة لتسجيل الدخول
          </button>
        </div>
      </div>
    </div>
  );
}
