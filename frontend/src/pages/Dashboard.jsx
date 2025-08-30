import React, { useState } from "react";
import Gallery from "../components/Gallery/Gallery";
import AdminPanel from "../components/AdminPanel";

export default function Dashboard({ userRole }) {
  const [showGallery, setShowGallery] = useState(false);

  return (
    <div className="p-4 bg-gray-100 min-h-screen rounded shadow">
      <h1 className="text-3xl font-bold mb-4">لوحة التحكم الرئيسية</h1>
      <p>
        مرحبا بك! صلاحيتك الحالية: <strong>{userRole}</strong>
      </p>

      {/* صندوق أتمتة العمليات */}
      <div
        className="mt-6 p-4 bg-green-500 text-white font-bold text-center rounded cursor-pointer hover:bg-green-600 transition-colors"
        onClick={() => setShowGallery(!showGallery)}
      >
        أتمتة العمليات
      </div>

      {/* المعرض الدائري يظهر فقط عند الضغط */}
      {showGallery && (
        <div className="mt-6">
          <Gallery />
        </div>
      )}

      {/* ميزات المدير */}
      {userRole === "admin" && (
        <div className="mt-6 p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-2">ميزات المدير</h2>
          <ul className="list-disc list-inside">
            <li>إدارة المستخدمين</li>
            <li>مراجعة التقارير</li>
            <li>تعديل الصلاحيات</li>
          </ul>

          {/* لوحة إدارة إضافية إذا موجودة */}
          <AdminPanel />
        </div>
      )}

      {/* ميزات المستخدم العادي */}
      {userRole === "user" && (
        <div className="mt-6 p-4 bg-white rounded shadow">
          <p>يمكنك هنا مشاهدة البيانات الشخصية والمهام المتاحة لك.</p>
        </div>
      )}
    </div>
  );
}
