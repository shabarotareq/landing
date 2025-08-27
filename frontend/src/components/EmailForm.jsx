import React, { useState } from "react";

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
      const res = await fetch(`${process.env.REACT_APP_API_URL}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("تم تسجيل بريدك بنجاح!");
        setEmail("");
      } else {
        setMessage(data.message || "حدث خطأ");
      }
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
      />
      <button type="submit">اشترك</button>
      {message && <p className="success-message">{message}</p>}
    </form>
  );
}

export default EmailForm;
