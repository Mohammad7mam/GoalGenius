// ✅ src/componant/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // نتحقق إذا المستخدم مسجل دخول فعلاً
  const user = JSON.parse(localStorage.getItem("userData"));

  // إذا ما في مستخدم → نحوله لصفحة الـ Login
  if (!user) {
    return <Navigate to="/Login" replace />;
  }

  // إذا موجود → نعرض الصفحة المطلوبة
  return children;
}
