import React, { useEffect, useState } from "react";

function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState([]);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const fetchSubscribers = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/subscribers`, {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (!res.ok) throw new Error("Unauthorized or error fetching data");
      const data = await res.json();
      setSubscribers(data);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteSubscriber = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا المشترك؟")) return;

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/subscribers/${id}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${password}` } }
      );
      if (!res.ok) throw new Error("Failed to delete subscriber");
      fetchSubscribers();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Panel - المشتركين</h2>
      <input
        type="password"
        placeholder="أدخل كلمة مرور Admin"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={fetchSubscribers}>تحميل المشتركين</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {subscribers.map((sub) => (
          <li key={sub._id}>
            {sub.email} - {new Date(sub.date).toLocaleString()}{" "}
            <button onClick={() => deleteSubscriber(sub._id)}>حذف</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminSubscribers;
