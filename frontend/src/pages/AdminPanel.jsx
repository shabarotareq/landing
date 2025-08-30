import React, { useEffect, useState } from "react";
import API from "../api";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // بيانات المستخدم الجديد
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("user");
  const [adding, setAdding] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await API.get("/users");
      setUsers(res.data || []);
    } catch (err) {
      setMessage("خطأ عند جلب المستخدمين.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, role) => {
    try {
      await API.patch(`/users/${userId}`, { role });
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role } : u))
      );
    } catch {
      setMessage("خطأ عند تعديل الصلاحيات.");
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا المستخدم؟")) return;
    try {
      await API.delete(`/users/${userId}`);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch {
      setMessage("خطأ عند حذف المستخدم.");
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newEmail || !newPassword) {
      setMessage("الرجاء إدخال البريد وكلمة المرور.");
      return;
    }
    setAdding(true);
    try {
      const res = await API.post("/users", {
        email: newEmail,
        password: newPassword,
        role: newRole,
      });
      setUsers((prev) => [...prev, res.data]);
      setNewEmail("");
      setNewPassword("");
      setNewRole("user");
      setMessage("تم إضافة المستخدم بنجاح!");
    } catch {
      setMessage("حدث خطأ عند إضافة المستخدم.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold text-white">لوحة إدارة المستخدمين</h2>
      {message && <p className="text-green-400">{message}</p>}

      {/* إضافة مستخدم جديد */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-2">
          إضافة مستخدم جديد
        </h3>
        <form onSubmit={handleAddUser} className="flex flex-col gap-2">
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
            required
          />
          <select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            className="px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            disabled={adding}
            className={`mt-2 py-2 rounded ${
              adding
                ? "bg-yellow-300/70 cursor-wait"
                : "bg-yellow-400 hover:bg-yellow-500"
            }`}
          >
            {adding ? "جارٍ الإضافة..." : "إضافة مستخدم"}
          </button>
        </form>
      </div>

      {/* جدول المستخدمين */}
      {loading ? (
        <p className="text-gray-300">جارٍ تحميل المستخدمين...</p>
      ) : (
        <table className="w-full text-white border border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-2">البريد</th>
              <th className="px-4 py-2">الصلاحية</th>
              <th className="px-4 py-2">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-gray-700">
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="bg-gray-800 text-white px-2 py-1 rounded"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
