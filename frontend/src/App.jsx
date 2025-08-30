import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import AuthOverlay from "./components/AuthOverlay";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import Settings from "./pages/Settings";
import Landing from "./components/Landing";
import Gallery from "./components/Gallery/Gallery";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("user");
  const [showGallery, setShowGallery] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setUserRole("admin"); // أو user حسب التوكن
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
      <Landing onShowGallery={toggleGallery} disabled={!isAuthenticated} />

      {/* شاشة login overlay عند عدم تسجيل الدخول */}
      {!isAuthenticated && (
        <div className="fixed inset-0 z-50">
          <AuthOverlay onLoginSuccess={handleLoginSuccess} />
        </div>
      )}

      {/* معرض الصور overlay */}
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
        <Route path="/dashboard" element={<Dashboard userRole={userRole} />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/"
          element={
            <Landing
              onShowGallery={toggleGallery}
              disabled={!isAuthenticated}
            />
          }
        />
      </Routes>
    </Router>
  );
}
