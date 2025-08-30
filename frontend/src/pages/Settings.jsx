// src/pages/Settings.jsx
import React, { useState } from "react";

export default function Settings() {
  const [username, setUsername] = useState("Admin");
  const [email, setEmail] = useState("admin@example.com");
  const [message, setMessage] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    // هنا يمكن وضع طلب API لحفظ البيانات
    setMessage("تم حفظ الإعدادات بنجاح!");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">إعدادات الحساب</h1>
      <form
        onSubmit={handleSave}
        className="bg-white p-6 rounded-lg shadow-md max-w-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            اسم المستخدم
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700 transition-colors duration-300"
        >
          حفظ
        </button>

        {message && <p className="mt-3 text-green-500">{message}</p>}
      </form>
    </div>
  );
}
