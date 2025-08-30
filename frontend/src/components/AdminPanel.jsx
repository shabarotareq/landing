import React, { useEffect, useState } from "react";
import API from "../api";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (id, role) => {
    await API.put(
      `/admin/users/${id}/role`,
      { role },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchUsers();
  };

  const deleteUser = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا المستخدم؟")) return;
    await API.delete(`/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchUsers();
  };

  if (loading) return <p>جاري تحميل المستخدمين...</p>;

  return (
    <div className="p-6 mt-16">
      <h1 className="text-xl font-bold mb-4">لوحة التحكم - إدارة المستخدمين</h1>
      <table className="w-full border border-gray-300 rounded-lg text-gray-200">
        <thead className="bg-gray-700">
          <tr>
            <th className="p-2">الاسم</th>
            <th className="p-2">البريد</th>
            <th className="p-2">الصلاحية</th>
            <th className="p-2">إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-t border-gray-600">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">
                <select
                  value={u.role}
                  onChange={(e) => updateRole(u._id, e.target.value)}
                  className="p-1 rounded bg-gray-800"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="p-2">
                <button
                  onClick={() => deleteUser(u._id)}
                  className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
