// AuthOverlay.jsx
import React, { useState } from "react";

export default function AuthOverlay({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      onLoginSuccess();
    } else {
      setError("اسم المستخدم أو كلمة المرور غير صحيحة");
    }
  };

  const handleForgotPassword = () => {
    alert("ستتم إعادة توجيهك إلى صفحة استعادة كلمة المرور.");
    // أو استخدم navigate إلى صفحة فعلية
  };

  const handleRegister = () => {
    alert("ستتم إعادة توجيهك إلى صفحة التسجيل.");
    // أو استخدم navigate إلى صفحة فعلية
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gradient-to-br from-purple-700 via-purple-600 to-purple-500 p-8 rounded-2xl shadow-2xl w-96 text-white">
        <h2 className="text-2xl font-bold mb-4 text-center">تسجيل الدخول</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="اسم المستخدم"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 rounded-lg border border-white border-opacity-50 bg-purple-800 bg-opacity-30 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg border border-white border-opacity-50 bg-purple-800 bg-opacity-30 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          {error && <p className="text-red-300 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-yellow-400 text-black font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors duration-300"
          >
            تسجيل الدخول
          </button>
        </form>

        {/* روابط إضافية */}
        <div className="mt-4 flex justify-between text-sm text-gray-200">
          <button
            onClick={handleForgotPassword}
            className="underline hover:text-yellow-200"
          >
            هل نسيت كلمة المرور؟
          </button>
          <button
            onClick={handleRegister}
            className="underline hover:text-yellow-200"
          >
            تسجيل اشتراك جديد
          </button>
        </div>

        <p className="text-center text-gray-200 text-sm mt-3">
          يمكنك استخدام F10 لتسجيل الدخول السريع
        </p>
      </div>
    </div>
  );
}
