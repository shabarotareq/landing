import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/image/logo.png";

export default function Navbar({ onLogout, userRole }) {
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between">
      {/* الجزء الأيسر: لوجو + اسم المشروع + زر الرئيسية */}
      <div className="flex items-center space-x-4">
        <img src={Logo} alt="Logo" className="h-8 w-8" />
        <span className="font-bold text-lg">حلول ذكية</span>
        <button
          onClick={() => navigate("/")}
          className="ml-4 px-3 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-500"
        >
          الرئيسية
        </button>
      </div>

      {/* الجزء الأيمن: أزرار تسجيل الخروج وزر لوحة التحكم */}
      <div className="flex items-center space-x-4">
        {userRole === "admin" && (
          <button
            onClick={() => navigate("/pages/AdminPanel.jsx")}
            className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-600"
          >
            لوحة التحكم
          </button>
        )}

        <button
          onClick={onLogout}
          className="px-3 py-1 bg-red-500 rounded hover:bg-red-600"
        >
          تسجيل الخروج
        </button>
      </div>
    </nav>
  );
}
