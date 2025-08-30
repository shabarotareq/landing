import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/users/register", { name, email, password });
      setMessage(res.data.message);
      setName("");
      setEmail("");
      setPassword("");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "حدث خطأ");
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50"
      dir="rtl"
    >
      <div className="bg-white bg-opacity-20 backdrop-blur-md p-10 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
          تسجيل مستخدم جديد
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="الاسم"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 rounded-lg border border-white border-opacity-30 bg-white bg-opacity-20 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg border border-white border-opacity-30 bg-white bg-opacity-20 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg border border-white border-opacity-30 bg-white bg-opacity-20 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <button
            type="submit"
            className="bg-purple-700 text-white p-3 rounded-lg hover:bg-purple-800 transition-colors"
          >
            تسجيل
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-green-600">{message}</p>
        )}
      </div>
    </div>
  );
}
