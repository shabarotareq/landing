// App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthOverlay from "./components/AuthOverlay";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./components/AdminPanel";
import Landing from "./components/Landing2";
import Gallery from "./components/Gallery/Gallery";
import "./components/Gallery/Gallery.css";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("user");
  const [showGallery, setShowGallery] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setUserRole("admin"); // يمكن تعديل حسب التوكن الحقيقي
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole("user");
    setShowGallery(false);
  };

  const toggleGallery = () => {
    if (isAuthenticated) setShowGallery(true);
  };

  // F10 لتسجيل الدخول السريع و ESC لإغلاق المعرض
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "F10") handleLoginSuccess();
      if (e.key === "Escape") setShowGallery(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <Router>
      {/* Navbar يظهر فقط بعد تسجيل الدخول */}
      {isAuthenticated && (
        <Navbar onLogout={handleLogout} userRole={userRole} />
      )}
      {/* Landing دائمًا في الخلفية */}
      <Landing
        onShowGallery={toggleGallery}
        disabled={!isAuthenticated} // لتعتيم الشاشة عند عدم تسجيل الدخول
      />

      {/* شاشة login overlay عند عدم تسجيل الدخول */}
      {!isAuthenticated && (
        <div className="fixed inset-0 z-50">
          <AuthOverlay onLoginSuccess={handleLoginSuccess} />
        </div>
      )}

      {/* معرض الصور overlay فوق Landing فقط عند الضغط على أتمتة العمليات */}
      {showGallery && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setShowGallery(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Gallery />
          </div>
        </div>
      )}

      <Routes>
        {isAuthenticated && (
          <Route
            path="/dashboard"
            element={
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
                <div className="md:col-span-3">
                  <Dashboard userRole={userRole} />
                </div>
                {userRole === "admin" && (
                  <div className="md:col-span-1">
                    <AdminPanel />
                  </div>
                )}
              </div>
            }
          />
        )}
      </Routes>
    </Router>
  );
}
