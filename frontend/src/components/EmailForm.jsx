import React, { useState } from "react";
import API from "../api"; // استدعاء API مثل ما في Landing.jsx

function EmailForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("الرجاء إدخال بريد صالح.");
      return;
    }

    try {
      await API.post("/subscribe", { email });
      setMessage("تم تسجيل بريدك بنجاح!");
      setEmail("");
    } catch (err) {
      setMessage("حدث خطأ، حاول مرة أخرى.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="email-form">
      <input
        type="email"
        placeholder="أدخل بريدك الإلكتروني"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="p-3 rounded-lg border border-white border-opacity-30 
                   bg-gray-700 bg-opacity-50 placeholder-gray-300 text-white 
                   focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <button
        type="submit"
        className="bg-purple-600 text-white px-6 py-3 rounded-lg 
                   hover:bg-purple-700 transition-colors duration-300"
      >
        اشترك
      </button>
      {message && <p className="mt-2 text-green-300">{message}</p>}
    </form>
  );
}

export default EmailForm;
