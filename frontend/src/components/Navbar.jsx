import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/image/logo.png";

function Navbar({ onLogout, userRole }) {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-800 text-white px-6 py-3 flex justify-between items-center flex-wrap z-50 shadow-md">
      <div className="flex items-center gap-3">
        <img src={Logo} alt="Logo" className="h-8 w-8" />
        <span className="font-bold text-lg">حلول ذكية</span>
        <button
          onClick={() => navigate("/")}
          className="px-3 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-500"
        >
          الرئيسية
        </button>
      </div>

      <div className="flex items-center gap-3 mt-2 md:mt-0">
        {userRole === "admin" && (
          <>
            <button
              onClick={() => navigate("/admin")}
              className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-600"
            >
              لوحة التحكم
            </button>
            <button
              onClick={() => navigate("/settings")}
              className="px-3 py-1 bg-green-500 rounded hover:bg-green-600"
            >
              إعدادات الحساب
            </button>
          </>
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

export default Navbar;
